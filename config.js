// ═══════════════════════════════════════════════
// ALPHABET
// ═══════════════════════════════════════════════
const LETTERS = {
  A: {
    paths: ["M 5 200 L 100 0 L 195 200", "M 0 100 L 200 100"],
    lc: "butt",
    lj: "miter",
  },
  B: {
    paths: [
      "M 5.0 5.0 L 177.0 5.0 L 195.0 23.0 L 195.0 82.0 L 177.0 100.0 L 5.0 100.0 L 177.0 100.0 L 195.0 118.0 L 195.0 177.0 L 177.0 195.0 L 5.0 195.0 Z",
      "M 5.0 5.0 L 5.0 195.0",
    ],
    lc: "square",
    lj: "miter",
    ml: 6,
  },
  C: {
    paths: [
      "M 200.0 5.0 L 0.0 5.0 M 5.0 5.0 L 5.0 195.0 M 0.0 195.0 L 200.0 195.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  D: {
    paths: [
      "M 5.0 5.0 L 177.0 5.0 L 195.0 23.0 L 195.0 177.0 L 177.0 195.0 L 5.0 195.0 Z",
    ],
    lc: "butt",
    lj: "miter",
  },
  E: {
    paths: [
      "M 5.0 0.0 L 5.0 200.0 M 0.0 5.0 L 200.0 5.0 M 0.0 100.0 L 200.0 100.0 M 0.0 195.0 L 200.0 195.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  F: {
    paths: [
      "M 5.0 0.0 L 5.0 200.0 M 0.0 5.0 L 200.0 5.0 M 0.0 100.0 L 200.0 100.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  G: {
    paths: [
      "M 195.0 100.0 L 195.0 195.0 L 5.0 195.0 L 5.0 5.0 L 195.0 5.0",
      "M 100.0 100.0 L 195.0 100.0",
    ],
    lc: "square",
    lj: "miter",
    ml: 6,
  },
  H: {
    paths: [
      "M 5.0 0.0 L 5.0 200.0 M 195.0 0.0 L 195.0 200.0 M 0.0 100.0 L 200.0 100.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  I: {
    paths: [
      "M 0.0 5.0 L 200.0 5.0 M 100.0 0.0 L 100.0 200.0 M 0.0 195.0 L 200.0 195.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  J: {
    paths: [
      "M 195.0 0.0 L 195.0 200.0 M 0.0 195.0 L 200.0 195.0 M 5.0 195.0 L 5.0 100.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  K: {
    paths: [
      "M 5 0 L 5 200",
      "M 5 100 L 100 100",
      "M 100 100 L 195 5",
      "M 100 100 L 195 195",
    ],
    lc: "butt",
    lj: "bevel",
  },
  L: {
    paths: ["M 5.0 0.0 L 5.0 195.0 L 200.0 195.0"],
    lc: "butt",
    lj: "miter",
  },
  M: {
    paths: [
      "M 5.0 195.0 L 5.0 5.0 L 97.5 97.5 L 102.5 97.5 L 195.0 5.0 L 195.0 195.0",
      "M 100.0 97.5 L 100.0 100.0",
    ],
    lc: "square",
    lj: "miter",
    ml: 6,
  },
  N: {
    paths: [
      "M 5.0 200.0 L 5.0 5.0 L 195.0 195.0 L 195.0 200.0",
      "M 5.0 5.0 L 5.0 0.0",
      "M 195.0 195.0 L 195.0 0.0",
    ],
    lc: "butt",
    lj: "bevel",
  },
  O: {
    paths: [
      "M 23.0 5.0 L 177.0 5.0 L 195.0 23.0 L 195.0 177.0 L 177.0 195.0 L 23.0 195.0 L 5.0 177.0 L 5.0 23.0 Z",
    ],
    lc: "butt",
    lj: "miter",
    ml: 8,
  },
  P: {
    paths: [
      "M 5.0 0.0 L 5.0 200.0",
      "M 5.0 5.0 L 195.0 5.0 L 195.0 100.0 L 5.0 100.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  Q: {
    paths: [
      "M 23.0 5.0 L 177.0 5.0 L 195.0 23.0 L 195.0 177.0 L 177.0 195.0 L 23.0 195.0 L 5.0 177.0 L 5.0 23.0 Z",
      "M 100.0 100.0 L 195.0 195.0",
    ],
    lc: "butt",
    lj: "miter",
    ml: 8,
  },
  R: {
    paths: [
      "M 5.0 0.0 L 5.0 200.0",
      "M 5.0 5.0 L 195.0 5.0 L 195.0 100.0 L 5.0 100.0",
      "M 100.0 100.0 L 195.0 195.0",
    ],
    lc: "butt",
    lj: "bevel",
  },
  S: {
    paths: [
      "M 200.0 5.0 L 0.0 5.0 M 5.0 5.0 L 5.0 100.0 M 0.0 100.0 L 200.0 100.0 M 195.0 100.0 L 195.0 195.0 M 0.0 195.0 L 200.0 195.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  T: {
    paths: ["M 0.0 5.0 L 200.0 5.0 M 100.0 0.0 L 100.0 200.0"],
    lc: "butt",
    lj: "miter",
  },
  U: {
    paths: [
      "M 5.0 0.0 L 5.0 200.0",
      "M 195.0 0.0 L 195.0 200.0",
      "M 5.0 195.0 L 195.0 195.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  V: { paths: ["M 5 0 L 100 200 L 195 0"], lc: "butt", lj: "miter" },
  W: {
    paths: [
      "M 5.0 195.0 L 5.0 5.0 L 97.5 97.5 L 102.5 97.5 L 195.0 5.0 L 195.0 195.0",
      "M 100.0 97.5 L 100.0 100.0",
    ],
    lc: "square",
    lj: "miter",
    ml: 6,
    transform: "translate(0 200) scale(1 -1)",
  },
  X: {
    paths: ["M 5.0 5.0 L 195.0 195.0 M 195.0 5.0 L 5.0 195.0"],
    lc: "butt",
    lj: "bevel",
  },
  Y: {
    paths: [
      "M 5.0 5.0 L 100.0 100.0 L 195.0 5.0",
      "M 100.0 100.0 L 100.0 200.0",
    ],
    lc: "butt",
    lj: "bevel",
  },
  Z: {
    paths: ["M 5.0 5.0 L 195.0 5.0 L 5.0 195.0 L 195.0 195.0"],
    lc: "butt",
    lj: "bevel",
  },
};

function makeSVG(letter, color, extraStyle) {
  const def = LETTERS[letter.toUpperCase()];
  if (!def) return null;
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 200 200");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `Letra ${letter.toUpperCase()}`);
  const title = document.createElementNS(ns, "title");
  title.textContent = `Letra ${letter.toUpperCase()}`;
  svg.appendChild(title);
  if (extraStyle) svg.style.cssText = extraStyle;
  const g = document.createElementNS(ns, "g");
  g.setAttribute("fill", "none");
  g.setAttribute("stroke", color);
  g.setAttribute("stroke-width", "10");
  g.setAttribute("stroke-linecap", def.lc || "butt");
  g.setAttribute("stroke-linejoin", def.lj || "miter");
  g.setAttribute("stroke-miterlimit", String(def.ml || 4));
  if (def.transform) g.setAttribute("transform", def.transform);
  def.paths.forEach((d) => {
    const p = document.createElementNS(ns, "path");
    p.setAttribute("d", d);
    g.appendChild(p);
  });
  svg.appendChild(g);
  return svg;
}

// ═══════════════════════════════════════════════
// BANCO DE PALAVRAS PT-BR (Assíncrono)
// ═══════════════════════════════════════════════
let DICIONARIO = new Set();
let dicReady = false; 
let dicionarioPromise = null;

function loadDicionario() {
  try {
    const cached = localStorage.getItem('gliffoo_dic');
    if (cached) {
      DICIONARIO = new Set(JSON.parse(cached));
      dicReady = true;
      dicionarioPromise = Promise.resolve();
      return;
    }
  } catch (_) {}

  dicionarioPromise = fetch('data/dicionario.json')
    .then((r) => r.json())
    .then((words) => {
      DICIONARIO = new Set(words);
      dicReady = true;
      try { localStorage.setItem('gliffoo_dic', JSON.stringify(words)); } catch (_) {}
    })
    .catch((err) => {
      console.warn('Falha', err);
      dicReady = true;
    });
}
loadDicionario();

// Ciclo semanal de dificuldade (0=Dom, 1=Seg, ..., 6=Sáb)
// Inspirado no glyph.today: dificuldade baseada em sobreposição visual dos shapes
// Score visual: ~40 (fácil) → ~75 (muito difícil)
const CICLO_DIF = [
  "facil", // Dom
  "facil", // Seg
  "medio", // Ter
  "medio", // Qua
  "dificil", // Qui
  "dificil", // Sex
  "muito_dificil", // Sáb
];

// Faixas de score visual por nível (calibradas no modelo do glyph.today)
const SCORE_RANGE = {
  facil: { min: 40, max: 56, letras: [4, 5] },
  medio: { min: 54, max: 62, letras: [5, 6] },
  dificil: { min: 60, max: 68, letras: [5, 6] },
  muito_dificil: { min: 62, max: 80, letras: [7] },
};

// ═══════════════════════════════════════════════
// SCORE DE DIFICULDADE VISUAL
// Baseado na sobreposição dos shapes SVG entre letras únicas da palavra
// Letras repetidas reduzem o score (glifo mais simples de ler)
// Escala aproximada: 40 (fácil) → 75 (muito difícil)
// ═══════════════════════════════════════════════
const LETTER_SEGS = {
  A: new Set(["diag_L", "diag_R", "h_mid"]),
  B: new Set(["v_L", "h_T", "h_M", "h_B", "arc_TR", "arc_BR"]),
  C: new Set(["h_T", "v_L", "h_B"]),
  D: new Set(["v_L", "h_T", "h_B", "arc_R"]),
  E: new Set(["v_L", "h_T", "h_M", "h_B"]),
  F: new Set(["v_L", "h_T", "h_M"]),
  G: new Set(["v_L", "h_T", "h_B", "arc_R", "h_M_R"]),
  H: new Set(["v_L", "v_R", "h_M"]),
  I: new Set(["h_T", "v_C", "h_B"]),
  J: new Set(["v_R", "h_B", "v_L_low"]),
  K: new Set(["v_L", "h_M", "diag_TR", "diag_BR"]),
  L: new Set(["v_L", "h_B"]),
  M: new Set(["v_L", "v_R", "diag_CL", "diag_CR"]),
  N: new Set(["v_L", "v_R", "diag_C"]),
  O: new Set(["arc_all"]),
  P: new Set(["v_L", "h_T", "h_M", "arc_TR"]),
  Q: new Set(["arc_all", "diag_BR"]),
  R: new Set(["v_L", "h_T", "h_M", "arc_TR", "diag_BR"]),
  S: new Set(["h_T", "v_L_up", "h_M", "v_R_dn", "h_B"]),
  T: new Set(["h_T", "v_C"]),
  U: new Set(["v_L", "v_R", "h_B"]),
  V: new Set(["diag_L", "diag_R"]),
  W: new Set(["v_L", "v_R", "diag_CL", "diag_CR"]),
  X: new Set(["diag_L", "diag_R_inv"]),
  Y: new Set(["diag_L_up", "diag_R_up", "v_C_dn"]),
  Z: new Set(["h_T", "diag_C", "h_B"]),
};

function scoreVisual(word) {
  const all = word
    .toUpperCase()
    .split("")
    .filter((l) => LETTER_SEGS[l]);
  // Letras únicas (preservando a primeira ocorrência)
  const unicas = [...new Set(all)];
  const n = unicas.length;
  if (n < 2) return 50;

  // Jaccard entre cada par de letras únicas
  let somaOverlap = 0,
    pares = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const a = LETTER_SEGS[unicas[i]],
        b = LETTER_SEGS[unicas[j]];
      const inter = [...a].filter((x) => b.has(x)).length;
      const union = new Set([...a, ...b]).size;
      somaOverlap += inter / union;
      pares++;
    }
  }
  const avgOverlap = somaOverlap / pares;

  // Repetições tornam o glifo mais simples (menos elementos únicos)
  const repeticoes = all.length - n;

  // Fórmula calibrada para escala ~40-75
  return 45 + avgOverlap * 35 + n * 2 - repeticoes * 5;
}

// ── SUPABASE PROJECT ID ──────────────────────────────────────────────────────
// O Project ID ("ppssfweuotjgcfejdznn") está embutido na URL abaixo.
// Para trocar de projeto: substitua o ID em DAILY_WORD_URL_REMOTE.
// Painel: https://supabase.com/dashboard/project/ppssfweuotjgcfejdznn
// ─────────────────────────────────────────────────────────────────────────────
const DAILY_WORD_URL_REMOTE =
  "https://ppssfweuotjgcfejdznn.supabase.co/functions/v1/daily-word";
const DAILY_WORD_URL_LOCAL = "http://127.0.0.1:54321/functions/v1/daily-word";

function isLocalRuntime() {
  return (
    location.protocol === "file:" ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1"
  );
}

function resolveDailyWordUrl() {
  try {
    const override = localStorage.getItem("gliffoo_daily_word_url");
    if (override) return override;

    // Se estiver usando o Docker local, ativa via flag: localStorage.setItem("gliffoo_local_backend", "true")
    if (localStorage.getItem("gliffoo_local_backend") === "true") {
      return isLocalRuntime() ? DAILY_WORD_URL_LOCAL : DAILY_WORD_URL_REMOTE;
    }
  } catch (error) {
    console.warn("[glif] não foi possível ler override da URL diária", error);
  }

  return DAILY_WORD_URL_REMOTE;
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function baseDateSaoPaulo() {
  const hoje = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
  );
  hoje.setHours(0, 0, 0, 0);
  return hoje;
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function puzzleInfoPorOffset(offset) {
  const EPOCA = new Date("2026-03-08T00:00:00-03:00");
  const alvo = new Date(baseDateSaoPaulo().getTime() + offset * 86400000);
  const diasDesdeEpoca = Math.floor((alvo - EPOCA) / 86400000);
  return {
    dia: diasDesdeEpoca + 1,
    data: alvo,
    dateStr: formatIsoDate(alvo),
    difficulty: CICLO_DIF[alvo.getDay()],
  };
}

function difficultyLabelFor(difficulty) {
  return (
    {
      facil: "Fácil",
      medio: "Médio",
      dificil: "Difícil",
      muito_dificil: "Muito Difícil",
    }[difficulty] || difficulty
  );
}

function hashSeed(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index++) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function buildLocalPuzzle(info) {
  const difficulty = info.difficulty;
  const range = SCORE_RANGE[difficulty] || SCORE_RANGE.medio;
  const pool = Array.from(DICIONARIO).filter(w => range.letras.includes(w.length));
  const seed = hashSeed(`${info.dateStr}:${difficulty}`);
  const word = pool[seed % pool.length];
  return {
    ...info,
    word,
    difficulty,
    difficultyLabel: difficultyLabelFor(difficulty),
    localFallback: true,
  };
}

async function fetchPuzzleByDate(dateStr) {
  const baseUrl = resolveDailyWordUrl();
  const url = new URL(baseUrl);
  if (dateStr) url.searchParams.set("date", dateStr);
  const timeoutMs = baseUrl === DAILY_WORD_URL_LOCAL ? 1500 : 4000;
  
  const headers = {};
  // Adiciona token para passar pelo API Gateway nas Edge Functions na nuvem
  if (typeof SUPABASE_ANON_KEY !== "undefined") {
    headers["Authorization"] = `Bearer ${typeof getAuthToken === "function" && getAuthToken() ? getAuthToken() : SUPABASE_ANON_KEY}`;
  }

  const resp = await fetchWithTimeout(
    url.toString(),
    { 
      headers,
      cache: "no-store" 
    },
    timeoutMs,
  );
  if (!resp.ok) throw new Error(`daily-word ${resp.status}`);
  const data = await resp.json();
  if (
    !data ||
    typeof data.word !== "string" ||
    typeof data.date !== "string" ||
    typeof data.difficulty !== "string"
  ) {
    throw new Error("daily-word payload inválido");
  }
  return {
    word: data.word.toUpperCase(),
    dia: Number(data.puzzle),
    data: new Date(`${data.date}T00:00:00-03:00`),
    dateStr: data.date,
    difficulty: data.difficulty,
    difficultyLabel: data.difficultyLabel,
  };
}

// Busca puzzle por offset SEM fallback local — para o jogo do dia.
// Lança erro se a Edge Function falhar (sem rede = sem jogo).
async function fetchPuzzleForToday() {
  const info = puzzleInfoPorOffset(0);
  const puzzle = await fetchPuzzleByDate(info.dateStr); // pode lançar
  return {
    ...info,
    ...puzzle,
    dia: Number.isFinite(puzzle.dia) ? puzzle.dia : info.dia,
  };
}

// Busca puzzle por offset COM fallback local — para o Modo Arquivo.
// Se a Edge Function falhar, usa hash determinístico local (sem afetar stats).
async function fetchPuzzleByOffset(offset) {
  const info = puzzleInfoPorOffset(offset);
  try {
    const puzzle = await fetchPuzzleByDate(info.dateStr);
    return {
      ...info,
      ...puzzle,
      dia: Number.isFinite(puzzle.dia) ? puzzle.dia : info.dia,
    };
  } catch (error) {
    console.warn("[glif] arquivo: usando fallback local do puzzle:", error);
    return buildLocalPuzzle(info);
  }
}

function applyPuzzleWord(word) {
  WORD = word;
  WL = WORD.split("");
  WN = WL.length;
  Object.keys(colorOf).forEach((k) => delete colorOf[k]);
  WL.forEach((l, i) => {
    if (!colorOf[l]) colorOf[l] = GLYPH_COLORS[i % GLYPH_COLORS.length];
  });
}

function setPuzzleReady(ready) {
  PUZZLE_READY = ready;
  const decodeBtn = document.querySelector(".dbtn");
  if (decodeBtn) decodeBtn.disabled = !ready;
}

function applyPuzzleInfo(info) {
  CURRENT_PUZZLE = info;
  applyPuzzleWord(info.word);
  setPuzzleReady(true);
}

function showPuzzleLoadError(message) {
  setPuzzleReady(false);
  const daily = document.getElementById("daily-stack");
  const yours = document.getElementById("your-stack");
  const meta = document.getElementById("header-meta");
  if (meta) meta.textContent = "Sem conexão";
  if (daily) {
    daily.innerHTML = `
      <div style="padding:1.5rem 1rem;text-align:center;color:var(--text2);display:flex;flex-direction:column;gap:1rem;align-items:center">
        <div style="font-size:2rem">📡</div>
        <div style="font-size:0.95rem;color:var(--text3);max-width:240px;line-height:1.5">${message}</div>
        <button
          onclick="startPraticaMode();closeM('config-modal');"
          style="margin-top:.25rem;padding:.55rem 1.25rem;border-radius:999px;border:none;background:var(--amber);color:#000;font-weight:700;cursor:pointer;font-size:.9rem">
          🎯 Jogar no Modo Prática
        </button>
      </div>`;
  }
  if (yours) yours.innerHTML = "";
  setFb("", "");
}

// Validação multi-tamanho: aceita palavras do banco atual + dicionário 5L
function dicionarioValido(word) {
  // DICIONARIO cobre 4L–7L (~38.6k entradas — léxico fserb/pt-br + Chat A)
  if (DICIONARIO.has(word)) return true;
  // Fallback: qualquer palavra do banco de jogo também é válida
  return (
    PALAVRAS.facil.includes(word) ||
    PALAVRAS.medio.includes(word) ||
    PALAVRAS.dificil.includes(word) ||
    PALAVRAS.muito_dificil.includes(word)
  );
}

function guessEspecialValido(word) {
  const EE_GAME_NAMES = { GLIF: 4, GLIFO: 5, GLIFFO: 6 };
  if (word in EE_GAME_NAMES && EE_GAME_NAMES[word] === WN) return true;
  if (word === "DRONE") return true;
  return ["NAVE", "MARTE", "ASTRO", "OVNI", "LASER"].includes(word);
}

let CURRENT_PUZZLE = null;
let PUZZLE_READY = false;
let WORD = "";
let WL = [],
  WN = 0;
const GLYPH_COLORS = [
  "#f5a623",
  "#9b8fe8",
  "#e87a6b",
  "#5bbfa0",
  "#6baee8",
  "#e8b45b",
  "#a0c878",
];
const colorOf = {}; // mutado ao trocar de puzzle

let G = {
  typed: [],
  cursor: 0,
  attempts: [],
  decoded: new Set(),
  found: new Set(),
  keyUsed: false,
  keyPos: new Set(),
  done: false,
  won: false,
  selKey: null,
  _flipping: false,
  _flipGen: 0,
};

// ─── Modo Arquivo ───────────────────────────────
let ARQUIVO_MODO = false;
let ARQUIVO_PUZZLENUM = null;
let ARQUIVO_DATA = null;

// ─── Modo Prática ────────────────────────────────
let PRATICA_MODO = false;

// ─── Animações UI ────────────────────────────────
let _kbStaggered = false; // stagger do teclado só na primeira build
let _kbDelegate = false; // event delegation configurada uma vez

function glyphStroke() {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--glyph")
      .trim() || "#f0ebe4"
  );
}
