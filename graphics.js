// ═══════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════
function renderDaily(revealedIndices) {
  const c = document.getElementById("daily-stack");
  const s = glyphStroke();

  if (!HARD_MODE && revealedIndices && revealedIndices.length > 0) {
    // Animação já foi disparada em sincronia com o flip — apenas reconstrói o stack
    c.innerHTML = "";
    for (let i = WN - 1; i >= 0; i--) {
      if (G.decoded.has(i) || G.keyPos.has(i)) continue;
      const l = WL[i];
      const color = G.found.has(l) ? colorOf[l] : s;
      const svg = makeSVG(
        l,
        color,
        "position:absolute;top:0;left:0;width:100%;height:100%;",
      );
      if (svg) {
        svg.setAttribute("data-idx", i);
        c.appendChild(svg);
      }
    }
  } else {
    c.innerHTML = "";
    for (let i = WN - 1; i >= 0; i--) {
      // Em Hard Mode: mostra todas as camadas, inclusive as já decodificadas
      if (!HARD_MODE && (G.decoded.has(i) || G.keyPos.has(i))) continue;
      const l = WL[i];
      const color = G.found.has(l) ? colorOf[l] : s;
      const svg = makeSVG(
        l,
        color,
        "position:absolute;top:0;left:0;width:100%;height:100%;",
      );
      if (svg) {
        svg.setAttribute("data-idx", i);
        c.appendChild(svg);
      }
    }
  }
}

function renderYours() {
  const c = document.getElementById("your-stack");
  c.innerHTML = "";
  const s = glyphStroke();

  // Só renderiza letras que o usuário digitou nesta tentativa
  // (ignora posições auto-preenchidas por decoded/keyPos)
  for (let i = G.typed.length - 1; i >= 0; i--) {
    if (G.decoded.has(i) || G.keyPos.has(i)) continue;
    const l = G.typed[i];
    if (!l) continue;
    // Sem dica de cor: só mostra cor quando a letra estiver na posição correta (decoded)
    const svg = makeSVG(
      l,
      s,
      "position:absolute;top:0;left:0;width:100%;height:100%;",
    );
    if (svg) {
      svg.setAttribute("data-idx", i);
      c.appendChild(svg);
    }
  }
}

function buildAtts() {
  const row = document.getElementById("atts-row");
  const cls = (i) =>
    "adot" +
    (i < G.attempts.length
      ? " used"
      : !G.done && i === G.attempts.length
        ? " cur"
        : "");
  const existing = row.querySelectorAll(".adot");
  if (existing.length === 4) {
    existing.forEach((d, i) => {
      d.className = cls(i);
    });
    return;
  }
  // Primeira montagem
  const lbl = row.querySelector(".att-label");
  row.innerHTML = "";
  if (lbl) row.appendChild(lbl);
  for (let i = 0; i < 4; i++) {
    const d = document.createElement("div");
    d.className = cls(i);
    row.appendChild(d);
  }
}

function buildBoxes(popIdx = -1) {
  const c = document.getElementById("lboxes");
  c.innerHTML = "";
  // Ajusta tamanho dos slots conforme número de letras
  const maxW = WN <= 4 ? 82 : WN === 5 ? 76 : WN === 6 ? 64 : 54;
  const rad = WN <= 5 ? 11 : WN === 6 ? 9 : 7;
  document.documentElement.style.setProperty("--lbox-max", maxW + "px");
  document.documentElement.style.setProperty("--lbox-rad", rad + "px");
  const s = glyphStroke();
  for (let i = 0; i < WN; i++) {
    const b = document.createElement("div");
    b.className = "lbox";
    const isDecoded = G.decoded.has(i) || G.keyPos.has(i);
    if (isDecoded) {
      b.classList.add("decoded");
      if (HARD_MODE) {
        b.style.background = "var(--surface2)";
      } else {
        b.style.background = colorOf[WL[i]];
      }
      if (G.keyPos.has(i) && !G.decoded.has(i)) b.classList.add("kused");
      const svg = makeSVG(WL[i], HARD_MODE ? s : "#fff");
      if (svg) {
        svg.style.cssText =
          "width:65%;height:65%;" + (HARD_MODE ? "opacity:0.55;" : "");
        svg.setAttribute("aria-hidden", "true");
        b.appendChild(svg);
      }
      const status =
        G.keyPos.has(i) && !G.decoded.has(i)
          ? "revelada pela chave"
          : "confirmada";
      b.setAttribute(
        "aria-label",
        `Posição ${i + 1} — letra ${WL[i]}, ${status}`,
      );
    } else if (G.typed[i]) {
      const svg = makeSVG(G.typed[i], s);
      if (svg) {
        svg.style.cssText = "width:65%;height:65%;";
        svg.setAttribute("aria-hidden", "true");
        b.appendChild(svg);
      }
      if (i === G.cursor && !G.done) b.classList.add("active");
      b.style.cursor = "pointer";
      b.setAttribute("aria-label", `Posição ${i + 1} — letra ${G.typed[i]}`);
      b.onclick = (() => {
        const idx = i;
        return () => {
          if (!G.done) moveCursor(idx);
        };
      })();
    } else {
      if (!G.decoded.has(i) && !G.keyPos.has(i) && i === G.cursor && !G.done)
        b.classList.add("active");
      if (!G.decoded.has(i) && !G.keyPos.has(i) && !G.done) {
        b.style.cursor = "text";
        b.onclick = (() => {
          const idx = i;
          return () => moveCursor(idx);
        })();
      }
      b.setAttribute("aria-label", `Posição ${i + 1} — vazia`);
    }
    c.appendChild(b);
    if (i === popIdx) {
      b.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.12)", offset: 0.35 },
          { transform: "scale(0.94)", offset: 0.7 },
          { transform: "scale(1)" },
        ],
        { duration: 180, easing: "cubic-bezier(0.36, 0.07, 0.19, 0.97)" },
      );
    }
  }
}

