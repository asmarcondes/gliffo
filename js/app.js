// ═══════════════════════════════════════════════
// INPUT
// ═══════════════════════════════════════════════
function nextCursor(from) {
  // Procura próximo slot vazio a partir de `from` (sem wrap)
  for (let i = from; i < WN; i++) {
    if (!G.decoded.has(i) && !G.keyPos.has(i) && !G.typed[i]) return i;
  }
  // Wrap: volta do início procurando vazio
  for (let i = 0; i < from; i++) {
    if (!G.decoded.has(i) && !G.keyPos.has(i) && !G.typed[i]) return i;
  }
  // Todos preenchidos — fica no slot atual (from - 1, ou seja, o que acabou de ser digitado)
  const last = from - 1;
  if (last >= 0 && !G.decoded.has(last) && !G.keyPos.has(last)) return last;
  // fallback: primeiro editável
  for (let i = 0; i < WN; i++) {
    if (!G.decoded.has(i) && !G.keyPos.has(i)) return i;
  }
  return WN;
}
function prevCursor(from) {
  // Recua cursor para posição editável anterior
  let c = from - 1;
  while (c >= 0 && (G.decoded.has(c) || G.keyPos.has(c))) c--;
  return c;
}

function handleKey(k) {
  if (!PUZZLE_READY) return;
  if (G.done || G._flipping) return;

  if (k === "⌫") {
    let apagou = false;
    let c = G.cursor;
    if (
      c >= 0 &&
      c < WN &&
      G.typed[c] &&
      !G.decoded.has(c) &&
      !G.keyPos.has(c)
    ) {
      // Slot preenchido → só apaga, cursor fica aqui
      G.typed[c] = undefined;
      apagou = true;
    } else {
      // Slot vazio → recua cursor para o anterior editável (pula decoded/keyPos)
      let prev = c - 1;
      while (prev >= 0 && (G.decoded.has(prev) || G.keyPos.has(prev))) prev--;
      if (prev >= 0) {
        G.cursor = prev;
        if (G.typed[prev]) {
          G.typed[prev] = undefined;
          apagou = true;
        }
      }
    }
    document.getElementById("lboxes").classList.remove("invalid");
    refresh();
    if (apagou) calcWarns();
    else setFb("", "");
    return;
  }

  if (k === "↵") {
    decode();
    return;
  }

  // Letra: escreve na posição do cursor e avança
  let c = G.cursor;
  // Se cursor inválido (swap cancelado por tecla), vai pro próximo vazio
  if (c < 0 || c >= WN) c = nextCursor(0);
  // Pula apenas posições auto-preenchidas (decoded/keyPos), não slots com letra do usuário
  while (c < WN && (G.decoded.has(c) || G.keyPos.has(c))) c++;
  if (c >= WN) return; // sem espaço

  G.typed[c] = k;
  G.cursor = nextCursor(c + 1);
  refresh(c);
  calcWarns();
  haptic(30);
  // Bounce animation com anime.js
  const slotEl = document.getElementById("lboxes").children[c];
  if (slotEl) animateBounceLetter(slotEl);
}

function calcWarns() {
  let posErrada = [];
  if (!HARD_MODE) {
    // Apenas avisa sobre letras já tentadas na mesma posição (sem conceito de "eliminada")
    for (let i = 0; i < WN; i++) {
      const l = G.typed[i];
      if (!l || G.decoded.has(i) || G.keyPos.has(i)) continue;
      if (G.attempts.some((a) => a.word[i] === l && !a.decoded.includes(i)))
        posErrada.push({ l, i });
    }
    if (posErrada.length > 0) {
      const letras = [...new Set(posErrada.map(({ l }) => l))].join(", ");
      setFb(
        `⚠ ${letras} já ${posErrada.length > 1 ? "foram tentadas" : "foi tentada"} nessa posição`,
        "warn",
      );
    }
  }

  // Validação quando todos os campos preenchidos
  const full = Array.from({ length: WN }, (_, i) =>
    G.decoded.has(i) || G.keyPos.has(i) ? WL[i] : G.typed[i] || null,
  );
  if (full.every((x) => x)) {
    const guess = full.join("");
    if (!dicionarioValido(guess) && !guessEspecialValido(guess)) {
      setFb("Palavra não encontrada no dicionário.", "err");
      document.getElementById("lboxes").classList.add("invalid");
    } else {
      document.getElementById("lboxes").classList.remove("invalid");
      if (posErrada.length === 0) setFb("", "");
    }
  } else {
    document.getElementById("lboxes").classList.remove("invalid");
    if (posErrada.length === 0) setFb("", "");
  }
}

// Escapa caracteres HTML especiais para uso seguro em innerHTML
function _htmlEsc(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}

function haptic(pattern) {
  try {
    navigator.vibrate && navigator.vibrate(pattern);
  } catch (e) {
    if (window._dbg) console.warn("[glif] haptic", e);
  }
}

// ═══════════════════════════════════════════════
// PERSISTÊNCIA DIÁRIA
// ═══════════════════════════════════════════════
function dataHoje() {
  // en-CA produz YYYY-MM-DD nativamente, sem risco de timezone flip
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
}

function numeroPuzzle() {
  const EPOCA = new Date("2026-03-08T00:00:00-03:00");
  const hoje = baseDateSaoPaulo();
  return Math.floor((hoje - EPOCA) / 86400000) + 1;
}

// ═══════════════════════════════════════════════
// ESTATÍSTICAS — histórico persistente
// ═══════════════════════════════════════════════
function carregarStats() {
  try {
    const raw = localStorage.getItem("gliffoo_stats");
    return raw
      ? JSON.parse(raw)
      : {
          jogados: 0,
          vitorias: 0,
          streakAtual: 0,
          streakMax: 0,
          ultimaVitoria: null,
          distribuicao: { 1: 0, 2: 0, 3: 0, 4: 0, X: 0 },
        };
  } catch (e) {
    console.warn("[glif] loadStats erro:", e);
    return {
      jogados: 0,
      vitorias: 0,
      streakAtual: 0,
      streakMax: 0,
      ultimaVitoria: null,
      distribuicao: { 1: 0, 2: 0, 3: 0, 4: 0, X: 0 },
    };
  }
}

