// ═══════════════════════════════════════════════
// MODO ARQUIVO — puzzles anteriores
// ═══════════════════════════════════════════════
function palavraPorDia(offset) {
  return puzzleInfoPorOffset(offset);
}

function openArquivo() {
  buildArquivoList();
  openM("arquivo-modal");
}

function buildArquivoList() {
  const body = document.getElementById("arquivo-body");
  if (!body) return;
  body.innerHTML = "";

  if (ARQUIVO_MODO || PRATICA_MODO) {
    const btnHoje = document.createElement("button");
    btnHoje.className = "arquivo-hoje-btn";
    btnHoje.textContent = "\u2190 Voltar ao Puzzle de Hoje";
    btnHoje.onclick = () => {
      closeM("arquivo-modal");
      if (PRATICA_MODO) exitPraticaMode();
      else exitArquivoMode();
    };
    body.appendChild(btnHoje);
  }

  const dbgOffset = window._dbgGetOffset ? window._dbgGetOffset() : 0;

  // Real today (PT-BR timezone, no debug offset)
  const todayBase = baseDateSaoPaulo();
  // Simulated today (debug offset applied)
  const todayActual = new Date(todayBase.getTime() + dbgOffset * 86400000);

  // Epoch — puzzle #1 = Sunday 2026-03-08
  const EPOCA_DATE = new Date("2026-03-08T00:00:00-03:00");
  const epochDay = new Date(
    EPOCA_DATE.getFullYear(),
    EPOCA_DATE.getMonth(),
    EPOCA_DATE.getDate(),
  );

  // Sunday of the current (simulated) week
  const curSunday = new Date(
    todayActual.getTime() - todayActual.getDay() * 86400000,
  );
  curSunday.setHours(0, 0, 0, 0);

  const numWeeks = Math.round((curSunday - epochDay) / (7 * 86400000)) + 1;

  const DAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\u00e1b"];

  const calWrap = document.createElement("div");
  calWrap.className = "arquivo-cal-wrap";

  // Day-of-week header (shown once, sticky at top)
  const dayHeader = document.createElement("div");
  dayHeader.className = "arquivo-cal-header";
  DAY_LABELS.forEach((lbl) => {
    const d = document.createElement("div");
    d.className = "arquivo-cal-daylabel";
    d.textContent = lbl;
    dayHeader.appendChild(d);
  });
  calWrap.appendChild(dayHeader);

  // Iterate weeks, newest first (top of list)
  for (let w = numWeeks - 1; w >= 0; w--) {
    const weekSunday = new Date(epochDay.getTime() + w * 7 * 86400000);

    // Show a month label when the month changes going downward
    const weekAbove = new Date(weekSunday.getTime() + 7 * 86400000);
    const showMonthLabel =
      w === numWeeks - 1 || weekSunday.getMonth() !== weekAbove.getMonth();
    if (showMonthLabel) {
      const mlabel = document.createElement("div");
      mlabel.className = "arquivo-cal-monthlabel";
      const mn = weekSunday
        .toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
        .toLowerCase();
      mlabel.textContent = mn.charAt(0).toUpperCase() + mn.slice(1);
      calWrap.appendChild(mlabel);
    }

    const weekRow = document.createElement("div");
    weekRow.className = "arquivo-cal-week";

    for (let d = 0; d < 7; d++) {
      const dayDate = new Date(weekSunday.getTime() + d * 86400000);
      const cell = document.createElement("div");

      // Days before the epoch: empty placeholder to keep grid alignment
      if (dayDate < epochDay) {
        cell.className = "arquivo-cell empty";
        weekRow.appendChild(cell);
        continue;
      }

      const daysFromRealToday = Math.round((dayDate - todayBase) / 86400000);
      const isFuture = daysFromRealToday > dbgOffset;
      const isToday = daysFromRealToday === dbgOffset;

      if (isFuture) {
        cell.className = "arquivo-cell future";
        weekRow.appendChild(cell);
        continue;
      }

      // Past or today
      const info = palavraPorDia(daysFromRealToday);
      const isActive = ARQUIVO_MODO && info.dia === ARQUIVO_PUZZLENUM;

      // Load completion state
      let status = "new";
      let attempts = null;
      let usedKey = false;
      if (isToday) {
        const raw = localStorage.getItem("gliffoo_state");
        if (raw) {
          try {
            const ds = JSON.parse(raw);
            usedKey = !!(ds.keyUsed || (ds.keyPos && ds.keyPos.length > 0));
            if (ds.done) {
              status = ds.won ? "won" : "lost";
              attempts = ds.won && ds.attempts ? ds.attempts.length : null;
            } else if (ds.attempts && ds.attempts.length > 0) {
              status = "progress";
            }
          } catch (_) {
            if (window._dbg)
              console.warn("[glif] arquivo parse daily state", _);
          }
        }
      } else {
        const raw = localStorage.getItem("gliffoo_archive_" + info.dia);
        if (raw) {
          try {
            const sd = JSON.parse(raw);
            usedKey = !!(sd.keyUsed || (sd.keyPos && sd.keyPos.length > 0));
            if (sd.done) {
              status = sd.won ? "won" : "lost";
              attempts = sd.won
                ? typeof sd.attempts === "number"
                  ? sd.attempts
                  : null
                : null;
            } else {
              status = "progress";
            }
          } catch (_) {
            if (window._dbg)
              console.warn("[glif] arquivo parse archive state", _);
          }
        }
      }

      const isFirstTry = status === "won" && attempts === 1 && !usedKey;

      cell.className =
        "arquivo-cell " +
        status +
        (isFirstTry ? " first-try" : "") +
        (isToday ? " today" : "") +
        (isActive ? " active" : "");

      // Accessibility tooltip
      const DIFF_LABELS_TIP = {
        facil: "F\u00e1cil",
        medio: "M\u00e9dio",
        dificil: "Dif\u00edcil",
        muito_dificil: "Muito Dif\u00edcil",
      };
      const keyTag = usedKey ? " \uD83D\uDDDD" : "";
      const statusTip = isFirstTry
        ? "\u2B50 Primeira tentativa!" + keyTag
        : status === "won"
          ? "\u2705 Ganho em " + (attempts || "?") + "/4" + keyTag
          : status === "lost"
            ? "\u274C Falhou"
            : status === "progress"
              ? "\u23F3 Em jogo"
              : "N\u00e3o jogado";
      const dateTip = dayDate.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      cell.title = "#" + info.dia + " \u00b7 " + dateTip + "\n" + statusTip;

      // Puzzle number (top-left, tiny)
      const numEl = document.createElement("span");
      numEl.className = "arquivo-cell-num";
      numEl.textContent = "#" + info.dia;
      cell.appendChild(numEl);

      // Key badge (top-right), shown when key was used
      if (usedKey) {
        const keyEl = document.createElement("span");
        keyEl.className = "arquivo-cell-key";
        keyEl.textContent = "\uD83D\uDDDD";
        cell.appendChild(keyEl);
      }

      // Main icon (center)
      const iconEl = document.createElement("span");
      iconEl.className = "arquivo-cell-icon";
      if (isFirstTry) {
        iconEl.textContent = "\u2605"; // ★
      } else if (status === "won") {
        const used = Math.min(attempts || 4, 4);
        iconEl.textContent = "\u25CF".repeat(used) + "\u25CB".repeat(4 - used);
      } else if (status === "lost") {
        iconEl.textContent = "\u2715";
      } else if (status === "progress") {
        iconEl.textContent = "\u00B7\u00B7\u00B7";
      }
      cell.appendChild(iconEl);

      // "hoje" corner badge
      if (isToday) {
        const hojeEl = document.createElement("span");
        hojeEl.className = "arquivo-cell-hoje";
        hojeEl.textContent = "hoje";
        cell.appendChild(hojeEl);
      }

      // Click handler
      if (isToday) {
        cell.onclick = () => {
          if (ARQUIVO_MODO) exitArquivoMode();
          closeM("arquivo-modal");
        };
      } else {
        cell.onclick = (function (off) {
          return function () {
            closeM("arquivo-modal");
            startArquivoMode(off);
          };
        })(daysFromRealToday);
      }

      weekRow.appendChild(cell);
    }

    calWrap.appendChild(weekRow);
  }

  body.appendChild(calWrap);
}