function moveCursor(idx) {
  if (G.done) return;
  G.cursor = idx;
  refresh();
}

function buildKB() {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["⌫", "Z", "X", "C", "V", "B", "N", "M", "↵"],
  ];
  const kb = document.getElementById("keyboard");
  kb.innerHTML = "";
  rows.forEach((r) => {
    const row = document.createElement("div");
    row.className = "krow";
    r.forEach((k) => {
      const b = document.createElement("button");
      b.className = "kbtn" + (k.length > 1 ? " wide" : "");
      b.textContent = k;
      const kLabel =
        k === "⌫" ? "Apagar" : k === "↵" ? "Confirmar" : `Letra ${k}`;
      b.setAttribute("aria-label", kLabel);
      b.dataset.key = k;
      row.appendChild(b);
    });
    kb.appendChild(row);
  });
  // Event delegation — configura uma vez; sobrevive ao kb.innerHTML rebuild
  if (!_kbDelegate) {
    _kbDelegate = true;
    kb.addEventListener("click", (ev) => {
      const btn = ev.target.closest("[data-key]");
      if (!btn || btn.disabled) return;
      btn.classList.remove("tap");
      btn.getBoundingClientRect();
      btn.classList.add("tap");
      handleKey(btn.dataset.key);
    });
  }
  // Stagger de entrada — só na primeira renderização (carregamento inicial)
  if (!_kbStaggered && typeof anime !== "undefined") {
    _kbStaggered = true;
    const btns = kb.querySelectorAll(".kbtn");
    btns.forEach((b) => {
      b.style.opacity = "0";
    });
    anime({
      targets: btns,
      opacity: [0, 1],
      translateY: [10, 0],
      scale: [0.82, 1],
      duration: 280,
      delay: anime.stagger(18),
      easing: "easeOutBack",
    });
  }
  // Atualiza --kb-h para padding-bottom correto no mobile
  requestAnimationFrame(() => {
    document.documentElement.style.setProperty(
      "--kb-h",
      kb.offsetHeight + "px",
    );
  });
}

function _makeHrow(a, animate) {
  const row = document.createElement("div");
  row.className = "hrow" + (animate ? " hrow-new" : "");
  const wc = document.createElement("div");
  wc.className = "hw";
  wc.textContent = a.word;
  const dc = document.createElement("div");
  dc.className = "dcell";
  a.decoded.forEach((p) => {
    const d = document.createElement("div");
    d.className = "hdot";
    d.style.background = HARD_MODE ? "var(--text-muted)" : colorOf[WL[p]];
    dc.appendChild(d);
  });
  const fc = document.createElement("div");
  fc.className = "dcell";
  a.found.forEach((l) => {
    const d = document.createElement("div");
    d.className = "hdot";
    d.style.background = HARD_MODE ? "var(--text-muted)" : colorOf[l];
    fc.appendChild(d);
  });
  row.appendChild(wc);
  row.appendChild(dc);
  row.appendChild(fc);
  return row;
}

function buildHistory(skipLast = false) {
  if (!G.attempts.length) return;
  document.getElementById("history").style.display = "block";
  const rows = document.getElementById("hrows");
  rows.innerHTML = "";
  const atts = skipLast ? G.attempts.slice(0, -1) : G.attempts;
  [...atts].reverse().forEach((a) => {
    rows.appendChild(_makeHrow(a, false));
  });
}

function prependHistoryRow(attempt) {
  const histEl = document.getElementById("history");
  const rows = document.getElementById("hrows");
  histEl.style.display = "block";
  const row = _makeHrow(attempt, true);
  rows.insertBefore(row, rows.firstChild);
  setTimeout(() => row.classList.remove("hrow-new"), 950);
}

function refresh(popIdx = -1) {
  buildBoxes(popIdx);
  renderDaily();
  renderYours();
}

// ═══════════════════════════════════════════════
// DECODE

// ═══════════════════════════════════════════════
// ANIME.JS MICRO-INTERACTIONS (Chat O)
// ═══════════════════════════════════════════════

// Flip reveal com rotateY — visual mais impactante que scaleY
// Shake da linha com anime.js — para palavra inválida
function animateShakeRow() {
  if (typeof anime === "undefined") return;
  const lboxes = document.getElementById("lboxes");
  if (!lboxes) return;
  anime({
    targets: lboxes,
    translateX: [-8, 8, -8, 8, 0],
    duration: 280,
    easing: "easeInOutQuad",
  });
}

// Bounce ao digitar letra
function animateBounceLetter(slotEl) {
  if (typeof anime === "undefined") return;
  anime({
    targets: slotEl,
    scale: [1, 1.12, 0.98, 1.05, 1],
    duration: 240,
    easing: "easeOutElastic(1, 0.6)",
  });
}