function atualizarStats(won, tentativas) {
  // Não conta no modo arquivo nem prática
  if (ARQUIVO_MODO || PRATICA_MODO) return;
  // Só atualiza uma vez por puzzle (evita duplicar se modal reabrir)
  const jaContou = localStorage.getItem("gliffoo_stats_date");
  if (jaContou === dataHoje()) return;

  const s = carregarStats();
  const hoje = dataHoje();

  // Streak: verifica se jogou ontem
  // Deriva ontemStr a partir de dataHoje() por aritmética de string —
  // evita bugs de timezone (toISOString converte para UTC)
  const [hy, hm, hd] = dataHoje().split("-").map(Number);
  const ontemStr = new Date(Date.UTC(hy, hm - 1, hd - 1))
    .toISOString()
    .slice(0, 10);

  s.jogados++;
  if (won) {
    s.vitorias++;
    const chave = String(tentativas);
    s.distribuicao[chave] = (s.distribuicao[chave] || 0) + 1;
    // Streak
    if (s.ultimaVitoria === ontemStr) {
      s.streakAtual++;
    } else if (s.ultimaVitoria !== hoje) {
      s.streakAtual = 1;
    }
    s.streakMax = Math.max(s.streakMax, s.streakAtual);
    s.ultimaVitoria = hoje;
  } else {
    s.distribuicao["X"] = (s.distribuicao["X"] || 0) + 1;
    // Derrota sempre quebra streak (padrão Wordle)
    s.streakAtual = 0;
  }

  try {
    localStorage.setItem("gliffoo_stats", JSON.stringify(s));
    localStorage.setItem("gliffoo_stats_date", hoje);
  } catch (e) {
    console.warn("[glif] falha ao salvar stats", e);
  }

  // Optimistic UI: exibe streak local imediatamente, reconcilia com a nuvem em background.
  // Após o backend confirmar o resultado, loadStatsFromCloud() busca o streak autoritativo
  // (calculado via compute_streak no Supabase) e atualiza o localStorage silenciosamente.
  syncStats(won, tentativas)
    .then(() => loadStatsFromCloud())
    .catch(() => {});

  // Verifica conquistas após salvar stats atualizadas
  const firstAtt = G.attempts[0];
  checkAchievements({
    won,
    attempts: tentativas,
    stats: s,
    shared: false,
    guess: G.attempts.length ? G.attempts[G.attempts.length - 1].word : null,
    firstDec: firstAtt ? firstAtt.decoded.length : 0,
    firstFnd: firstAtt ? firstAtt.found.length : 0,
  });
  // Badge exclusivo para quem jogou durante o beta
  if (Date.now() < BETA_END_DATE) {
    localStorage.setItem(BETA_KEY, "true");
    queueAch("beta_tester");
  }
}

function salvarEstado() {
  if (ARQUIVO_MODO) {
    salvarEstadoArquivo();
    return;
  }
  if (PRATICA_MODO) return; // prática não persiste
  const data = {
    date: dataHoje(),
    word: WORD,
    typed: G.typed,
    attempts: G.attempts,
    decoded: [...G.decoded],
    found: [...G.found],
    keyPos: [...G.keyPos],
    dimmedKeys: [...G.dimmedKeys],
    done: G.done,
    won: G.won,
    keyUsed: G.keyUsed,
  };
  try {
    localStorage.setItem("gliffoo_state", JSON.stringify(data));
  } catch (e) {
    console.warn("[glif] falha ao salvar estado", e);
  }
}

function carregarEstado() {
  try {
    const raw = localStorage.getItem("gliffoo_state");
    if (!raw) return false;
    const data = JSON.parse(raw);
    // Só restaura se for do dia certo com a mesma palavra
    if (data.date !== dataHoje() || data.word !== WORD) return false;
    G.typed = data.typed || [];
    G.attempts = data.attempts || [];
    G.decoded = new Set(data.decoded || []);
    G.found = new Set(data.found || []);
    G.keyPos = new Set(data.keyPos || []);
    G.dimmedKeys = new Set(data.dimmedKeys || []);
    G.done = data.done || false;
    G.won = data.won || false;
    G.keyUsed = data.keyUsed || false;
    return true;
  } catch (e) {
    console.warn("[glif] carregarEstado erro:", e);
    return false;
  }
}

function winMod() {
  salvarEstado();
  atualizarStats(true, G.attempts.length);
  const s = carregarStats();
  const midCard = ARQUIVO_MODO
    ? `<div class="stat-card"><div class="stat-val">📅</div><div class="stat-lbl">Arquivo #${ARQUIVO_PUZZLENUM}</div></div>`
    : PRATICA_MODO
      ? `<div class="stat-card"><div class="stat-val">🎯</div><div class="stat-lbl">Modo Prática</div></div>`
      : `<div class="stat-card"><div class="stat-val">${s.streakAtual}<span style="font-size:1rem"> 🔥</span></div><div class="stat-lbl">Sequência</div></div>`;
  document.getElementById("win-stats").innerHTML = `
    <div class="stat-card"><div class="stat-val">${G.attempts.length}<span style="font-size:1rem;color:var(--text3)">/4</span></div><div class="stat-lbl">Tentativas</div></div>
    ${midCard}
    <div class="stat-card"><div class="stat-val" style="font-size:1.2rem;letter-spacing:0.1em">${_htmlEsc(WORD)}</div><div class="stat-lbl">Palavra</div></div>`;
  buildShareGrid("win-share");
  const wCB = document.getElementById("win-countdown-block");
  const noCountdown = ARQUIVO_MODO || PRATICA_MODO;
  if (wCB) wCB.style.display = noCountdown ? "none" : "";
  if (!noCountdown) iniciarCountdown("win-countdown");
  const winDef = document.getElementById("win-def");
  if (winDef) winDef.href = `https://www.dicio.com.br/${WORD.toLowerCase()}/`;

  // Checar se mostra CTA de login
  if (!ARQUIVO_MODO && !PRATICA_MODO && _shouldShowAuthCta(s.jogados)) {
    document.getElementById("win-auth-cta").classList.remove("hidden");
  } else {
    document.getElementById("win-auth-cta").classList.add("hidden");
  }

  injectDailyStats("win-community-stats");
  openM("win-modal");
}

function loseMod() {
  salvarEstado();
  atualizarStats(false, 0);
  document.getElementById("lose-word").textContent = WORD;
  const loseDef = document.getElementById("lose-def");
  if (loseDef) loseDef.href = `https://www.dicio.com.br/${WORD.toLowerCase()}/`;
  buildShareGrid("lose-share");
  const lCB = document.getElementById("lose-countdown-block");
  const noCountdownL = ARQUIVO_MODO || PRATICA_MODO;
  if (lCB) lCB.style.display = noCountdownL ? "none" : "";
  if (!noCountdownL) iniciarCountdown("lose-countdown");

  // Checar se mostra CTA de login
  const s = carregarStats();
  if (!ARQUIVO_MODO && !PRATICA_MODO && _shouldShowAuthCta(s.jogados)) {
    document.getElementById("lose-auth-cta").classList.remove("hidden");
  } else {
    document.getElementById("lose-auth-cta").classList.add("hidden");
  }

  injectDailyStats("lose-community-stats");
  openM("lose-modal");
}

// ═══════════════════════════════════════════════
// AUTH CTA HELPERS
// ═══════════════════════════════════════════════
function _shouldShowAuthCta(jogados) {
    if (jogados < 1) return false;
    
    // Se o user já possui email ou provider vinculado, não mostra
    const user = getSupabaseClient()?.auth?.user?.();
    if (user && !user.is_anonymous) return false;
    
    // Checa se rejeitou recentemente (últimos 7 dias)
    try {
        const rejectedStr = localStorage.getItem("gliffoo_auth_rejected");
        if (rejectedStr) {
            const rejectedDate = new Date(parseInt(rejectedStr, 10));
            const diffDays = (Date.now() - rejectedDate) / (1000 * 60 * 60 * 24);
            if (diffDays < 7) return false;
        }
    } catch(e) {}
    
    return true;
}

