import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Database } from "../database.types.ts";

const ALLOWED_ORIGINS = [
  "https://glif.foo",
  "http://localhost:8080",
  "http://localhost:3000"
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin");
  const allowed = (origin && ALLOWED_ORIGINS.includes(origin)) ? origin : "https://glif.foo";
  
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

// Anti-cheat: tempo mínimo em ms para uma vitória ser considerada legítima.
// Um humano leva pelo menos 10s para ler, decodificar e digitar uma palavra.
const MIN_WIN_TIME_MS = 10_000;

// Rate limit simples in-memory (por Isolate)
const rateLimitCache = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 20; // max 20 requests
const RATE_LIMIT_WINDOW_MS = 60_000; // por minuto

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitCache.get(ip);
  if (!record) {
    rateLimitCache.set(ip, { count: 1, timestamp: now });
    return false;
  }
  if (now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitCache.set(ip, { count: 1, timestamp: now });
    return false;
  }
  record.count++;
  return record.count > RATE_LIMIT_MAX;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Identificação do IP para rate limit
  const clientIp = req.headers.get("x-forwarded-for") || "unknown";
  if (clientIp !== "unknown" && checkRateLimit(clientIp)) {
    return new Response(JSON.stringify({ error: "Too Many Requests" }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: { user }, error: userError } = await createClient(
      supabaseUrl,
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      { global: { headers: { Authorization: authHeader } } }
    ).auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = user.id;
    const url = new URL(req.url);
    const pathname = url.pathname.split("/").pop();

    // GET /my-stats
    if (req.method === "GET" && pathname === "my-stats") {
      const { data: stats } = await supabaseAdmin
        .from("user_stats")
        .select("*")
        .eq("user_id", userId)
        .single();

      // Streak autoritativo via compute_streak (exclui jogos suspeitos)
      const { data: streakRow } = await supabaseAdmin
        .rpc("compute_streak", { p_user_id: userId });
      const authoritative_streak = streakRow ?? 0;

      // Contadores apenas de jogos não-suspeitos
      const { count: gamesPlayed } = await supabaseAdmin
        .from("game_history")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_archive", false)
        .eq("suspicious", false);

      const { count: gamesWon } = await supabaseAdmin
        .from("game_history")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("won", true)
        .eq("is_archive", false)
        .eq("suspicious", false);

      const { data: histRows } = await supabaseAdmin
        .from("game_history")
        .select("attempts")
        .eq("user_id", userId)
        .eq("won", true)
        .eq("is_archive", false)
        .eq("suspicious", false);

      const distribution: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "X": 0 };
      (histRows || []).forEach((r: any) => {
        const k = String(r.attempts);
        distribution[k] = (distribution[k] || 0) + 1;
      });

      const { data: lastWin } = await supabaseAdmin
        .from("game_history")
        .select("puzzle_date")
        .eq("user_id", userId)
        .eq("won", true)
        .eq("is_archive", false)
        .eq("suspicious", false)
        .order("puzzle_date", { ascending: false })
        .limit(1)
        .single();

      const { data: achievements } = await supabaseAdmin
        .from("user_achievements")
        .select("ach_id, earned_at")
        .eq("user_id", userId);

      const { data: counters } = await supabaseAdmin
        .from("user_timed_counters")
        .select("counter_id, value")
        .eq("user_id", userId);

      return new Response(JSON.stringify({
        stats: {
          ...stats,
          streak: authoritative_streak,
          games_played: gamesPlayed ?? stats?.games_played ?? 0,
          games_won: gamesWon ?? stats?.games_won ?? 0,
          distribution,
          last_played: lastWin?.puzzle_date ?? stats?.last_played ?? null,
        },
        achievements: achievements || [],
        counters: counters || [],
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // BODY necessário para os POSTs
    const body = await req.json();

    // POST /save-result
    if (req.method === "POST" && pathname === "save-result") {
      const {
        puzzle_num, puzzle_date, word, difficulty, word_length,
        attempts, won, used_key, hard_mode, is_archive,
        elapsed_ms,
        stats_payload
      } = body;

      // Anti-cheat: vitória em menos de 10s é suspeita
      // Jogos de arquivo não têm o timer (elapsed_ms null é ok)
      const suspicious = won === true &&
        elapsed_ms !== null &&
        typeof elapsed_ms === "number" &&
        elapsed_ms < MIN_WIN_TIME_MS;

      // Idempotência: previne duplicata para jogo diário
      if (!is_archive) {
        const { data: existing } = await supabaseAdmin
          .from("game_history")
          .select("id")
          .eq("user_id", userId)
          .eq("puzzle_num", puzzle_num)
          .single();

        if (existing) {
          return new Response(JSON.stringify({ success: true, duplicate: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        }
      }

      // Registra no game_history (inclusive se suspeito — para auditoria)
      const { error: histError } = await supabaseAdmin
        .from("game_history")
        .insert({
          user_id: userId,
          puzzle_num,
          puzzle_date,
          word,
          difficulty,
          word_length,
          attempts,
          won,
          used_key,
          hard_mode,
          is_archive,
          elapsed_ms: elapsed_ms ?? null,
          suspicious,
        });

      if (histError) throw histError;

      // Atualiza user_stats (apenas se não suspeito e não arquivo)
      if (stats_payload && !is_archive && !suspicious) {
        const { error: statsError } = await supabaseAdmin
          .from("user_stats")
          .upsert({
            user_id: userId,
            max_streak: stats_payload.max_streak,
            distribution: stats_payload.distribution,
            golden_total: stats_payload.golden_total,
            golden_consec: stats_payload.golden_consec,
            updated_at: new Date().toISOString(),
          }, { onConflict: "user_id" });

        if (statsError) throw statsError;
      }

      // Retorna sempre sucesso (o usuário não sabe se foi flagado)
      return new Response(JSON.stringify({ success: true, suspicious }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // POST /save-achievements
    if (req.method === "POST" && pathname === "save-achievements") {
      const { achievements, counters } = body;

      if (achievements && achievements.length > 0) {
        const achPayload = achievements.map((id: string) => ({
          user_id: userId,
          ach_id: id,
        }));
        await supabaseAdmin.from("user_achievements").upsert(achPayload, { onConflict: "user_id,ach_id" });
      }

      if (counters && counters.length > 0) {
        const countPayload = counters.map((c: any) => ({
          user_id: userId,
          counter_id: c.id,
          value: c.value,
        }));
        await supabaseAdmin.from("user_timed_counters").upsert(countPayload, { onConflict: "user_id,counter_id" });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