// ═══════════════════════════════════════════════
function decode() {
  if (!PUZZLE_READY) {
    setFb("Aguarde o puzzle carregar.", "err");
    return;
  }
  if (G.done) return;
  if (!AUDIO_MUTED) _getAC(); // aquece o contexto antes dos flips
  const full = Array.from({ length: WN }, (_, i) =>
    G.decoded.has(i) || G.keyPos.has(i) ? WL[i] : G.typed[i] || null,
  );
  if (full.some((x) => !x)) {
    setFb("Complete todas as letras antes de decodificar.", "err");
    haptic(80);
    animateShakeRow();
    return;
  }
  const guess = full.join("");
  // Easter egg: digitar o nome do jogo (adaptado ao tamanho da palavra)
  const EE_GAME_NAMES = { GLIF: 4, GLIFO: 5, GLIFFO: 6 };
  const EE_GAME_MSGS = {
    GLIF: "Isso não é uma palavra… mas tem estilo. 🐊",
    GLIFO: "Quase o nome do jogo. Muito criativo. 🐊",
    GLIFFO: "Isso não é uma palavra... mas aprecio a autoestima. 🐊",
  };
  if (guess in EE_GAME_NAMES && EE_GAME_NAMES[guess] === WN) {
    queueAch("ee_gliffo");
    setFb(EE_GAME_MSGS[guess], "err");
    haptic(80);
    return;
  }
  // Easter egg rádio: digitar DRONE abre Drone Zone tocando
  if (guess === "DRONE" && typeof mfpShow === "function") {
    queueAch("ee_drone");
    const bar = document.getElementById("mfp-bar");
    const isOpen = bar && !bar.hasAttribute("hidden");
    if (!isOpen) {
      window._mfpEEChannel && window._mfpEEChannel(0, true);
      mfpShow();
      showEEToast("📡 Drone Zone ativado... sintonizando o cosmos.");
    } else {
      showEEToast("📡 Já tá no ar!");
    }
  }
  // Easter egg espacial: NAVE/MARTE/ASTRO/OVNI/LASER
  // — só 1 palavra nova conta por jogo (dia)
  // — jogo abre apenas ao completar as 5 (desbloqueio permanente)
  const EE_INV_WORDS = ["NAVE", "MARTE", "ASTRO", "OVNI", "LASER"];
  if (EE_INV_WORDS.includes(guess)) {
    const SEEN_KEY = "gliffoo_ee_inv_seen";
    const UNLOCK_KEY = "gliffoo_ee_invaders_unlocked";
    const TODAY_KEY = "gliffoo_ee_inv_today";
    // Se já desbloqueou as 5: abre sempre
    if (localStorage.getItem(UNLOCK_KEY)) {
      queueAch("ee_invaders");
      if (typeof mfpShow === "function") {
        window._mfpEEChannel && window._mfpEEChannel(0, true);
        mfpShow();
      }
      openInvadersGame();
      showEEToast("👾 Invasão espacial!");
    } else {
      let seen;
      try {
        seen = new Set(JSON.parse(localStorage.getItem(SEEN_KEY)) || []);
      } catch {
        seen = new Set();
      }
      const today = new Date().toISOString().slice(0, 10);
      const alreadyCollected = seen.has(guess);
      const usedToday = localStorage.getItem(TODAY_KEY) === today;
      if (!alreadyCollected && !usedToday) {
        seen.add(guess);
        localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
        localStorage.setItem(TODAY_KEY, today);
        if (seen.size === EE_INV_WORDS.length) {
          localStorage.setItem(UNLOCK_KEY, "1");
          queueAch("ee_invaders");
          if (typeof mfpShow === "function") {
            window._mfpEEChannel && window._mfpEEChannel(0, true);
            mfpShow();
          }
          openInvadersGame();
          showEEToast(
            "🏆 Todas as 5 palavras encontradas! Bem-vindo, Comandante! 👾",
          );
        } else {
          const remaining = EE_INV_WORDS.length - seen.size;
          showEEToast(
            "📡 " +
              seen.size +
              "/5 palavras espaciais... faltam " +
              remaining +
              "!",
          );
        }
      }
    }
  }
  // Validação de dicionário
  if (!dicionarioValido(guess)) {
    setFb("Palavra não encontrada no dicionário.", "err");
    haptic(80);
    document.getElementById("lboxes").classList.add("invalid");
    animateShakeRow();
    return;
  }
  document.getElementById("lboxes").classList.remove("invalid");
  const dec = [],
    fnd = [],
    fndPos = [];

  // Two-pass para tratar duplicatas corretamente (igual ao Wordle)
  // 1ª passagem: posições exatas
  const estoque = [...WL]; // cópia mutável para controlar consumo
  full.forEach((l, i) => {
    if (l === WL[i]) {
      dec.push(i);
      estoque[i] = null; // consumido
    }
  });
  // 2ª passagem: letras existentes mas fora do lugar
  full.forEach((l, i) => {
    if (dec.includes(i)) return; // já acertou posição
    const idx = estoque.indexOf(l);
    if (idx !== -1) {
      fnd.push(l);
      fndPos.push(i); // posição correta para share
      estoque[idx] = null; // consumido — não pode ser usado de novo
    }
  });
  // Resultado por posição para a animação de flip
  const posResult = new Array(WN).fill("miss");
  const estoque2 = [...WL];
  full.forEach((l, i) => {
    if (l === WL[i]) {
      posResult[i] = "correct";
      estoque2[i] = null;
    }
  });
  full.forEach((l, i) => {
    if (posResult[i] === "correct") return;
    const idx = estoque2.indexOf(l);
    if (idx !== -1) {
      posResult[i] = "found";
      estoque2[idx] = null;
    }
  });

  // Mostrar histórico existente antes de iniciar o flip
  if (G.attempts.length) buildHistory();

  // Flip reveal — cada slot gira individualmente esquerda→direita
  const FLIP_MS = 380,
    STAGGER_MS = 120;
  G._flipping = true;
  // Remove cursor indicator during flip animation
  document
    .querySelectorAll("#lboxes .lbox.active")
    .forEach((el) => el.classList.remove("active"));
  const flipGen = ++G._flipGen;
  const flipSlots = document.getElementById("lboxes").children;
  const stroke = glyphStroke();
  // Pré-calcula os tempos absolutos do Web Audio para cada tick
  // (sample-accurate, sem depender de quando o callback JS executa)
  const acNow = !AUDIO_MUTED ? _getAC().currentTime : 0;
  for (let i = 0; i < WN; i++) {
    if (G.decoded.has(i) || G.keyPos.has(i)) continue;
    const slot = flipSlots[i];
    const res = posResult[i];
    const delay = i * STAGGER_MS;
    ((slot, i, res) => {
      setTimeout(() => {
        slot.style.willChange = "transform";
        slot.style.transition = `transform ${FLIP_MS / 2}ms ease-in`;
        slot.style.transform = "scaleY(0)";
        // Fade-out da camada correspondente em "Seu Glifo" em sincronia com o flip
        const ys = document.getElementById("your-stack");
        const ysvg = ys && ys.querySelector(`[data-idx="${i}"]`);
        if (ysvg) {
          ysvg.style.transition = `opacity ${FLIP_MS / 2}ms ease-in`;
          ysvg.style.opacity = "0";
        }
        setTimeout(() => {
          slot.innerHTML = "";
          if (res === "correct") {
            slot.style.background = colorOf[WL[i]];
            slot.style.borderColor = "transparent";
            const svg = makeSVG(WL[i], "#fff");
            if (svg) {
              svg.style.cssText = "width:65%;height:65%;";
              slot.appendChild(svg);
            }
            // Anima camada do Glifo do Dia em sincronia com o tile correto
            if (!HARD_MODE) {
              const dc = document.getElementById("daily-stack");
              const dsv = dc && dc.querySelector(`[data-idx="${i}"]`);
              if (dsv) {
                void dsv.offsetWidth;
                dsv.style.transition =
                  "opacity 0.55s ease-out, transform 0.55s ease-out";
                dsv.style.opacity = "0";
                dsv.style.transform = "scale(1.3) translateY(-12px)";
              }
            }
          } else if (res === "found") {
            // Sem dica de cor — mesma aparência que "miss"
            slot.style.background = "var(--surface2)";
            slot.style.borderColor = "var(--border2)";
            const svg = makeSVG(full[i], stroke);
            if (svg) {
              svg.style.cssText = "width:65%;height:65%;opacity:0.5;";
              slot.appendChild(svg);
            }
          } else {
            // Letra errada — slot neutro sem conceito de "eliminação"
            slot.style.background = "var(--surface2)";
            slot.style.borderColor = "var(--border2)";
            const svg = makeSVG(full[i], stroke);
            if (svg) {
              svg.style.cssText = "width:65%;height:65%;opacity:0.5;";
              slot.appendChild(svg);
            }
          }
          slot.style.transition = `transform ${FLIP_MS / 2}ms ease-out`;
          slot.style.transform = "scaleY(1)";
          eePlayFlipTick(res, acNow + (delay + FLIP_MS / 2) / 1000);
          // Pop suave nos slots corretos via CSS keyframe (sem anime.js para evitar conflito)
          if (res === "correct") {
            setTimeout(
              () => {
                slot.style.transition = "";
                slot.style.transform = "";
                slot.style.willChange = "";
                void slot.offsetWidth; // força reflow limpo
                slot.classList.add("flip-correct-pop");
                slot.addEventListener(
                  "animationend",
                  () => slot.classList.remove("flip-correct-pop"),
                  { once: true },
                );
              },
              FLIP_MS / 2 + 30,
            );
          } else {
            setTimeout(
              () => {
                slot.style.willChange = "";
              },
              FLIP_MS / 2 + 50,
            );
          }
        }, FLIP_MS / 2);
      }, delay);
    })(slot, i, res);
  }

  // Após todos os flips: aplica estado e reconstrói UI
  const totalFlip = (WN - 1) * STAGGER_MS + FLIP_MS + 420;
  setTimeout(() => {
    if (G._flipGen !== flipGen) return; // jogo foi resetado durante animação
    G._flipping = false;
    dec.forEach((p) => G.decoded.add(p));
    fnd.forEach((l) => G.found.add(l));
    G.attempts.push({
      word: guess,
      decoded: dec,
      found: fnd,
      foundPos: fndPos,
    });

    if (G.decoded.size === WN) {
      G.done = G.won = true;
      G.typed = WL.slice();
      buildBoxes();
      renderDaily(); // sem arg: evita timer de 620ms que sobrescreveria iso
      renderYours();
      buildHistory(true); // skip last — prependHistoryRow adiciona com animação
      prependHistoryRow(G.attempts[G.attempts.length - 1]);
      buildAtts();
      buildKB();
      salvarEstado();
      haptic([80, 60, 150]);
      eePlayFanfare();
      // Stagger pop nos slots antes do overlay aparecer
      if (typeof anime !== "undefined") {
        anime({
          targets: document.querySelectorAll("#lboxes .lbox"),
          keyframes: [
            { scale: 1 },
            { scale: 1.16 },
            { scale: 0.94 },
            { scale: 1 },
          ],
          duration: 360,
          delay: anime.stagger(55),
          easing: "easeOutElastic(1, 0.5)",
        });
      }
      setTimeout(() => winAnim(), 380);
      setTimeout(() => eeThematicWord(), 500);
      setTimeout(() => eePalindromeReveal(), 1800);
      // Easter egg: vitória com música tocando
      (function () {
        const bar = document.getElementById("mfp-bar");
        const audio = bar && window._mfpAudio ? window._mfpAudio : null;
        const isPlaying =
          bar &&
          !bar.hasAttribute("hidden") &&
          bar.classList.contains("show") &&
          typeof mfpTogglePlay === "function" &&
          window._mfpIsPlaying &&
          window._mfpIsPlaying();
        if (isPlaying) {
          queueAch("ee_trilha");
          setTimeout(
            () => showEEToast("🌟 Vitória com trilha sonora! 🎶"),
            2200,
          );
        }
      })();
      // Easter egg: insomniac — vitória entre 02:00 e 03:59 (horário SP)
      (function () {
        const spHour = parseInt(
          new Date().toLocaleString("en-US", {
            timeZone: "America/Sao_Paulo",
            hour: "numeric",
            hour12: false,
          }),
          10,
        );
        if (spHour >= 2 && spHour < 4) {
          queueAch("ee_insomniac");
          setTimeout(() => {
            setFb("Ainda acordado às " + spHour + "h? 🌙 Vai dormir!", "ok");
            setTimeout(() => setFb("", ""), 5000);
          }, 2600);
        }
      })();
      return;
    }
    if (G.attempts.length >= 4) {
      G.done = true;
      G.typed = [];
      G.cursor = nextCursor(0);
      buildBoxes();
      renderDaily(dec);
      renderYours();
      buildHistory();
      buildAtts();
      salvarEstado();
      haptic([150, 50, 150]);
      eePlayTrombone();
      setTimeout(() => loseMod(), 400);
      return;
    }

    salvarEstado();
    G.typed = [];
    G.cursor = nextCursor(0);
    G.keyUsed = false;
    setFb("", "");
    G.selKey = null;
    document.getElementById("key-dot").classList.add("show");
    document.getElementById("lboxes").classList.remove("invalid");
    let i2 = 0;
    while (i2 < WN && (G.decoded.has(i2) || G.keyPos.has(i2))) {
      G.typed.push(WL[i2]);
      i2++;
    }
    buildBoxes();
    // Animação de entrada apenas nos slots decoded de RODADAS ANTERIORES
    // (os de dec acabaram de flipar — não precisam de animação extra)
    const newSlots = document.getElementById("lboxes").children;
    for (let i = 0; i < WN; i++) {
      const s = newSlots[i];
      if (s && s.classList.contains("decoded") && !dec.includes(i)) {
        setTimeout(() => {
          s.classList.add("decoded-enter");
          setTimeout(() => s.classList.remove("decoded-enter"), 250);
        }, i * 50);
      }
    }
    renderDaily(dec);
    renderYours();
    prependHistoryRow(G.attempts[G.attempts.length - 1]);
    buildAtts();
    buildKB();
  }, totalFlip);
}