async function iniciarLogin(btn) {
    btn.disabled = true;
    btn.textContent = "Conectando...";
    const { data, error } = await getSupabaseClient().auth.linkIdentity({
        provider: 'google',
        options: { redirectTo: window.location.origin }
    });
    if (error) {
        console.warn("[auth] erro linkIdentity:", error);
        btn.textContent = "Erro. Tente de novo";
        btn.disabled = false;
    }
    // redirect acontece logo após isso...
}

function rejeitarLogin(btn) {
    try {
        localStorage.setItem("gliffoo_auth_rejected", Date.now().toString());
    } catch(e) {}
    document.getElementById("win-auth-cta").classList.add("hidden");
    document.getElementById("lose-auth-cta").classList.add("hidden");
}

// Countdown para o próximo glifo
let _cdTimer = null;
function iniciarCountdown(elId) {
  if (_cdTimer) clearInterval(_cdTimer);
  function tick() {
    const el = document.getElementById(elId);
    if (!el) return;
    const agora = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/Sao_Paulo",
      }),
    );
    const amanha = new Date(agora);
    amanha.setHours(24, 0, 0, 0);
    const diff = amanha - agora;
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    el.textContent = `${h}:${m}:${s}`;
  }
  tick();
  _cdTimer = setInterval(tick, 1000);
}

function buildShareGrid(id) {
  const c = document.getElementById(id);
  if (!c) return;
  c.innerHTML = "";

  const resultado = G.won ? `${G.attempts.length}/4` : "X/4";
  const s2 = carregarStats();
  const titulo = getTituloStreak(s2.streakAtual);

  const header = document.createElement("div");
  header.style.cssText =
    "font-size:0.78rem;color:var(--text2);font-weight:600;margin-bottom:2px;letter-spacing:0.04em;";
  const _n = ARQUIVO_MODO ? ARQUIVO_PUZZLENUM : numeroPuzzle();
  const _arqTag = ARQUIVO_MODO ? " (arquivo)" : "";
  header.textContent = `joguei glif.foo #${_n}${_arqTag} — ${resultado}`;
  c.appendChild(header);

  const rankLine = document.createElement("div");
  rankLine.style.cssText =
    "font-size:0.75rem;color:var(--text3);margin-bottom:8px;";
  rankLine.textContent = `${titulo.emoji} ${titulo.nome}`;
  c.appendChild(rankLine);

  G.attempts.forEach((a) => {
    const row = document.createElement("div");
    row.style.cssText =
      "font-size:1.25rem;line-height:1.5;letter-spacing:0.1em;";
    let emojis = "";
    for (let i = 0; i < WN; i++) {
      if (a.decoded.includes(i)) emojis += G.keyPos.has(i) ? "🔑" : "✅";
      else if (new Set(a.foundPos || []).has(i)) emojis += "\ud83d\udd0d";
      else emojis += "⬛";
    }
    row.textContent = emojis;
    c.appendChild(row);
  });
}

function share() {
  const n = ARQUIVO_MODO ? ARQUIVO_PUZZLENUM : numeroPuzzle();
  const arqTag = ARQUIVO_MODO ? " (arquivo)" : PRATICA_MODO ? " (prática)" : "";
  const resultado = G.won ? `${G.attempts.length}/4` : "X/4";
  const s2 = carregarStats();
  const titulo = getTituloStreak(s2.streakAtual);
  const lines = [
    `joguei glif.foo #${n}${arqTag}${HARD_MODE ? " 🔥" : ""} — ${resultado}`,
    `${titulo.emoji} ${titulo.nome}`,
    "",
  ];
  G.attempts.forEach((a) => {
    let l = "";
    for (let i = 0; i < WN; i++) {
      if (a.decoded.includes(i)) l += G.keyPos.has(i) ? "🔑" : "✅";
      else if (new Set(a.foundPos || []).has(i)) l += "\ud83d\udd0d";
      else l += "⬛";
    }
    lines.push(l);
  });
  lines.push("");
  lines.push("https://glif.foo");
  
  const textStr = lines.join("\n");
  const showCopiedState = () => {
    const el = document.querySelector(".moverlay.show .copied");
    if (el) {
      el.style.display = "block";
      setTimeout(() => (el.style.display = "none"), 2500);
    }
    // Conquista: compartilhou resultado
    queueAch("spread_the_word");
  };

  if (navigator.share) {
    navigator.share({
      title: 'glif.foo',
      text: textStr
    }).then(() => {
      queueAch("spread_the_word");
    }).catch((err) => {
      // Se user fechar o painel nativo do share ou se der erro, cai pro clipboard de fallback
      navigator.clipboard?.writeText(textStr).then(showCopiedState);
    });
  } else {
    navigator.clipboard?.writeText(textStr).then(showCopiedState);
  }
}

// ═══════════════════════════════════════════════
// LEADERBOARD MODAL
// ═══════════════════════════════════════════════
async function openLeaderboard() {
  const modal = document.getElementById("leaderboard-modal");
  const content = document.getElementById("leaderboard-content");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  
  content.innerHTML = '<div class="loader-spinner" style="margin: auto; width: 30px; height: 30px; border-radius: 50%; border: 3px solid var(--border); border-top-color: var(--c-prime); animation: spin 1s linear infinite;"></div>';
  
  if (typeof window.loadLeaderboard !== "function") {
    content.innerHTML = "<p style='text-align:center;color:var(--text3);'>Conexão com a rede Glif indisponível.</p>";
    return;
  }

  const lbData = await window.loadLeaderboard();
  if (!lbData) {
    content.innerHTML = "<p style='text-align:center;color:var(--text3);'>Nenhum dado retornado ou erro de conexão.</p>";
    return;
  }

  if (lbData.length === 0) {
    content.innerHTML = "<p style='text-align:center;color:var(--text3);'>O Ranking ainda está vazio. Seja o primeiro!</p>";
    return;
  }

  let html = "";
  lbData.forEach((row) => {
    const isMeStr = row.is_me ? " (Você)" : "";
    const color = row.is_me ? "var(--c-prime)" : "var(--text1)";
    const bg = row.is_me ? "var(--bg3)" : "transparent";
    const border = row.is_me ? "1px solid var(--border)" : "1px solid transparent";
    
    html += `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-radius: 8px; background: ${bg}; border: ${border};">
        <div style="font-weight: 600; color: ${color}; display:flex; align-items:center; gap: 8px">
          <span style="opacity: 0.6; min-width: 24px;">#${row.rank}</span> 
          <span>Jogador Anônimo${isMeStr}</span>
        </div>
        <div style="text-align: right; color: var(--text2); font-size: 0.9em;">
          <b style="color:var(--c-prime); font-size: 1.1em;">${row.streak}</b> 🔥
          <br><span style="font-size: 0.8em; opacity: 0.7">${row.games_played} vitórias</span>
        </div>
      </div>
    `;
  });
  content.innerHTML = html;
}

