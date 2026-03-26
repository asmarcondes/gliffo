// ═══════════════════════════════════════════════
// STORAGE MIGRATION
// Ao adicionar uma nova migração: incremente SCHEMA_VERSION e adicione
// o bloco correspondente em migrateStorage().
const SCHEMA_VERSION = 1;
const SCHEMA_KEY = "gliffoo_schema_v";

function migrateStorage() {
  try {
    const stored = Number.parseInt(localStorage.getItem(SCHEMA_KEY) || "0", 10);
    if (stored >= SCHEMA_VERSION) return;

    // ── v0 → v1 ─────────────────────────────────────────────────────────────
    // Remove entradas gliffoo_archive_* em excesso (mantém os últimos 365)
    // para evitar acúmulo indefinido no localStorage.
    if (stored < 1) {
      const MAX_ARCHIVE = 365;
      const archiveKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith("gliffoo_archive_")) archiveKeys.push(k);
      }
      if (archiveKeys.length > MAX_ARCHIVE) {
        archiveKeys
          .map((k) => ({ k, n: Number.parseInt(k.replace("gliffoo_archive_", ""), 10) }))
          .sort((a, b) => a.n - b.n)
          .slice(0, archiveKeys.length - MAX_ARCHIVE)
          .forEach(({ k }) => localStorage.removeItem(k));
      }
    }

    localStorage.setItem(SCHEMA_KEY, String(SCHEMA_VERSION));
  } catch (e) {
    console.warn("[glif] migrateStorage erro:", e);
  }
}

// ═══════════════════════════════════════════════
// SUPABASE AUTH CLIENT
// Usado EXCLUSIVAMENTE para autenticação:
//   signInAnonymously(), linkIdentity(), getSession()
// Nenhuma query direta ao banco (zero .from().select())
// Todos os dados passam pela Edge Function player-stats.
// ═══════════════════════════════════════════════
const SUPABASE_URL = "https://ppssfweuotjgcfejdznn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwc3Nmd2V1b3RqZ2NmZWpkem5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3OTgyNTksImV4cCI6MjA4ODM3NDI1OX0.JyqGjz_UKytW6lbhxSgAb3t0d7jV3Gwl5TepEWTa5wk";

let _supabaseClient = null;

function getSupabaseClient() {
  if (!_supabaseClient) {
    // supabase global exposto pelo vendor/supabase.min.js
    _supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false, // app sem OAuth redirect
      },
    });
  }
  return _supabaseClient;
}

// Sessão do usuário atual (preenchida por initAuth)
let _authSession = null;

// Retorna o JWT da sessão atual (para uso nos fetch() às Edge Functions)
function getAuthToken() {
  return _authSession?.access_token ?? null;
}

// Inicializa auth anônimo silenciosamente.
// Se já há sessão salva no localStorage → reutiliza.
// Se não há → cria novo usuário anônimo no Supabase.
// Fire-and-forget: erros não bloqueiam o jogo.
async function initAuth() {
  try {
    const client = getSupabaseClient();

    // Tenta recuperar sessão existente
    const { data: { session } } = await client.auth.getSession();

    if (session) {
      _authSession = session;
      if (window._dbg) console.log("[auth] sessão existente:", session.user.id, session.user.is_anonymous ? "(anônimo)" : "(vinculado)");
      return;
    }

    // Sem sessão → cria usuário anônimo
    const { data, error } = await client.auth.signInAnonymously();
    if (error) {
      console.warn("[auth] signInAnonymously erro:", error.message);
      return;
    }
    _authSession = data.session;
    if (window._dbg) console.log("[auth] novo usuário anônimo criado:", data.user.id);
  } catch (e) {
    console.warn("[auth] initAuth falhou (não bloqueante):", e);
  }
}

// ═══════════════════════════════════════════════
// COMUNICAÇÃO COM EDGE FUNCTION (PLAYER-STATS)
// ═══════════════════════════════════════════════

async function apiEdgeFunction(endpoint, method = "POST", body = null) {
  const token = getAuthToken();
  if (!token) return { error: "No auth token" };

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/player-stats/${endpoint}`, {
      method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    // Tratamento para 204 No Content
    if (res.status === 204) return { data: null };
    
    const text = await res.text();
    let data = null;
    if (text) {
        try {
           data = JSON.parse(text);
        } catch(e) { /* ignore JSON parse error for bare strings */ }
    }

    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    return { data, error: null };
  } catch (error) {
    console.warn(`[api] fail on /${endpoint}`, error);
    return { data: null, error };
  }
}
// SINCRONIZA STATUS DE FIM DE JOGO
async function syncStats(won, attempts) {
  if (ARQUIVO_MODO || PRATICA_MODO) return; // a cloud só conta puzzle diário pro user_stats?
  // Espera, no implementation_plan: o game_history salva arquivo também, mas o user_stats só contabiliza pro jogo do dia.
  
  const token = getAuthToken();
  if (!token) return;

  // Monta payload das stats para atualizar user_stats, apenas se não for arquivo
  const localStats = carregarStats();
  const histPayload = {
    puzzle_num: numeroPuzzle(),
    puzzle_date: dataHoje(),
    word: WORD,
    difficulty: CURRENT_PUZZLE?.difficulty || CICLO_DIF[new Date().getDay()],
    word_length: WORD.length,
    attempts: won ? attempts : null,
    won: won,
    used_key: G.keyUsed,
    hard_mode: HARD_MODE,
    is_archive: ARQUIVO_MODO
  };

  const payload = {
    ...histPayload,
    stats_payload: !ARQUIVO_MODO && !PRATICA_MODO ? {
      streak: localStats.streakAtual,
      max_streak: localStats.streakMax,
      games_played: localStats.jogados,
      games_won: localStats.vitorias,
      last_played: localStats.ultimaVitoria,
      distribution: localStats.distribuicao,
      golden_total: (JSON.parse(localStorage.getItem("gliffoo_gold_v1")) || {}).total || 0,
      golden_consec: (JSON.parse(localStorage.getItem("gliffoo_gold_v1")) || {}).consec || 0,
    } : null
  };

  if (PRATICA_MODO) return; // Prática não enviamos para o server

  await apiEdgeFunction("save-result", "POST", payload);
}