async function startArquivoMode(offset) {
  let info;
  try {
    setPuzzleReady(false);
    setFb("Carregando puzzle do arquivo...", "");
    info = await fetchPuzzleByOffset(offset);
  } catch (e) {
    console.warn("[glif] startArquivoMode erro:", e);
    setPuzzleReady(true);
    setFb("Não foi possível carregar esse puzzle do arquivo.", "err");
    return;
  }

  ARQUIVO_MODO = true;
  PRATICA_MODO = false;
  ARQUIVO_PUZZLENUM = info.dia;
  ARQUIVO_DATA = info.data;
  applyPuzzleInfo(info);

  // Reset G
  G.typed = [];
  G.attempts = [];
  G.decoded = new Set();
  G.found = new Set();
  G.keyUsed = false;
  G.keyPos = new Set();
  G.done = false;
  G.won = false;
  G.selKey = null;
  G._flipping = false;
  G._flipGen++;

  // Load saved archive state (if any)
  carregarEstadoArquivo(info.dia);

  G.cursor = nextCursor(0);

  // Key dot state
  const kd = document.getElementById("key-dot");
  if (kd) kd.classList.toggle("show", !G.keyUsed);

  // Close open modals
  [
    "win-modal",
    "lose-modal",
    "key-modal",
    "stats-modal",
    "config-modal",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("show");
      el.setAttribute("aria-hidden", "true");
    }
  });

  buildAtts();
  buildBoxes();
  buildKB();
  renderDaily();
  renderYours();
  buildHeaderMeta(info.data);
  setFb("", "");

  if (G.done) {
    buildHistory();
    setTimeout(function () {
      if (G.won) winMod();
      else loseMod();
    }, 600);
  }
}