// ═══════════════════════════════════════════════
// COMMUNITY STATS WIDGET
// ═══════════════════════════════════════════════
async function injectDailyStats(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (ARQUIVO_MODO || PRATICA_MODO) {
    container.style.display = "none";
    return;
  }
  
  container.style.display = "block";
  container.innerHTML = '<div class="loader-spinner" style="margin: auto; width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--border); border-top-color: var(--c-prime); animation: spin 1s linear infinite;"></div>';
  
  if (typeof window.loadDailyStats !== "function") {
    container.innerHTML = "<p style='text-align:center;color:var(--text3); font-size:0.85rem;'>Conexão indisponível</p>";
    return;
  }

  const pNum = numeroPuzzle();
  const ds = await window.loadDailyStats(pNum);
  if (!ds || !ds.total_players) {
    container.style.display = "none";
    return;
  }

  const maxVal = Math.max(...Object.values(ds.distribution), 1);
  let distHtml = "";
  ["1", "2", "3", "4", "lost"].forEach(k => {
    const val = ds.distribution[k] || 0;
    const pct = ds.total_players > 0 ? (val / ds.total_players) * 100 : 0;
    const w = Math.max(7, (val / maxVal) * 100);
    const label = k === "lost" ? "❌" : k;
    const myAttemptsStr = G.won ? G.attempts.length.toString() : "lost";
    const highlight = myAttemptsStr === k;
    
    distHtml += `
      <div style="display: flex; align-items: center; margin: 4px 0; font-size: 0.8rem; color: ${highlight ? "var(--c-prime)" : "var(--text2)"}; font-weight: ${highlight ? "bold" : "normal"};">
        <div style="width: 20px; text-align: right; padding-right: 6px;">${label}</div>
        <div style="flex-grow: 1; height: 16px; background: var(--bg1); border-radius: 4px; overflow: hidden;">
          <div style="width: ${w}%; height: 100%; background: ${k === "lost" ? "var(--amber-500)" : "var(--c-prime)"}; opacity: ${highlight ? "1.0" : "0.6"};"></div>
        </div>
        <div style="width: 36px; text-align: right; padding-left: 6px;">${Math.round(pct)}%</div>
      </div>
    `;
  });

  const difTag = ds.won_percentage < 50 ? "Achamos Muito Difícil! 🥵" : (ds.won_percentage > 90 ? "Achamos Fácil! 😌" : "");

  container.innerHTML = `
    <div style="text-align: center; font-weight: 600; color: var(--text1); margin-bottom: 8px; font-size: 0.9rem;">
      Comunidade (Hoje)
    </div>
    <div style="font-size: 0.8rem; color: var(--text3); text-align: center; margin-bottom: 12px;">
      ${ds.total_players} jogadores ${ds.hard_mode_percentage > 0 ? `• ${ds.hard_mode_percentage}% no 🔥` : ''}
    </div>
    ${distHtml}
    <div style="text-align: center; font-size: 0.8rem; color: var(--text2); margin-top: 12px; line-height: 1.4;">
      ${difTag ? `<div style="color:var(--amber-500); font-weight:600; margin-bottom:4px;">${difTag}</div>` : ""}
      ${ds.used_key_percentage}% pediram a chave 🔑
    </div>
  `;
}