function setFb(msg, type) {
  const el = document.getElementById("fbmsg");
  el.textContent = msg;
  el.className = "fbmsg " + (type || "");
}

// ═══════════════════════════════════════════════
// DECODER KEY
// ═══════════════════════════════════════════════
function openKeyModal() {
  if (G.done) return;
  if (G.keyUsed) {
    setFb("Já usou a chave nesta tentativa.", "err");
    return;
  }
  G.selKey = null;
  document.getElementById("kuse-btn").disabled = true;
  const boxes = document.getElementById("kboxes");
  boxes.innerHTML = "";
  for (let i = 0; i < WN; i++) {
    const b = document.createElement("div");
    const used = G.decoded.has(i) || G.keyPos.has(i);
    b.className = "kbox" + (used ? " used" : "");
    if (used) {
      b.style.background = colorOf[WL[i]];
      const svg = makeSVG(WL[i], "#fff");
      if (svg) {
        svg.style.cssText = "width:58%;height:58%;";
        b.appendChild(svg);
      }
    } else {
      b.textContent = "?";
      b.setAttribute("tabindex", "0");
      b.setAttribute("role", "button");
      b.setAttribute("aria-label", `Revelar posição ${i + 1}`);
      const activate = () => {
        document
          .querySelectorAll(".kbox")
          .forEach((x) => x.classList.remove("sel"));
        b.classList.add("sel");
        G.selKey = i;
        document.getElementById("kuse-btn").disabled = false;
      };
      b.onclick = activate;
      b.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); } };
    }
    boxes.appendChild(b);
  }
  openM("key-modal");
  requestAnimationFrame(() => {
    const firstFree = boxes.querySelector(".kbox:not(.used)");
    if (firstFree) firstFree.focus();
  });
}