async function exitArquivoMode() {
  let info;
  try {
    setPuzzleReady(false);
    setFb("Carregando puzzle atual...", "");
    const offset = window._dbgGetOffset ? window._dbgGetOffset() : 0;
    info = await fetchPuzzleByOffset(offset);
  } catch (e) {
    console.warn("[glif] exitArquivoMode erro:", e);
    setPuzzleReady(true);
    setFb("Não foi possível voltar ao puzzle atual.", "err");
    return;
  }

  ARQUIVO_MODO = false;
  ARQUIVO_PUZZLENUM = null;
  ARQUIVO_DATA = null;
  applyPuzzleInfo(info);

  _resetGState();
  carregarEstado();
  G.cursor = nextCursor(0);

  const kd = document.getElementById("key-dot");
  if (kd) kd.classList.toggle("show", !G.keyUsed);

  _closeAllModals();

  buildAtts();
  buildBoxes();
  buildKB();
  renderDaily();
  renderYours();
  buildHeaderMeta(info.data);
  setFb("", "");

  if (G.done) {
    buildHistory();
    setTimeout(function () {
      if (G.won) winMod();
      else loseMod();
    }, 600);
  }
}

function _resetGState() {
  G.typed = [];
  G.attempts = [];
  G.decoded = new Set();
  G.found = new Set();
  G.keyUsed = false;
  G.keyPos = new Set();
  G.dimmedKeys = new Set();
  G.done = false;
  G.won = false;
  G.selKey = null;
  G._flipping = false;
  G._flipGen++;
}

function _recolorWord() {
  Object.keys(colorOf).forEach((k) => delete colorOf[k]);
  WL.forEach((l, i) => {
    if (!colorOf[l]) colorOf[l] = GLYPH_COLORS[i % GLYPH_COLORS.length];
  });
}

function _closeAllModals() {
  [
    "win-modal",
    "lose-modal",
    "key-modal",
    "stats-modal",
    "config-modal",
  ].forEach((id) => closeM(id));
}

