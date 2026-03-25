import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Configuração CORS para requests preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    // Client com Service Role (Ignora RLS - necessário para operations restritas)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // Client autenticado do usuário requistante (respeita RLS)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { 
            status: 401, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
    }

    const { data: { user }, error: userError } = await Object.assign(createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY") || "", { global: { headers: { Authorization: authHeader } } })).auth.getUser();

    if (userError || !user) {
        return new Response(JSON.stringify({ error: "Invalid token" }), { 
            status: 401, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
    }

    const userId = user.id;

    // Lógica baseada no pathname
    const url = new URL(req.url);
    const pathname = url.pathname.split("/").pop(); // endpoint (ex: save-result, my-stats)

    // GET /my-stats
    if (req.method === "GET" && pathname === "my-stats") {
      const { data: stats } = await supabaseAdmin
        .from("user_stats")
        .select("*")
        .eq("user_id", userId)
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
          stats: stats || null, 
          achievements: achievements || [],
          counters: counters || []
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
        stats_payload 
      } = body;

      // 1. Registra no game_history
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
          is_archive
        });

      if (histError) throw histError;

      // 2. Atualiza user_stats (se houver payload)
      // O frontend é responsável por calcular o novo streak, games_played etc.
      // Aqui só fazemos o upsert.
      if (stats_payload) {
          const { error: statsError } = await supabaseAdmin
            .from("user_stats")
            .upsert({
                user_id: userId,
                ...stats_payload,
                updated_at: new Date().toISOString()
            });
            
          if (statsError) throw statsError;
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // POST /save-achievements
    if (req.method === "POST" && pathname === "save-achievements") {
      const { achievements, counters } = body;
      
      // achievements é array de strings (ach_id)
      if (achievements && achievements.length > 0) {
          const achPayload = achievements.map((id: string) => ({
              user_id: userId,
              ach_id: id
          }));
          await supabaseAdmin.from("user_achievements").upsert(achPayload);
      }
      
      // counters é array de objetos { id, value }
      if (counters && counters.length > 0) {
          const countPayload = counters.map((c: any) => ({
              user_id: userId,
              counter_id: c.id,
              value: c.value
          }));
          await supabaseAdmin.from("user_timed_counters").upsert(countPayload);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: "Not Found" }), { 
        status: 404, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