function useKey() {
  if (G.selKey === null) return;
  const pos = G.selKey,
    letter = WL[pos];
  G.keyPos.add(pos);
  G.keyUsed = true;
  document.getElementById("key-dot").classList.remove("show");
  G.typed = [];
  G.cursor = nextCursor(0);
  let i = 0;
  while (i < WN && (G.decoded.has(i) || G.keyPos.has(i))) {
    G.typed.push(WL[i]);
    i++;
  }
  closeM("key-modal");
  setFb(`🔑 "${letter}" revelado na posição ${pos + 1}`, "key");
  buildBoxes();
  renderDaily([pos]);
  renderYours();
}

function handleOverlayClick(e, id) {
  if (e.target === e.currentTarget) closeM(id);
}

function handleOverlayKeydown(e, id) {
  if (e.key === "Escape") {
    e.preventDefault();
    closeM(id);
  }
}

// Focus-trap helpers for modals
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
let _modalTrapHandler = null;
let _modalPrevFocus = null;
function _installTrap(modal) {
  _modalPrevFocus = document.activeElement;
  const getFocusable = () => Array.from(modal.querySelectorAll(FOCUSABLE));
  // Focus first focusable element
  const first = getFocusable()[0];
  if (first) first.focus();
  _modalTrapHandler = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      const overlay = modal.closest(".moverlay") || modal;
      if (overlay.id) closeM(overlay.id);
      return;
    }
    if (e.key !== "Tab") return;
    const els = getFocusable();
    if (!els.length) return;
    const fi = els[0],
      la = els[els.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === fi) {
        e.preventDefault();
        la.focus();
      }
    } else {
      if (document.activeElement === la) {
        e.preventDefault();
        fi.focus();
      }
    }
  };
  modal.addEventListener("keydown", _modalTrapHandler);
}
function _removeTrap(modal) {
  if (_modalTrapHandler) {
    modal.removeEventListener("keydown", _modalTrapHandler);
    _modalTrapHandler = null;
  }
  if (_modalPrevFocus && typeof _modalPrevFocus.focus === "function") {
    _modalPrevFocus.focus();
    _modalPrevFocus = null;
  }
}