// ═══════════════════════════════════════════════
// SHARE PASSPORT
// ═══════════════════════════════════════════════
function makeGlyphDataURL(letters, strokeColor, size) {
  let inner = "";
  for (let i = letters.length - 1; i >= 0; i--) {
    const def = LETTERS[letters[i].toUpperCase()];
    if (!def) continue;
    const xform = def.transform ? ` transform="${def.transform}"` : "";
    const px = def.paths.map((d) => `<path d="${d}"/>`).join("");
    inner +=
      `<g fill="none" stroke="${strokeColor}" stroke-width="10"` +
      ` stroke-linecap="${def.lc || "butt"}" stroke-linejoin="${def.lj || "miter"}"` +
      ` stroke-miterlimit="${def.ml || 4}"${xform}>${px}</g>`;
  }
  const svgStr =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"` +
    ` width="${size}" height="${size}">${inner}</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr);
}

function downloadBlob(blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "glifoo-passaporte.png";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

async function sharePassport() {
  const btn = document.querySelector(".passport-share-btn");
  const origLabel = "📸 Compartilhar passaporte";
  if (btn) {
    btn.disabled = true;
    btn.textContent = "⏳ Gerando…";
  }
  try {
    const s = carregarStats();
    const pct = s.jogados > 0 ? Math.round((s.vitorias / s.jogados) * 100) : 0;
    const titulo = getTituloStreak(s.streakAtual);

    // ── Square 1:1 — funciona em WhatsApp status, Instagram feed e stories ──
    const W = 640,
      H = 640,
      SC = 2;
    const cv = document.createElement("canvas");
    cv.width = W * SC;
    cv.height = H * SC;
    const ctx = cv.getContext("2d");
    ctx.scale(SC, SC);

    const PAD = 36;
    const AMBER = "#f5a623";
    const TEXT = "#f0ebe4";
    const DIM = "#8a7f74";
    const BORDER = "#3a342a";
    const FONT = '"DM Sans", "Inter", system-ui, sans-serif';
    const SERIF = '"DM Serif Display", Georgia, serif';

    // Garantir que as fontes customizadas estejam carregadas antes de desenhar
    await Promise.all([
      document.fonts.load(`normal 20px ${SERIF}`),
      document.fonts.load(`300 13px ${FONT}`),
    ]).catch(() => {});

    // Pre-load glyph image before drawing
    const glyphImg = await new Promise((resolve) => {
      const url = makeGlyphDataURL(WL, "#f0ebe4", 92);
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });

    // ── Background ────────────────────────────────────
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(0, 0, W, H, 18);
    ctx.clip();

    const bg = ctx.createLinearGradient(0, 0, W * 0.7, H);
    bg.addColorStop(0, "#252118");
    bg.addColorStop(1, "#2c271f");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const glow = ctx.createRadialGradient(W, 0, 0, W, 0, 200);
    glow.addColorStop(0, "rgba(245,166,35,0.12)");
    glow.addColorStop(1, "rgba(245,166,35,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Glyph watermark grande — centro-direita
    if (glyphImg) {
      const gs = 180;
      ctx.globalAlpha = 0.035;
      ctx.drawImage(glyphImg, W - PAD - gs + 20, H / 2 - gs / 2, gs, gs);
      ctx.globalAlpha = 1;
    }

    ctx.restore();

    // Card border
    ctx.strokeStyle = BORDER;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(0.5, 0.5, W - 1, H - 1, 18);
    ctx.stroke();

    // ── Header ────────────────────────────────────────
    let y = PAD;
    ctx.textAlign = "left";

    // Logo: "glif.foo" — serif para glif+ponto (ponto âmbar), sans pequeno para foo
    ctx.font = `normal 20px ${SERIF}`;
    ctx.fillStyle = TEXT;
    const glifW = ctx.measureText("glif").width;
    ctx.fillText("glif", PAD, y + 18);
    ctx.fillStyle = AMBER;
    const dotW = ctx.measureText(".").width;
    ctx.fillText(".", PAD + glifW, y + 18);
    ctx.fillStyle = TEXT;
    ctx.font = `300 12px ${FONT}`;
    // "foo" alinhado ao centro vertical de "glif" (topo aprox. y+2, altura 20px → centro y+12)
    // Para 12px sans: baseline ≈ centro + 4px
    ctx.textBaseline = "middle";
    ctx.fillText("foo", PAD + glifW + dotW + 1, y + 9);
    ctx.textBaseline = "alphabetic";

    ctx.font = `600 10px ${FONT}`;
    ctx.fillStyle = "#5a5049";
    ctx.fillText("PASSAPORTE DO JOGADOR", PAD, y + 36);

    // Glyph pequeno no header (canto topo-direito)
    if (glyphImg) {
      const gs = 34;
      ctx.globalAlpha = 0.18;
      ctx.drawImage(glyphImg, W - PAD - gs, PAD + 2, gs, gs);
      ctx.globalAlpha = 1;
    }

    y += 60;

    // ── Stats grid 2×2 ────────────────────────────────
    const goldenStats = loadGoldenStats();
    const statsData = [
      { val: pct + "%", lbl: "Vitórias" },
      { val: String(goldenStats.total) + " ✨", lbl: "Dourados" },
      { val: s.streakAtual + " 🔥", lbl: "Sequência" },
      { val: String(s.streakMax), lbl: "Recorde" },
    ];
    const gapC = 10;
    const cardW = (W - PAD * 2 - gapC) / 2;
    const cardH = 100;

    statsData.forEach((st, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cx = PAD + col * (cardW + gapC);
      const cy = y + row * (cardH + gapC);

      ctx.fillStyle = "#1d1a14";
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardW, cardH, 11);
      ctx.fill();
      ctx.strokeStyle = "#2a251d";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx + 0.5, cy + 0.5, cardW - 1, cardH - 1, 11);
      ctx.stroke();

      ctx.font = `bold 28px ${FONT}`;
      ctx.fillStyle = TEXT;
      ctx.textAlign = "center";
      ctx.fillText(st.val, cx + cardW / 2, cy + 52);
      ctx.font = `11px ${FONT}`;
      ctx.fillStyle = DIM;
      ctx.fillText(st.lbl, cx + cardW / 2, cy + 74);
    });

    y += 2 * cardH + gapC + 16;

    // ── Rank banner ───────────────────────────────────
    const bannerH = 56;
    ctx.fillStyle = "#2b2218";
    ctx.beginPath();
    ctx.roundRect(PAD, y, W - PAD * 2, bannerH, 11);
    ctx.fill();
    ctx.strokeStyle = "#4a3a1f";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(PAD + 0.5, y + 0.5, W - PAD * 2 - 1, bannerH - 1, 11);
    ctx.stroke();

    ctx.font = "22px serif";
    ctx.fillStyle = TEXT;
    ctx.textAlign = "left";
    ctx.fillText(titulo.emoji, PAD + 14, y + bannerH / 2 + 8);

    const textOffX = PAD + 50;
    ctx.font = `bold 15px ${FONT}`;
    ctx.fillStyle = AMBER;
    ctx.fillText(titulo.nome, textOffX, y + bannerH / 2 - 2);

    if (titulo.proximo) {
      const thresholds = [3, 7, 14, 21, 30, 60, 100, 365];
      const idx = thresholds.findIndex((t) => s.streakAtual < t);
      const prev = idx > 0 ? thresholds[idx - 1] : 0;
      const cur = thresholds[idx];
      const pctBarVal = (s.streakAtual - prev) / (cur - prev);

      ctx.font = `10px ${FONT}`;
      ctx.fillStyle = DIM;
      ctx.fillText(
        `Faltam ${titulo.faltam} dia${titulo.faltam !== 1 ? "s" : ""} para ${titulo.proximo}`,
        textOffX,
        y + bannerH / 2 + 15,
      );

      const barX2 = W - PAD - 80;
      const barW2 = 70;
      const barY2 = y + bannerH / 2 - 4;
      ctx.fillStyle = BORDER;
      ctx.beginPath();
      ctx.roundRect(barX2, barY2, barW2, 6, 3);
      ctx.fill();
      ctx.fillStyle = AMBER;
      ctx.beginPath();
      ctx.roundRect(barX2, barY2, Math.max(barW2 * pctBarVal, 5), 6, 3);
      ctx.fill();
    }

    y += bannerH + 16;

    // ── Divider ───────────────────────────────────────
    ctx.strokeStyle = BORDER;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD, y);
    ctx.lineTo(W - PAD, y);
    ctx.stroke();
    y += 14;

    // ── Distribution ──────────────────────────────────
    ctx.font = `600 9px ${FONT}`;
    ctx.fillStyle = "#5a5049";
    ctx.textAlign = "left";
    ctx.fillText("DISTRIBUIÇÃO DE TENTATIVAS", PAD, y + 9);
    y += 18;

    const chaves = ["1", "2", "3", "4", "X"];
    const maxVal = Math.max(1, ...chaves.map((k) => s.distribuicao[k] || 0));
    const tentativaAtual =
      G.done && G.won
        ? String(G.attempts.length)
        : G.done && !G.won
          ? "X"
          : null;
    const rowH = 19,
      rowGap = 4;
    const keyColW = 18;
    const barStartX = PAD + keyColW + 8;
    const barAreaW = W - PAD - barStartX - 10;

    chaves.forEach((k, i) => {
      const val = s.distribuicao[k] || 0;
      const frac = val / maxVal;
      const isCur = k === tentativaAtual;
      const ry = y + i * (rowH + rowGap);

      ctx.font = `11px ${FONT}`;
      ctx.fillStyle = DIM;
      ctx.textAlign = "center";
      ctx.fillText(k, PAD + keyColW / 2, ry + rowH - 4);

      const bw = Math.max(barAreaW * frac, 24);
      ctx.fillStyle = isCur ? "#4a9d6f" : val > 0 ? "#c17f20" : "#2e281f";
      ctx.beginPath();
      ctx.roundRect(barStartX, ry, bw, rowH, rowH / 2);
      ctx.fill();

      ctx.font = `bold 11px ${FONT}`;
      ctx.fillStyle = isCur || val > 0 ? "#1d1a14" : DIM;
      ctx.textAlign = "left";
      ctx.fillText(String(val), barStartX + 10, ry + rowH - 4);
    });

    // ── Footer ────────────────────────────────────────
    ctx.font = `9px ${FONT}`;
    ctx.fillStyle = "#4a3f35";
    ctx.textAlign = "center";
    ctx.fillText(
      "Estatísticas refletem apenas a primeira tentativa do dia  •  glif.foo",
      W / 2,
      H - 16,
    );

    // ── Export ────────────────────────────────────────
    // toBlob como Promise: preserva o user gesture no iOS Safari (microtask vs macrotask)
    const blob = await new Promise((resolve, reject) =>
      cv.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob falhou"))),
        "image/png",
      ),
    );
    const file = new File([blob], "glifoo-passaporte.png", {
      type: "image/png",
    });

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      try {
        await navigator.share({
          files: [file],
          title: "glif.foo — Passaporte",
        });
      } catch (e) {
        if (e.name !== "AbortError") downloadBlob(blob);
      }
    } else {
      downloadBlob(blob);
    }
  } catch (err) {
    console.error("sharePassport:", err);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = origLabel;
    }
  }
}

// ═══════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.dataset.theme === "dark";
  html.dataset.theme = isDark ? "light" : "dark";
  saveConfig({ theme: isDark ? "light" : "dark" });
  syncConfigUI();
  refresh();
}

// ── Configurações ──
const CONFIG_KEY = "gliffoo_config";
let HARD_MODE = false;
let AUDIO_MUTED = false;
function loadConfig() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_KEY)) || {};
  } catch {
    return {};
  }
}
function saveConfig(patch) {
  const c = { ...loadConfig(), ...patch };
  localStorage.setItem(CONFIG_KEY, JSON.stringify(c));
}
function syncConfigUI() {
  const isDark = document.documentElement.dataset.theme === "dark";
  const sw = document.getElementById("cfg-theme-switch");
  const sub = document.getElementById("cfg-theme-sub");
  const icon = document.getElementById("cfg-theme-icon");
  if (sw) sw.classList.toggle("on", isDark);
  if (sub) sub.textContent = isDark ? "Ativado" : "Desativado";
  if (icon) icon.textContent = isDark ? "🌙" : "☀️";
  const hardSw = document.getElementById("cfg-hard-switch");
  const hardSub = document.getElementById("cfg-hard-sub");
  if (hardSw) hardSw.classList.toggle("on", HARD_MODE);
  if (hardSub) hardSub.textContent = HARD_MODE ? "Ativado" : "Desativado";
  const soundSw = document.getElementById("cfg-sound-switch");
  const soundSub = document.getElementById("cfg-sound-sub");
  const soundIcon = document.getElementById("cfg-sound-icon");
  if (soundSw) soundSw.classList.toggle("on", !AUDIO_MUTED);
  if (soundSub) soundSub.textContent = AUDIO_MUTED ? "Desativado" : "Ativado";
  if (soundIcon) soundIcon.textContent = AUDIO_MUTED ? "🔇" : "🔊";
}
function applyHardMode() {
  const btn = document.getElementById("key-btn");
  if (btn) btn.style.display = HARD_MODE ? "none" : "";
}
function toggleHardMode() {
  if (G.attempts.length > 0 && !G.done) {
    setFb("Não é possível mudar o Modo Difícil durante uma partida.", "warn");
    return;
  }
  HARD_MODE = !HARD_MODE;
  saveConfig({ hardMode: HARD_MODE });
  syncConfigUI();
  applyHardMode();
  buildHeaderMeta();
}
function toggleMuteAudio() {
  AUDIO_MUTED = !AUDIO_MUTED;
  saveConfig({ audioMuted: AUDIO_MUTED });
  syncConfigUI();
}
function openConfig() {
  syncConfigUI();
  openM("config-modal");
}
function initConfig() {
  const c = loadConfig();
  if (c.theme) document.documentElement.dataset.theme = c.theme;
  HARD_MODE = !!c.hardMode;
  AUDIO_MUTED = !!c.audioMuted;
  applyHardMode();
  if (Date.now() < BETA_END_DATE) {
    const badge = document.getElementById("ea-badge");
    if (badge) badge.style.display = "inline-block";
    const ea = document.getElementById("cfg-ea-section");
    if (ea)
      ea.innerHTML = `<div class="cfg-ea-info"><strong>Acesso Antecipado</strong> — estatísticas serão resetadas no lançamento oficial em <strong>jun/2026</strong>.</div>`;
  }
}

// ═══════════════════════════════════════════════
// KEYBOARD
// ═══════════════════════════════════════════════
document.addEventListener("keydown", (e) => {
  if (document.querySelector(".moverlay.show")) return;
  if (!document.getElementById("tutorial-overlay").classList.contains("hidden"))
    return;
  const k = e.key.toUpperCase();
  if (e.key === "Backspace") handleKey("⌫");
  else if (e.key === "Enter") handleKey("↵");
  else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    if (G.done) return;
    e.preventDefault();
    const dir = e.key === "ArrowLeft" ? -1 : 1;
    let c = G.cursor + dir;
    // Pula decoded/keyPos na direção escolhida
    while (c >= 0 && c < WN && (G.decoded.has(c) || G.keyPos.has(c))) c += dir;
    if (c >= 0 && c < WN) moveCursor(c);
  } else if (/^[A-Z]$/.test(k)) handleKey(k);
});

// ═══════════════════════════════════════════════
// MODAL DE ESTATÍSTICAS
// ═══════════════════════════════════════════════
function getTituloStreak(streak) {
  if (streak >= 365)
    return {
      emoji: "⚡",
      nome: "Guardião dos Glifos",
      proximo: null,
      faltam: 0,
    };
  if (streak >= 100)
    return {
      emoji: "🔮",
      nome: "Oráculo",
      proximo: "Guardião dos Glifos",
      faltam: 365 - streak,
    };
  if (streak >= 60)
    return {
      emoji: "👑",
      nome: "Hierofante",
      proximo: "Oráculo",
      faltam: 100 - streak,
    };
  if (streak >= 30)
    return {
      emoji: "🎓",
      nome: "Erudito dos Glifos",
      proximo: "Hierofante",
      faltam: 60 - streak,
    };
  if (streak >= 21)
    return {
      emoji: "🧩",
      nome: "Mestre dos Enigmas",
      proximo: "Erudito dos Glifos",
      faltam: 30 - streak,
    };
  if (streak >= 14)
    return {
      emoji: "📚",
      nome: "Linguista",
      proximo: "Mestre dos Enigmas",
      faltam: 21 - streak,
    };
  if (streak >= 7)
    return {
      emoji: "🔑",
      nome: "Criptógrafo",
      proximo: "Linguista",
      faltam: 14 - streak,
    };
  if (streak >= 3)
    return {
      emoji: "🎯",
      nome: "Decodificador",
      proximo: "Criptógrafo",
      faltam: 7 - streak,
    };
  return {
    emoji: "🔰",
    nome: "Novato",
    proximo: "Decodificador",
    faltam: 3 - streak,
  };
}

function openStats() {
  const s = carregarStats();
  const pct = s.jogados > 0 ? Math.round((s.vitorias / s.jogados) * 100) : 0;

  // Cards no passaporte (4 colunas)
  const gs2 = loadGoldenStats();
  document.getElementById("stats-grid-main").innerHTML = `
    <div class="stat-card"><div class="stat-val">${pct}%</div><div class="stat-lbl">Vitórias</div></div>
    <div class="stat-card"><div class="stat-val">✨ ${gs2.total}</div><div class="stat-lbl">Dourados</div></div>
    <div class="stat-card"><div class="stat-val">${s.streakAtual}🔥</div><div class="stat-lbl">Sequência</div></div>
    <div class="stat-card"><div class="stat-val">${s.streakMax}</div><div class="stat-lbl">Recorde</div></div>`;

  // Rank banner
  const titulo = getTituloStreak(s.streakAtual);
  const rankEl = document.getElementById("stats-rank-banner");
  if (rankEl) {
    if (titulo.proximo) {
      const thresholds = [3, 7, 14, 21, 30, 60, 100, 365];
      const idx = thresholds.findIndex((t) => s.streakAtual < t);
      const prev = idx > 0 ? thresholds[idx - 1] : 0;
      const cur = thresholds[idx];
      const pctBar = Math.round(((s.streakAtual - prev) / (cur - prev)) * 100);
      rankEl.innerHTML = `<div class="rank-banner">
  <div class="rank-emoji">${titulo.emoji}</div>
  <div class="rank-info">
    <div class="rank-name">${titulo.nome}</div>
    <div class="rank-next">Faltam ${titulo.faltam} dia${titulo.faltam !== 1 ? "s" : ""} para ${titulo.proximo}</div>
  </div>
  <div class="rank-bar-wrap"><div class="rank-bar" style="width:${pctBar}%"></div></div>
</div>`;
    } else {
      rankEl.innerHTML = `<div class="rank-banner">
  <div class="rank-emoji">${titulo.emoji}</div>
  <div class="rank-info"><div class="rank-name">${titulo.nome}</div></div>
</div>`;
    }
  }

  // Glifo decorativo no passaporte
  const pg = document.getElementById("passport-glyph");
  if (pg) {
    pg.innerHTML = "";
    const stroke = glyphStroke();
    for (let i = WN - 1; i >= 0; i--) {
      const svg = makeSVG(
        WL[i],
        stroke,
        "position:absolute;top:0;left:0;width:100%;height:100%;",
      );
      if (svg) pg.appendChild(svg);
    }
  }

  // Distribuição
  const distrib = document.getElementById("stats-distrib");
  distrib.innerHTML = "";
  const chaves = ["1", "2", "3", "4", "X"];
  const maxVal = Math.max(1, ...chaves.map((k) => s.distribuicao[k] || 0));
  const tentativaAtual =
    G.done && G.won ? String(G.attempts.length) : G.done && !G.won ? "X" : null;

  chaves.forEach((k) => {
    const val = s.distribuicao[k] || 0;
    const pct2 = Math.round((val / maxVal) * 100);
    const isCur = k === tentativaAtual;
    const row = document.createElement("div");
    row.className = "distrib-row";
    row.innerHTML = `
      <div class="distrib-key">${k}</div>
      <div class="distrib-bar-wrap">
        <div class="distrib-bar${isCur ? " cur" : ""}" style="width:${Math.max(pct2, 8)}%">
          <span>${val}</span>
        </div>
      </div>`;
    distrib.appendChild(row);
  });

  // Share section removida — substituída pelo botão "Compartilhar passaporte"
  const statsShareSection = document.getElementById("stats-share-section");
  if (statsShareSection) statsShareSection.innerHTML = "";

  openM("stats-modal");

  // Conquistas inline (renderiza DEPOIS de mostrar o modal)
  requestAnimationFrame(() => {
    renderConquistas();
    const earned = loadAch();
    const cnt = Object.keys(earned).length;
    const countEl = document.getElementById("ach-count-tab");
    if (countEl)
      countEl.textContent =
        cnt > 0 ? cnt + " / " + Object.keys(ACH_MAP).length : "";
    // Garante scroll no topo APÓS renderizar tudo
    const body = document.getElementById("stats-scroll-body");
    if (body) body.scrollTop = 0;
  });
}
// ═══════════════════════════════════════════════


// switchStatsTab: removido — view única

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
// INIT
function startLoaderAnimation() {
  const loaderGlif = document.getElementById("loader-glif");
  if (!loaderGlif) return;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const colors = ["var(--gc0)", "var(--gc1)", "var(--gc2)", "var(--gc3)"];
  
  loaderGlif.innerHTML = "";
  const svgs = [];
  const theme = document.documentElement.getAttribute("data-theme");
  const blendMode = theme === "light" ? "multiply" : "screen";

  for (let i = 0; i < 4; i++) {
    const l = alphabet[Math.floor(Math.random() * alphabet.length)];
    const c = colors[i % colors.length];
    const s = makeSVG(l, c, `position:absolute;top:0;left:0;width:100%;height:100%;mix-blend-mode:${blendMode};`);
    if(s) {
      loaderGlif.appendChild(s);
      svgs.push({ el: s, g: s.querySelector("g") });
    }
  }

  // AnimeJS Line Drawing & Floating
  if (typeof anime !== "undefined" && svgs.length > 0) {
    // 1) Desenha as linhas magicamente como um laser (strokeDashoffset do SVG)
    anime({
      targets: '#loader-glif path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function(el, i) { return i * 200; },
      direction: 'alternate',
      loop: true
    });

    // 2) Rotaciona sutilmente todas as letras de forma independente criando profundidade
    anime({
      targets: svgs.map(s => s.el),
      scale: [0.9, 1.1],
      rotate: () => anime.random(-15, 15),
      translateX: () => anime.random(-5, 5) + "%",
      translateY: () => anime.random(-5, 5) + "%",
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 2000,
      delay: anime.stagger(200)
    });
  }
}

async function bootstrapGame() {
  startLoaderAnimation();
  migrateStorage();
  initConfig();
  checkBetaReset();

  // Auth anônimo silencioso — fire-and-forget (não bloqueia o jogo)
  initAuth().catch(() => {});

  // Sincroniza dados da nuvem (merge local)
  loadStatsFromCloud().catch(() => {});

  try {
    setFb("Carregando glifo de hoje...", "");
    const [info] = await Promise.all([
      fetchPuzzleForToday(),
      dicionarioPromise
    ]);
    applyPuzzleInfo(info);
  } catch (e) {
    console.warn("[glif] bootstrapGame erro:", e);
    const isOffline = !navigator.onLine || e?.name === "AbortError";
    showPuzzleLoadError(
      isOffline
        ? "Você está sem conexão. O glifo do dia requer internet."
        : "Não foi possível carregar o glifo de hoje. Tente novamente em instantes."
    );
    
    const loader = document.getElementById("global-loader");
    if (loader) loader.classList.add("hidden");
    
    return;
  }

  carregarEstado();
  buildAtts();
  buildBoxes();
  buildKB();
  renderDaily();
  renderYours();
  buildHeaderMeta(CURRENT_PUZZLE ? CURRENT_PUZZLE.data : undefined);
  setFb("", "");

  // Remove overlay de loading divertido
  const loader = document.getElementById("global-loader");
  if (loader) loader.classList.add("hidden");
  

  const pParam = new URLSearchParams(location.search).get("p");
  if (pParam) {
    const pNum = parseInt(pParam, 10);
    const hoje = numeroPuzzle();
    history.replaceState(null, "", location.pathname);
    if (!isNaN(pNum) && pNum >= 1 && pNum < hoje) {
      await startArquivoMode(pNum - hoje);
    }
  }

  if (WORD === "ARCO" && !ARQUIVO_MODO && !G.done) {
    queueAch("ee_arco");
    setTimeout(() => setFb("Essa é a palavra do tutorial… 👀", ""), 1400);
  }

  if (G.done) {
    buildHistory();
    setTimeout(() => {
      if (G.won) winMod();
      else loseMod();
    }, 600);
  }
}

// Badge de data + dificuldade no header
function buildHeaderMeta(refDate) {
  const base =
    refDate ||
    new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/Sao_Paulo",
      }),
    );
  const dataFmt = base
    .toLocaleDateString("pt-BR", { day: "numeric", month: "short" })
    .replace(".", "")
    .toUpperCase();
  const diaSemana = base.getDay();
  const CICLO_NAMES = {
    facil: "Fácil",
    medio: "Médio",
    dificil: "Difícil",
    muito_dificil: "Muito Difícil",
  };
  const _VALID_DIFFS = new Set(["facil", "medio", "dificil", "muito_dificil"]);
  const difficulty =
    (_VALID_DIFFS.has(CURRENT_PUZZLE?.difficulty) &&
      CURRENT_PUZZLE.difficulty) ||
    CICLO_DIF[diaSemana];
  const difficultyLabel =
    CURRENT_PUZZLE?.difficultyLabel || CICLO_NAMES[difficulty] || "Puzzle";
  const label = `${_htmlEsc(difficultyLabel)} · ${WN} letras`;
  const meta = document.getElementById("header-meta");
  if (ARQUIVO_MODO) {
    meta.innerHTML = `
    <span class="arquivo-badge">📅 Arquivo #${ARQUIVO_PUZZLENUM}</span>
    <span class="header-date">${dataFmt}</span>
    <span class="dif-badge ${difficulty}">${label}</span>`;
  } else if (PRATICA_MODO) {
    meta.innerHTML = `
    <span class="arquivo-badge" style="background:var(--surface3)">🎯 Prática</span>
    <span class="dif-badge ${difficulty}">${label}</span>`;
  } else {
    const pNum = numeroPuzzle();
    const specialBadge = [100, 365, 1000].includes(pNum)
      ? `<span class="arquivo-badge" style="background:var(--amber-400);color:#000">✨ Puzzle #${pNum}</span>`
      : "";
    meta.innerHTML = `
    <span class="header-date">${dataFmt}</span>
    ${specialBadge}
    <span class="dif-badge ${difficulty}">${label}</span>${
      HARD_MODE
        ? `
    <span class="hard-badge">🔥 Difícil</span>`
        : ""
    }`;
  }
}
void bootstrapGame();