function startPraticaMode() {
  // Escolhe palavra aleatória de qualquer dificuldade
  const todas = Array.from(DICIONARIO).filter(w => w.length >= 4 && w.length <= 7);
  CURRENT_PUZZLE = null;
  applyPuzzleWord(todas[Math.floor(Math.random() * todas.length)]);
  setPuzzleReady(true);

  PRATICA_MODO = true;
  ARQUIVO_MODO = false;

  _resetGState();
  G.cursor = nextCursor(0);

  const kd = document.getElementById("key-dot");
  if (kd) kd.classList.toggle("show", !G.keyUsed);

  _closeAllModals();

  buildAtts();
  buildBoxes();
  buildKB();
  renderDaily();
  renderYours();
  buildHeaderMeta();
  setFb("", "");
}

async function exitPraticaMode() {
  let info;
  try {
    setPuzzleReady(false);
    setFb("Carregando puzzle atual...", "");
    const offset = window._dbgGetOffset ? window._dbgGetOffset() : 0;
    info = await fetchPuzzleByOffset(offset);
  } catch (e) {
    console.warn("[glif] exitPraticaMode erro:", e);
    setPuzzleReady(true);
    setFb("Não foi possível voltar ao puzzle atual.", "err");
    return;
  }

  PRATICA_MODO = false;
  applyPuzzleInfo(info);

  _resetGState();
  carregarEstado();
  G.cursor = nextCursor(0);

  const kd = document.getElementById("key-dot");
  if (kd) kd.classList.toggle("show", !G.keyUsed);

  _closeAllModals();

  buildAtts();
  buildBoxes();
  buildKB();
  renderDaily();
  renderYours();
  buildHeaderMeta(info.data);
  setFb("", "");

  if (G.done) {
    buildHistory();
    setTimeout(function () {
      if (G.won) winMod();
      else loseMod();
    }, 600);
  }
}

function _purgeOldArchive(max = 60) {
  const keys = Object.keys(localStorage)
    .filter((k) => k.startsWith("gliffoo_archive_"))
    .map((k) => ({
      k,
      n: parseInt(k.replace("gliffoo_archive_", ""), 10),
    }))
    .filter((o) => !isNaN(o.n))
    .sort((a, b) => b.n - a.n);
  keys.slice(max).forEach((o) => localStorage.removeItem(o.k));
}

function salvarEstadoArquivo() {
  if (!ARQUIVO_PUZZLENUM) return;
  const data = {
    puzzleNum: ARQUIVO_PUZZLENUM,
    word: WORD,
    typed: G.typed,
    attempts: G.attempts.length,
    decoded: [...G.decoded],
    found: [...G.found],
    keyPos: [...G.keyPos],
    done: G.done,
    won: G.won,
    keyUsed: G.keyUsed,
    attHistory: G.attempts,
  };
  localStorage.setItem(
    "gliffoo_archive_" + ARQUIVO_PUZZLENUM,
    JSON.stringify(data),
  );
  _purgeOldArchive();
}

function carregarEstadoArquivo(puzzleNum) {
  try {
    const raw = localStorage.getItem("gliffoo_archive_" + puzzleNum);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data.word !== WORD) return false;
    G.attempts = data.attHistory || [];
    G.decoded = new Set(data.decoded || []);
    G.found = new Set(data.found || []);
    G.keyPos = new Set(data.keyPos || []);
    G.done = data.done || false;
    G.won = data.won || false;
    G.keyUsed = data.keyUsed || false;
    // Restore typed for in-progress: re-fill decoded/keyPos slots
    if (!G.done) {
      G.typed = [];
      let i = 0;
      while (i < WN && (G.decoded.has(i) || G.keyPos.has(i))) {
        G.typed.push(WL[i]);
        i++;
      }
    } else {
      G.typed = G.attempts.length
        ? G.attempts[G.attempts.length - 1].word.split("")
        : [];
    }
    return true;
  } catch (e) {
    console.warn("[glif] carregarEstadoArquivo erro:", e);
    return false;
  }
}