function closeM(id) {
  const el = document.getElementById(id);
  el.classList.remove("show");
  el.setAttribute("aria-hidden", "true");
  _removeTrap(el.querySelector(".modal") || el);
}
function openM(id) {
  const el = document.getElementById(id);
  el.classList.add("show");
  el.setAttribute("aria-hidden", "false");
  _installTrap(el.querySelector(".modal") || el);
}

// ═══════════════════════════════════════════════
// WIN ANIMATION
// ═══════════════════════════════════════════════
let _winOverlay = null; // singleton — garante cleanup entre testes
let WIN_FINALE = "C"; // variações do finale: current | A | B | C | D | E
function winAnim() {
  // Remove overlay anterior se existir (retest no debug)
  if (_winOverlay) {
    _winOverlay.remove();
    _winOverlay = null;
  }
  const yc = document.getElementById("your-stack");

  // Cria overlay fixo sobre o jogo (igual ao tutorial)
  const overlay = document.createElement("div");
  _winOverlay = overlay;
  overlay.style.cssText = `
          position:fixed; inset:0; z-index:800;
          display:flex; align-items:center; justify-content:center;
          background:rgba(0,0,0,0); transition:background 0.35s ease;
          pointer-events:none;
        `;

  const stage = document.createElement("div");
  stage.style.cssText = `
          width:min(55vw,55vh,320px); aspect-ratio:1;
          perspective:600px; perspective-origin:50% 40%;
        `;
  const stack = document.createElement("div");
  stack.style.cssText = `
          position:relative; width:100%; height:100%;
          transform-style:preserve-3d;
        `;
  stage.appendChild(stack);
  overlay.appendChild(stage);
  document.body.appendChild(overlay);
  // Fade para fundo semi-opaco — dois rAFs garantem que o browser
  // pintou o estado inicial (transparent) antes de transicionar
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      overlay.style.background = "rgba(0,0,0,0.72)";
    }),
  );

  const Z_STEP = 32;
  const half = ((WN - 1) * Z_STEP) / 2;
  const ISO_IN = 650;
  const ISO_HOLD = 250; // pausa no pico — reduzido
  const ISO_OUT = 450; // colapso — mais rápido
  const STAGGER = 300; // stagger entre layers — mais rápido
  let isoTimer = null;
  let idx = WN - 1; // começa da última letra (camada de baixo) → sobe até a primeira

  function addLayer() {
    const zVal = half - idx * Z_STEP;
    const layer = document.createElement("div");
    layer.className = "iso-layer";
    layer.style.setProperty("--iso-z", zVal + "px");
    layer.style.zIndex = WN - idx;
    layer.style.opacity = "0";
    layer.style.transform = "translateZ(0px) rotateX(0deg) rotateZ(0deg)";
    layer.style.transition = "none";
    const svg = makeSVG(WL[idx], colorOf[WL[idx]]);
    if (svg) {
      svg.style.cssText = "width:90%;height:90%;";
      layer.appendChild(svg);
    }
    stack.appendChild(layer);

    // Double-rAF idêntico ao runIso
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        layer.style.transition = `transform ${ISO_IN}ms cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease`;
        layer.style.transform = `translateZ(${zVal}px) rotateX(45deg) rotateZ(-30deg)`;
        layer.style.opacity = "1";
      }),
    );

    idx--;
    if (idx >= 0) {
      isoTimer = setTimeout(addLayer, STAGGER);
    } else {
      // Confetti no pico — quando todas as layers chegaram
      setTimeout(eeCanvasConfetti, ISO_IN + 60);
      // Todas as layers → pausa → colapsa
      isoTimer = setTimeout(() => {
        const layers = [...stack.querySelectorAll(".iso-layer")];
        _doWinFinale(stage, stack, layers, overlay, yc, ISO_OUT);
      }, ISO_IN + ISO_HOLD);
    }
  }
  // Variação C: pula o ISO inteiro, vai direto para o finale
  if (WIN_FINALE === "C") {
    eeCanvasConfetti();
    _doWinFinale(stage, stack, [], overlay, yc, ISO_OUT);
  } else {
    addLayer();
  }
}