// ── SomaFM Player ──────────────────────────────────────────────────────
(function () {
  const MFP_KEY = "gliffoo_mfp";
  const SOMA_CHANNELS = [
    {
      name: "Drone Zone",
      desc: "Ambient espacial",
      url: "https://ice1.somafm.com/dronezone-128-mp3",
    },
    {
      name: "Groove Salad",
      desc: "Downtempo / eletrônico",
      url: "https://ice1.somafm.com/groovesalad-128-mp3",
    },
    {
      name: "Space Station",
      desc: "Ambient / sci-fi",
      url: "https://ice1.somafm.com/spacestation-128-mp3",
    },
    {
      name: "Suburbs of Goa",
      desc: "Chillout / world",
      url: "https://ice1.somafm.com/suburbsofgoa-128-mp3",
    },
    {
      name: "Sonic Universe",
      desc: "Jazz fusão / nu-jazz",
      url: "https://ice1.somafm.com/sonicuniverse-128-mp3",
    },
  ];

  let _st = { idx: 0 };
  let _eeClickN = 0,
    _eeClickT = null; // EE: 5 cliques no botão ♫
  let _eeChSwitch = 0,
    _eeChT = null; // EE: trocar canal 5x
  const _audio = new Audio();
  _audio.preload = "none";

  function _save() {
    try {
      localStorage.setItem(MFP_KEY, JSON.stringify(_st));
    } catch {}
  }
  function _updateUI() {
    const ch = SOMA_CHANNELS[_st.idx];
    const titleEl = document.getElementById("mfp-title");
    const playBtn = document.getElementById("mfp-play");
    if (titleEl) titleEl.textContent = ch.name + " \u2014 " + ch.desc;
    if (playBtn)
      playBtn.innerHTML = _audio.paused
        ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>'
        : '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
  }
  function _setChannel(idx, play) {
    _st.idx = idx;
    _audio.src = SOMA_CHANNELS[idx].url;
    _audio.load();
    if (play) _audio.play().catch(() => {});
    _updateUI();
    _save();
    // EE: trocar canal 5x em 10s
    clearTimeout(_eeChT);
    _eeChSwitch++;
    _eeChT = setTimeout(() => {
      _eeChSwitch = 0;
    }, 10000);
    if (_eeChSwitch >= 5) {
      _eeChSwitch = 0;
      setTimeout(() => showEEToast("😅 Indeciso? Cada canal é bom!"), 300);
    }
  }
  function mfpTogglePlay() {
    if (_audio.paused) {
      if (!_audio.src) _setChannel(_st.idx, true);
      else _audio.play().catch(() => {});
    } else {
      _audio.pause();
    }
  }
  function mfpNext() {
    _setChannel((_st.idx + 1) % SOMA_CHANNELS.length, !_audio.paused);
  }
  function mfpPrev() {
    _setChannel(
      (_st.idx - 1 + SOMA_CHANNELS.length) % SOMA_CHANNELS.length,
      !_audio.paused,
    );
  }
  function mfpShow() {
    const bar = document.getElementById("mfp-bar");
    if (!bar) return;
    bar.removeAttribute("hidden");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        bar.classList.add("show");
        document.body.classList.add("mfp-open");
      }),
    );
    if (!_audio.src) _setChannel(_st.idx, false);
    _updateUI();
  }
  function mfpHide() {
    const bar = document.getElementById("mfp-bar");
    if (!bar) return;
    bar.classList.remove("show");
    document.body.classList.remove("mfp-open");
    _audio.pause();
    setTimeout(() => bar.setAttribute("hidden", ""), 350);
    _save();
    _updateUI();
  }

  _audio.addEventListener("play", _updateUI);
  _audio.addEventListener("pause", _updateUI);

  // Restore from localStorage
  try {
    const saved = JSON.parse(localStorage.getItem(MFP_KEY));
    if (
      saved &&
      Number.isInteger(saved.idx) &&
      saved.idx >= 0 &&
      saved.idx < SOMA_CHANNELS.length
    )
      _st.idx = saved.idx;
  } catch {}

  window.mfpShow = mfpShow;
  window.mfpHide = mfpHide;
  window.mfpTogglePlay = mfpTogglePlay;
  window.mfpNext = mfpNext;
  window.mfpPrev = mfpPrev;
  // Expose helpers for easter eggs
  window._mfpIsPlaying = () => !_audio.paused;
  window._mfpEEChannel = (idx, play) => {
    const i =
      idx !== undefined
        ? idx
        : Math.floor(Math.random() * SOMA_CHANNELS.length);
    _setChannel(i, !!play);
  };
  // EE footer btn: 5 cliques em 2s → canal aleatório + toast
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".footer-mfp-btn")) return;
    clearTimeout(_eeClickT);
    _eeClickN++;
    _eeClickT = setTimeout(() => {
      _eeClickN = 0;
    }, 2000);
    if (_eeClickN >= 5) {
      _eeClickN = 0;
      queueAch("ee_radio_random");
      const ni = Math.floor(Math.random() * SOMA_CHANNELS.length);
      _setChannel(ni, !_audio.paused);
      mfpShow();
      const msgs = [
        "🎲 Canal aleatório ativado!",
        "📡 Sintonizando o universo…",
        "🎶 Surpresa! " + SOMA_CHANNELS[ni].name,
      ];
      showEEToast(msgs[Math.floor(Math.random() * msgs.length)]);
    }
  });
  _updateUI();
})();