// ═══════════════════════════════════════════════
// MODO DEBUG — navegação entre dias
// Ativar: Ctrl+Shift+D  ou  clique 5x no título
// ═══════════════════════════════════════════════
(function initDebugMode() {
  let _dbgOffset = 0; // dias em relação a hoje (0=hoje, -1=ontem, +1=amanhã)
  // WIN_FINALE — declarada junto a _winOverlay (escopo compartilhado)
  let _dbgActive = false;
  const ATIVA_KEY = "gliffoo_debug";

  function palavraPorOffset(offset) {
    return puzzleInfoPorOffset(offset);
  }

  async function resetParaDebug(offset) {
    let info;
    try {
      setPuzzleReady(false);
      setFb("Carregando puzzle...", "");
      info = await fetchPuzzleByOffset(offset);
    } catch (e) {
      console.warn("[glif] resetParaDebug erro:", e);
      setPuzzleReady(true);
      setFb("Não foi possível carregar esse puzzle.", "err");
      return;
    }

    applyPuzzleInfo(info);
    _resetGState();
    G.cursor = nextCursor(0);
    // Fechar modais se abertos
    [
      "win-modal",
      "lose-modal",
      "key-modal",
      "stats-modal",
      "config-modal",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove("show");
        el.setAttribute("aria-hidden", "true");
      }
    });
    // Re-renderizar
    buildAtts();
    buildBoxes();
    buildKB();
    renderDaily();
    renderYours();
    buildHeaderMeta(info.data); // atualiza data + badge de dificuldade
    await atualizarPainel();
  }

  async function atualizarPainel() {
    const el = (id) => document.getElementById(id);
    if (!el("dbg-word-display")) return; // DOM ainda não pronto
    let info;
    try {
      info = await fetchPuzzleByOffset(_dbgOffset);
    } catch {
      el("dbg-word-display").textContent = "erro";
      el("dbg-day-num").textContent = "--";
      return;
    }
    el("dbg-word-display").textContent = info.word;
    el("dbg-day-num").textContent = "#" + info.dia;
    const offsetLabel =
      _dbgOffset === 0
        ? "hoje"
        : _dbgOffset > 0
          ? "+" + _dbgOffset + " dia(s)"
          : _dbgOffset + " dia(s)";
    el("dbg-offset-display").textContent = offsetLabel;
    const d = info.data;
    const dataStr = d.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    el("dbg-date-display").textContent =
      dataStr + " · " + info.difficulty.replace("_", " ");
  }

  function ativarDebug() {
    if (_dbgActive) return;
    _dbgActive = true;
    document.body.classList.add("debug-mode");
    localStorage.setItem(ATIVA_KEY, "1");
    console.log("[glif] Modo debug ativado. Ctrl+Shift+D para desativar.");
    void atualizarPainel();
  }

  function desativarDebug() {
    _dbgActive = false;
    document.body.classList.remove("debug-mode");
    localStorage.removeItem(ATIVA_KEY);
    const panel = document.getElementById("debug-panel");
    if (panel) panel.classList.remove("open");
    // Restaurar palavra do dia real
    if (_dbgOffset !== 0) {
      _dbgOffset = 0;
      void resetParaDebug(0);
    }
  }

  // Expor eventos para ativar/desativar externamente
  document.body.addEventListener("_dbgAtivar", ativarDebug);
  document.body.addEventListener("_dbgDesativar", desativarDebug);

  // Expor offset para o Modo Arquivo (testes)
  window._dbgGetOffset = () => _dbgOffset;

  // Mostrar botão header em localhost/file
  window.addEventListener("load", () => {
    const isLocal =
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1" ||
      location.protocol === "file:";
    const btn = document.getElementById("hbtn-debug");
    if (btn && isLocal) btn.style.display = "";
  });

  // Restaurar estado debug persistido (após load para DOM estar pronto)
  if (localStorage.getItem(ATIVA_KEY)) {
    _dbgActive = true;
    document.body.classList.add("debug-mode");
    window.addEventListener("load", () => void atualizarPainel(), {
      once: true,
    });
  }

  // Atalho: Ctrl+Shift+D
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "D") {
      e.preventDefault();
      if (_dbgActive) desativarDebug();
      else ativarDebug();
    }
  });

  // Ativar por 5 cliques no título (easter egg)
  let _titClicks = 0,
    _titTimer = null;
  const titulo =
    document.querySelector(".logo-text") || document.querySelector("h1");
  if (titulo) {
    titulo.addEventListener("click", () => {
      _titClicks++;
      clearTimeout(_titTimer);
      if (_titClicks >= 5) {
        _titClicks = 0;
        if (_dbgActive) desativarDebug();
        else ativarDebug();
      } else {
        _titTimer = setTimeout(() => {
          _titClicks = 0;
        }, 1500);
      }
    });
  }

  // Botão toggle e controles — aguardar DOM completo pois HTML está após este script
  window.addEventListener("load", () => {
    const toggle = document.getElementById("debug-toggle");
    if (toggle)
      toggle.addEventListener("click", () => {
        const panel = document.getElementById("debug-panel");
        panel.classList.toggle("open");
        if (panel.classList.contains("open")) void atualizarPainel();
      });

    const safe = (id, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", fn);
    };
    safe("dbg-prev", (e) => {
      e.currentTarget.blur();
      _dbgOffset--;
      void resetParaDebug(_dbgOffset);
    });
    safe("dbg-next", (e) => {
      e.currentTarget.blur();
      _dbgOffset++;
      void resetParaDebug(_dbgOffset);
    });
    safe("dbg-today", (e) => {
      e.currentTarget.blur();
      _dbgOffset = 0;
      void resetParaDebug(0);
    });
    safe("dbg-close", () => {
      document.getElementById("debug-panel").classList.remove("open");
    });
    // Win finale selector
    ["current", "A", "B", "C", "D", "E"].forEach((v) => {
      safe(`dbg-fin-${v}`, () => {
        WIN_FINALE = v;
        document
          .querySelectorAll(".dbg-fin-btn")
          .forEach((b) => b.classList.remove("dbg-fin-active"));
        document.getElementById(`dbg-fin-${v}`).classList.add("dbg-fin-active");
      });
    });
    safe("dbg-fin-test", () => {
      // Remove qualquer overlay pendente antes de testar
      if (_winOverlay) {
        _winOverlay.remove();
        _winOverlay = null;
      }
      // Fecha modal de vitória se estiver aberto
      const wm = document.getElementById("win-modal");
      if (wm) {
        wm.classList.remove("show");
        wm.setAttribute("aria-hidden", "true");
      }
      G.done = G.won = true;
      G.decoded = new Set([...Array(WN).keys()]);
      winAnim();
    });
    safe("dbg-clear", () => {
      if (
        !confirm(
          "Apagar TODOS os dados locais (estado, estatísticas, conquistas, configurações) e recarregar?",
        )
      )
        return;
      Object.keys(localStorage)
        .filter((k) => k.startsWith("gliffoo_"))
        .forEach((k) => localStorage.removeItem(k));
      location.reload();
    });
    for (let s = 0; s <= 6; s++) {
      safe(`dbg-tut-${s}`, () => _dbgTutStep(s));
    }
    // Easter Eggs no debug
    safe("dbg-ee-snake", () => openSnakeGame());
    safe("dbg-ee-invaders", () => {
      localStorage.removeItem("gliffoo_ee_invaders");
      localStorage.removeItem("gliffoo_ee_inv_seen");
      localStorage.removeItem("gliffoo_ee_invaders_unlocked");
      openInvadersGame();
    });
    safe("dbg-ee-confetti", () => eeCanvasConfetti && eeCanvasConfetti());
    safe("dbg-ee-fire", () => _eeFireParticles && _eeFireParticles());
    safe("dbg-ee-radio", () => {
      if (typeof mfpShow === "function") {
        window._mfpEEChannel && window._mfpEEChannel(undefined, true);
        mfpShow();
      }
    });
    safe("dbg-ee-toast", () => showEEToast("🧨 Toast de debug ativado!", 3000));
  });
})();