// ─── win finale variations ───────────────────────────────────────────
function _winReveal(overlay, yc) {
  if (_winOverlay !== overlay) return; // se já foi substituído, aborta
  overlay.style.transition = "opacity 0.4s ease";
  overlay.style.opacity = "0";
  const dc = document.getElementById("daily-stack");
  if (dc) {
    dc.innerHTML = "";
    for (let i = WN - 1; i >= 0; i--) {
      const s = makeSVG(
        WL[i],
        colorOf[WL[i]],
        "position:absolute;top:0;left:0;width:100%;height:100%;",
      );
      if (s) dc.appendChild(s);
    }
    dc.classList.add("win-glow", "win-reveal");
    dc.addEventListener(
      "animationend",
      () => dc.classList.remove("win-reveal"),
      { once: true },
    );
  }
  yc.innerHTML = "";
  for (let i = WN - 1; i >= 0; i--) {
    const s = makeSVG(
      WL[i],
      colorOf[WL[i]],
      "position:absolute;top:0;left:0;width:100%;height:100%;",
    );
    if (s) yc.appendChild(s);
  }
  yc.classList.add("win-glow", "win-reveal");
  yc.addEventListener("animationend", () => yc.classList.remove("win-reveal"), {
    once: true,
  });
  setTimeout(() => {
    if (_winOverlay === overlay) {
      overlay.remove();
      _winOverlay = null;
    }
    winMod();
  }, 900);
}

function _doWinFinale(stage, stack, layers, overlay, yc, ISO_OUT) {
  if (_winOverlay !== overlay) return; // abortado
  const f = WIN_FINALE;
  // Troca SVGs para colorido e layers para pose flat
  const swapFlat = () =>
    layers.forEach((lay, li) => {
      lay.style.transition = "none";
      lay.style.opacity = "1";
      lay.style.transform = "translateZ(0px) rotateX(0deg) rotateZ(0deg)";
      lay.innerHTML = "";
      const sv = makeSVG(WL[WN - 1 - li], colorOf[WL[WN - 1 - li]]);
      if (sv) {
        sv.style.cssText = "width:90%;height:90%;";
        lay.appendChild(sv);
      }
    });

  if (f === "A") {
    // ── A: ZOOM EXPLOSÃO ──────────────────────────────────────────────────
    // Composição inteira EXPLODE em direção à câmera (scale 20×, fade),
    // depois versão colorida nasce do centro com spring vistoso.
    stage.style.transition = "transform 550ms ease-in, opacity 450ms ease-in";
    stage.style.transform = "scale(20)";
    stage.style.opacity = "0";
    setTimeout(() => {
      swapFlat();
      stage.style.transition = "none";
      stage.style.transform = "scale(0.15)";
      stage.style.opacity = "0";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          stage.style.transition =
            "transform 680ms cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease";
          stage.style.transform = "scale(1)";
          stage.style.opacity = "1";
          setTimeout(() => _winReveal(overlay, yc), 700);
        }),
      );
    }, 560);
  } else if (f === "B") {
    // ── B: CASCATA ────────────────────────────────────────────────────────
    // Composição ISO some, depois cards coloridos caem do topo
    // UM A UM com stagger 180ms — claramente sequencial.
    stage.style.transition = "opacity 200ms ease-in";
    stage.style.opacity = "0";
    setTimeout(() => {
      swapFlat();
      // Posiciona todas as layers acima do viewport
      layers.forEach((lay) => {
        lay.style.transform =
          "translateZ(0px) translateY(-200px) rotateX(0deg) rotateZ(0deg)";
        lay.style.opacity = "0";
      });
      stage.style.transition = "none";
      stage.style.opacity = "1";
      // Cai da camada de cima (layers[WN-1]) para a de baixo (layers[0])
      [...layers].reverse().forEach((lay, ri) => {
        setTimeout(
          () => {
            lay.style.transition =
              "transform 440ms cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease";
            lay.style.transform =
              "translateZ(0px) translateY(0px) rotateX(0deg) rotateZ(0deg)";
            lay.style.opacity = "1";
          },
          60 + ri * 180,
        );
      });
      setTimeout(() => _winReveal(overlay, yc), 60 + layers.length * 180 + 480);
    }, 210);
  } else if (f === "C") {
    // ── C: RÉPLICA DO TUTORIAL ────────────────────────────────────────────
    // Começa direto com a palavra inteira (sem ISO) → stagger pop →
    // spread → billboard → converge → reset
    if (!window.anime) {
      _winReveal(overlay, yc);
      return;
    }

    // Fundo ainda transparent (ISO foi pulado) → escurece imediatamente
    overlay.style.transition = "none";
    overlay.style.background = "rgba(0,0,0,0.82)";
    // Neutraliza o stage (remove perspective ISO) e oculta o stack vazio
    stage.style.cssText =
      "width:min(55vw,55vh,320px);aspect-ratio:1;display:flex;align-items:center;justify-content:center;";
    stack.style.cssText = "display:none;";

    const stageW = stage.offsetWidth || 260;
    const N = WL.length;
    const GAP = 10;
    // Tile fixo (~70px) independente do nº de letras — letras se espalham no spread
    const TILE_SZ = Math.round(Math.min(stageW * 0.27, 80));

    // Estrutura idêntica ao tutorial: perspWrap → wordRow → wrapOuter[]
    const perspWrap = document.createElement("div");
    perspWrap.style.cssText =
      "perspective:700px;perspective-origin:50% 50%;display:flex;justify-content:center;width:100%;overflow:visible;";
    const wordRow = document.createElement("div");
    wordRow.style.cssText = `display:flex;justify-content:center;gap:${GAP}px;transform-style:preserve-3d;will-change:transform;`;
    perspWrap.appendChild(wordRow);
    stage.appendChild(perspWrap);

    // Tiles coloridos — estado inicial = vem de cima, pequenino
    const tiles = WL.map((letter) => {
      const wrapOuter = document.createElement("div");
      wrapOuter.style.cssText = `width:${TILE_SZ}px;height:${TILE_SZ}px;display:flex;align-items:center;justify-content:center;transform-style:preserve-3d;flex-shrink:0;`;
      const sv = makeSVG(letter, colorOf[letter]);
      if (sv) {
        sv.style.cssText = `width:${TILE_SZ}px;height:${TILE_SZ}px;`;
        wrapOuter.appendChild(sv);
      }
      wordRow.appendChild(wrapOuter);
      anime.set(wrapOuter, { opacity: 0, translateY: -14, scale: 0.65 });
      return wrapOuter;
    });
    tiles.forEach((w, i) => {
      w.style.zIndex = String(N - i);
    });

    // Entrada stagger pop — igual ao tutorial (easeOutBack)
    anime({
      targets: tiles,
      opacity: 1,
      translateY: 0,
      scale: 1,
      duration: 480,
      delay: anime.stagger(120),
      easing: "easeOutBack",
      complete: () => {
        if (_winOverlay !== overlay) return;
        const rowCenterX = wordRow.offsetWidth / 2;
        const targetTX = tiles.map(
          (el) => rowCenterX - (el.offsetLeft + el.offsetWidth / 2),
        );
        // ── FASE 1: afasta as letras
        anime({
          targets: tiles,
          translateX: (el, i) => (i - (N - 1) / 2) * 52,
          duration: 700,
          easing: "easeOutCubic",
          complete: () => {
            if (_winOverlay !== overlay) return;
            // ── FASE 2: billboard (wordRow +Y / tiles -Y simultaneamente)
            anime({
              targets: wordRow,
              rotateY: 90,
              duration: 2200,
              easing: "easeInOutQuad",
            });
            anime({
              targets: tiles,
              rotateY: -90,
              duration: 2200,
              easing: "easeInOutQuad",
              complete: () => {
                if (_winOverlay !== overlay) return;
                // ── FASE 3a: convergem ao centro
                anime({
                  targets: tiles,
                  translateX: (el, i) => targetTX[i],
                  duration: 900,
                  easing: "easeInOutQuad",
                  complete: () => {
                    if (_winOverlay !== overlay) return;
                    // ── FASE 3b: desfaz rotação
                    anime({
                      targets: wordRow,
                      rotateY: 0,
                      duration: 900,
                      easing: "easeInOutSine",
                    });
                    anime({
                      targets: tiles,
                      rotateY: 0,
                      duration: 900,
                      easing: "easeInOutSine",
                      complete: () => {
                        if (_winOverlay !== overlay) return;
                        setTimeout(() => _winReveal(overlay, yc), 200);
                      },
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
  } else if (f === "D") {
    // ── D: FLASH BRANCO ───────────────────────────────────────────────────
    // Composição some rápido, tela CORTA para branco puro,
    // versão colorida materializa com spring. Arquétipo de corte de filme.
    stage.style.transition = "opacity 120ms ease-in";
    stage.style.opacity = "0";
    setTimeout(() => {
      overlay.style.transition = "background 50ms linear";
      overlay.style.background = "#ffffff";
      setTimeout(() => {
        swapFlat();
        stage.style.transform = "scale(0.4)";
        overlay.style.transition = "background 450ms ease-out";
        overlay.style.background = "rgba(0,0,0,0.82)";
        stage.style.transition =
          "transform 650ms cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease";
        stage.style.transform = "scale(1)";
        stage.style.opacity = "1";
        setTimeout(() => _winReveal(overlay, yc), 670);
      }, 80);
    }, 130);
  } else if (f === "E") {
    // ── E: COIN-FLIP (técnica do tutorial) ───────────────────────────────
    // Igual à animação "juntar as letras" do tutorial:
    // O glifo ISO gira rotateY até ficar de fio (90°, invisível),
    // troca para colors + flat, depois abre do outro lado com spring.
    if (!window.anime) {
      swapFlat();
      setTimeout(() => _winReveal(overlay, yc), 400);
      return;
    }
    overlay.style.perspective = "700px";
    overlay.style.perspectiveOrigin = "50% 50%";
    // Fase 1: fecha (gira até 90° = invisível)
    anime({
      targets: stage,
      rotateY: 90,
      duration: 520,
      easing: "easeInCubic",
      complete: () => {
        if (_winOverlay !== overlay) return;
        // Na virada: troca cores e achata as layers
        swapFlat();
        // Fase 2: abre do outro lado com spring
        anime({
          targets: stage,
          rotateY: 0,
          duration: 700,
          easing: "easeOutBack",
          complete: () => {
            if (_winOverlay !== overlay) return;
            setTimeout(() => _winReveal(overlay, yc), 80);
          },
        });
      },
    });
  } else {
    // ── CURRENT: implosão suave original ──────────────────────────────────
    layers.forEach((lay) => {
      lay.style.transition = `opacity 0.18s ease, transform ${ISO_OUT}ms cubic-bezier(0.22,1.2,0.36,1)`;
      lay.style.opacity = "0.06";
      lay.style.transform = "translateZ(0px) rotateX(0deg) rotateZ(0deg)";
    });
    setTimeout(() => {
      layers.forEach((lay) => {
        lay.style.transition = "opacity 0.35s ease";
        lay.style.opacity = "1";
      });
      setTimeout(() => _winReveal(overlay, yc), 100);
    }, ISO_OUT + 60);
  }
}
