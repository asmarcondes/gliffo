// ── Easter egg audio & confetti helpers ──
// AudioContext singleton — evita latência de inicialização por chamada
let _ac = null;
function _getAC() {
  if (!_ac || _ac.state === "closed")
    _ac = new (window.AudioContext || window.webkitAudioContext)();
  if (_ac.state === "suspended") _ac.resume();
  return _ac;
}
// Pré-aquece o AudioContext na primeira interação do usuário
// (garante que o contexto está pronto antes do primeiro áudio)
document.body.addEventListener(
  "pointerdown",
  () => {
    if (!AUDIO_MUTED)
      try {
        _getAC();
      } catch (e) {
        if (window._dbg) console.warn("[glif] AudioContext warmup", e);
      }
  },
  { once: true, passive: true },
);

// Easter egg: Konami Code → efeito arco-íris + mensagem
(function () {
  const KONAMI = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let _kBuf = [];
  document.addEventListener("keydown", (e) => {
    _kBuf.push(e.key);
    if (_kBuf.length > KONAMI.length) _kBuf.shift();
    if (_kBuf.join(",") === KONAMI.join(",")) {
      _kBuf = [];
      // Aplicar efeito arco-íris no root por 2s
      const root = document.documentElement;
      root.style.transition = "filter 0.3s";
      root.style.filter = "hue-rotate(0deg)";
      let angle = 0;
      const step = () => {
        angle = (angle + 6) % 360;
        root.style.filter = `hue-rotate(${angle}deg)`;
      };
      const raf = setInterval(step, 16);
      setTimeout(() => {
        clearInterval(raf);
        root.style.filter = "";
        root.style.transition = "";
      }, 2000);
      setFb("🕹️ +30 vidas (mentira, mas valeu a tentativa)", "ok");
      setTimeout(() => setFb("", ""), 4000);
    }
  });
})();

function eePlayFanfare() {
  if (AUDIO_MUTED) return;
  try {
    const A = _getAC();
    // Reverb sintético: impulso de sala curta gerado por código
    const irLen = Math.floor(A.sampleRate * 0.55);
    const irBuf = A.createBuffer(1, irLen, A.sampleRate);
    const irData = irBuf.getChannelData(0);
    for (let j = 0; j < irLen; j++)
      irData[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / irLen, 2.8);
    const conv = A.createConvolver();
    conv.buffer = irBuf;
    const dry = A.createGain();
    dry.gain.value = 0.72;
    const wet = A.createGain();
    wet.gain.value = 0.32;
    dry.connect(A.destination);
    conv.connect(wet);
    wet.connect(A.destination);
    const notes = [261.6, 329.6, 392.0, 523.3]; // C E G C'
    notes.forEach((freq, noteIdx) => {
      setTimeout(() => {
        const o = A.createOscillator(),
          g = A.createGain();
        o.connect(g);
        g.connect(dry);
        g.connect(conv);
        o.type = "sine";
        o.frequency.value = freq;
        g.gain.setValueAtTime(0, A.currentTime);
        g.gain.linearRampToValueAtTime(0.22, A.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, A.currentTime + 0.38);
        o.start();
        o.stop(A.currentTime + 0.38);
      }, noteIdx * 80);
    });
  } catch (e2) {
    if (window._dbg) console.warn("[glif] ee fanfare", e2);
  }
}
function eePlayTrombone() {
  if (AUDIO_MUTED) return;
  try {
    const A = _getAC();
    const o = A.createOscillator(),
      g = A.createGain();
    o.connect(g);
    g.connect(A.destination);
    o.type = "sawtooth";
    o.frequency.setValueAtTime(380, A.currentTime);
    o.frequency.exponentialRampToValueAtTime(200, A.currentTime + 0.7);
    g.gain.setValueAtTime(0.18, A.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, A.currentTime + 0.7);
    o.start();
    o.stop(A.currentTime + 0.7);
  } catch (e2) {
    if (window._dbg) console.warn("[glif] ee trombone", e2);
  }
}
function eePlayFlipTick(result, at) {
  if (AUDIO_MUTED) return;
  try {
    const A = _getAC();
    // Usa tempo agendado pelo scheduler do Web Audio (sample-accurate)
    // Se 'at' já passou (lag extremo), toca imediatamente
    const t = Math.max(at, A.currentTime);
    const o = A.createOscillator(),
      g = A.createGain();
    o.connect(g);
    g.connect(A.destination);
    o.type = "sine";
    if (result === "correct") {
      // Bell curto — nota alta, prazeroso
      o.frequency.setValueAtTime(880, t);
      o.frequency.exponentialRampToValueAtTime(1320, t + 0.08);
      g.gain.setValueAtTime(0.13, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      o.start(t);
      o.stop(t + 0.2);
    } else {
      // Tick neutro — click seco
      o.frequency.setValueAtTime(600, t);
      o.frequency.exponentialRampToValueAtTime(320, t + 0.03);
      g.gain.setValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      o.start(t);
      o.stop(t + 0.05);
    }
  } catch (e2) {
    if (window._dbg) console.warn("[glif] ee flipTick", e2);
  }
}
// Fallback offline: confetti CSS puro (posição fixa, cobre a tela)
function _eeLocalConfetti() {
  const colors = ["#f5a623", "#9b8fe8", "#5bbfa0", "#e87a6b", "#60a5fa"];
  for (let i = 0; i < 80; i++) {
    const p = document.createElement("div");
    const size = 6 + Math.random() * 8;
    p.style.cssText =
      `position:fixed;width:${size}px;height:${size}px;` +
      `background:${colors[i % colors.length]};` +
      `border-radius:${Math.random() > 0.5 ? "50%" : "2px"};` +
      `left:${20 + Math.random() * 60}vw;top:${58 + Math.random() * 12}vh;` +
      `pointer-events:none;z-index:9999;` +
      `animation:confPop ${0.8 + Math.random() * 0.6}s ease-out forwards;` +
      `--tx:${(Math.random() - 0.5) * 280}px;` +
      `--ty:${-80 - Math.random() * 200}px;` +
      `animation-delay:${Math.random() * 0.35}s;`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1600);
  }
}

// ── Easter eggs: palavras temáticas ──
// Easter egg: palíndromo — varredura bidirecional nos lboxes
function eePalindromeReveal() {
  if (!achIsPalindrome(WORD)) return;
  queueAch("ee_pal_reveal");
  const boxes = [...document.querySelectorAll("#lboxes .lbox")];
  if (!boxes.length) return;
  // Forward sweep (left→right)
  boxes.forEach((b, i) => {
    setTimeout(() => {
      b.style.transition = "transform 0.15s ease-out, box-shadow 0.15s";
      b.style.transform = "scale(1.22)";
      b.style.boxShadow = "0 0 10px var(--amber-400)";
      setTimeout(() => {
        b.style.transform = "";
        b.style.boxShadow = "";
      }, 200);
    }, i * 90);
  });
  // Reverse sweep (right→left) after a pause
  const delay = boxes.length * 90 + 350;
  [...boxes].reverse().forEach((b, i) => {
    setTimeout(
      () => {
        b.style.transition = "transform 0.15s ease-out, box-shadow 0.15s";
        b.style.transform = "scale(1.22)";
        b.style.boxShadow = "0 0 10px #9b8fe8";
        setTimeout(() => {
          b.style.transform = "";
          b.style.boxShadow = "";
        }, 200);
      },
      delay + i * 90,
    );
  });
  setTimeout(
    () => setFb("↔️ Palíndromo!", "ok"),
    delay + boxes.length * 90 + 150,
  );
  setTimeout(() => setFb("", ""), delay + boxes.length * 90 + 3000);
}

function eeThematicWord() {
  if (["FESTA", "BAILE"].includes(WORD)) {
    setTimeout(eeCanvasConfetti, 200);
    setTimeout(eeCanvasConfetti, 550);
  } else if (["FOGO", "CHAMA"].includes(WORD)) {
    _eeFireParticles();
  } else if (WORD === "GATO") {
    _eeCornerEmoji("🐱");
  } else if (["BRUXO", "MAGIA"].includes(WORD)) {
    _eeGlyphPulse("#a855f7");
  } else if (
    [
      "RADIO",
      "R\u00c1DIO",
      "RITMO",
      "NOTAS",
      "DRONE",
      "MUSICA",
      "M\u00daSICA",
      "FAIXA",
    ].includes(WORD)
  ) {
    queueAch("ee_radio_word");
    // Easter egg rádio: abre player tocando + toast
    setTimeout(() => {
      if (typeof mfpShow === "function") {
        window._mfpEEChannel && window._mfpEEChannel(undefined, true);
        mfpShow();
        showEEToast("🎶 Esse glifo pede uma trilha sonora!");
      }
    }, 700);
  } else if (["NAVE", "MARTE", "ASTRO", "OVNI", "LASER"].includes(WORD)) {
    // Easter egg espacial: removido do eeThematicWord — gatilho está no decode()
  }
}
function _eeFireParticles() {
  const colors = ["#ff4500", "#ff8c00", "#ffa500", "#ff6347"];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement("div");
    const size = 7 + Math.random() * 12;
    p.style.cssText =
      `position:fixed;width:${size}px;height:${size}px;` +
      `background:${colors[Math.floor(Math.random() * colors.length)]};` +
      `border-radius:50% 50% 50% 0;` +
      `left:${20 + Math.random() * 60}vw;bottom:${3 + Math.random() * 10}vh;` +
      `pointer-events:none;z-index:9999;` +
      `animation:confPop ${0.9 + Math.random() * 0.7}s ease-out forwards;` +
      `--tx:${(Math.random() - 0.5) * 120}px;` +
      `--ty:${-120 - Math.random() * 200}px;` +
      `animation-delay:${Math.random() * 0.5}s;`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1900);
  }
}
function _eeCornerEmoji(emoji) {
  const el = document.createElement("div");
  el.textContent = emoji;
  el.style.cssText =
    `position:fixed;bottom:24px;right:24px;font-size:3rem;` +
    `z-index:9999;pointer-events:none;` +
    `animation:eeCornerPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transition = "opacity 0.5s";
    setTimeout(() => el.remove(), 550);
  }, 2800);
}
function _eeGlyphPulse(color) {
  const layers = document.querySelectorAll("#glyph-stage .glayer");
  layers.forEach((l) => {
    l.style.transition = "filter 0.4s ease";
    l.style.filter = `drop-shadow(0 0 18px ${color}) hue-rotate(200deg)`;
    setTimeout(() => {
      l.style.filter = "";
      setTimeout(() => (l.style.transition = ""), 450);
    }, 1400);
  });
}

function eeCanvasConfetti() {
  const fire = () =>
    window.confetti({
      particleCount: 130,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#f5a623", "#9b8fe8", "#5bbfa0", "#e87a6b", "#60a5fa"],
    });
  if (window.confetti) {
    fire();
    return;
  }
  const sc = document.createElement("script");
  sc.src =
    "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";
  sc.onload = fire;
  sc.onerror = _eeLocalConfetti; // fallback offline
  document.head.appendChild(sc);
}

/* ════════════════════════════════════════════
         GLOBAL EASTER EGGS
         ════════════════════════════════════════════ */

// ── Toast helper ──
function showEEToast(msg, ms) {
  const t = document.getElementById("eetoast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._eet);
  t._eet = setTimeout(() => t.classList.remove("show"), ms || 5000);
}

// ── Snake minigame ──
function openSnakeGame() {
  const modal = document.getElementById("snake-modal");
  modal.classList.add("show");
  const canvas = document.getElementById("snake-canvas");
  const ctx2d = canvas.getContext("2d");
  const CELLS = 20,
    CS = 10;
  let snake, dir, food, score, loop;

  function placeFood() {
    do {
      food = {
        x: Math.floor(Math.random() * CELLS),
        y: Math.floor(Math.random() * CELLS),
      };
    } while (snake.some((s) => s.x === food.x && s.y === food.y));
  }
  function resetSnake() {
    snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    dir = { x: 1, y: 0 };
    score = 0;
    document.getElementById("snake-score").textContent = "🍎 0";
    placeFood();
  }
  function drawSnake() {
    const bg =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--surface")
        .trim() || "#fff";
    ctx2d.fillStyle = bg;
    ctx2d.fillRect(0, 0, 200, 200);
    ctx2d.fillStyle = "#f5a623";
    ctx2d.fillRect(food.x * CS, food.y * CS, CS - 1, CS - 1);
    snake.forEach((s, i) => {
      ctx2d.fillStyle = i === 0 ? "#5bbfa0" : "#9b8fe8";
      ctx2d.fillRect(s.x * CS, s.y * CS, CS - 1, CS - 1);
    });
  }
  function tick() {
    const h = {
      x: (snake[0].x + dir.x + CELLS) % CELLS,
      y: (snake[0].y + dir.y + CELLS) % CELLS,
    };
    if (snake.some((s) => s.x === h.x && s.y === h.y)) {
      clearInterval(loop);
      ctx2d.fillStyle = "rgba(0,0,0,0.55)";
      ctx2d.fillRect(0, 0, 200, 200);
      ctx2d.fillStyle = "#fff";
      ctx2d.textAlign = "center";
      ctx2d.font = "bold 13px monospace";
      ctx2d.fillText("Game Over 💀", 100, 90);
      ctx2d.font = "10px monospace";
      ctx2d.fillText("clique para jogar de novo", 100, 112);
      canvas.style.cursor = "pointer";
      canvas.onclick = () => {
        canvas.onclick = null;
        canvas.style.cursor = "default";
        startSnake();
      };
      return;
    }
    snake.unshift(h);
    if (h.x === food.x && h.y === food.y) {
      score++;
      document.getElementById("snake-score").textContent = "🍎 " + score;
      placeFood();
    } else {
      snake.pop();
    }
    drawSnake();
  }
  function startSnake() {
    clearInterval(loop);
    resetSnake();
    drawSnake();
    loop = setInterval(tick, 120);
  }

  const kh = (e) => {
    const map = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    };
    if (map[e.key]) {
      const nd = map[e.key];
      if (nd.x !== -dir.x || nd.y !== -dir.y) dir = nd;
      e.preventDefault();
    }
    if (e.key === "Escape") closeSnake();
  };
  function closeSnake() {
    clearInterval(loop);
    document.removeEventListener("keydown", kh);
    modal.classList.remove("show");
  }
  document.addEventListener("keydown", kh);
  document.getElementById("snake-close").onclick = closeSnake;
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeSnake();
  });
  startSnake();
}

// ── Space Invaders minigame ──
function openInvadersGame() {
  const modal = document.getElementById("invaders-modal");
  modal.classList.add("show");
  const canvas = document.getElementById("invaders-canvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;
  const COLS = 8,
    ROWS = 3;
  const AW = 22,
    AH = 16,
    GAP_X = 6,
    GAP_Y = 10;
  const PW = 28,
    PH = 10;
  const ALIEN_OFF_X = 16;

  let player, aliens, bullets, aBullets, score, lives;
  let alienDir, alienSpeed, aBulletTimer, shootCD, wave;
  let gameOver, keys;

  function placeAliens() {
    aliens = [];
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        aliens.push({
          x: ALIEN_OFF_X + c * (AW + GAP_X),
          y: 20 + r * (AH + GAP_Y),
          alive: true,
          type: r === 0 ? 2 : r === 1 ? 1 : 0,
        });
  }

  function reset() {
    player = { x: W / 2 - PW / 2, y: H - 18 };
    bullets = [];
    aBullets = [];
    score = 0;
    lives = 3;
    wave = 1;
    alienDir = 1;
    alienSpeed = 0.55;
    aBulletTimer = 40;
    shootCD = 0;
    gameOver = false;
    keys = {};
    placeAliens();
    updateHUD();
  }

  function updateHUD() {
    document.getElementById("invaders-score").innerHTML =
      "\ud83d\udc7e " + score + " &nbsp; \u2764\ufe0f " + lives;
  }

  function getCSS(v) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(v)
      .trim();
  }

  function drawAlien(a) {
    const clr = ["#9b8fe8", "#5bbfa0", "#f5a623"][a.type];
    const bg = getCSS("--surface") || "#1a1a2e";
    ctx.fillStyle = clr;
    ctx.fillRect(a.x + 3, a.y + 3, AW - 6, AH - 6);
    ctx.fillRect(a.x + 5, a.y, 3, 4);
    ctx.fillRect(a.x + AW - 8, a.y, 3, 4);
    ctx.fillRect(a.x, a.y + 5, 4, 4);
    ctx.fillRect(a.x + AW - 4, a.y + 5, 4, 4);
    ctx.fillStyle = bg;
    ctx.fillRect(a.x + 7, a.y + 5, 3, 3);
    ctx.fillRect(a.x + AW - 10, a.y + 5, 3, 3);
  }

  function drawPlayer() {
    ctx.fillStyle = "#5bbfa0";
    ctx.fillRect(player.x + 6, player.y + 4, PW - 12, PH - 4);
    ctx.fillRect(player.x + 11, player.y, PW - 22, 6);
    ctx.fillRect(player.x + PW / 2 - 1, player.y - 5, 3, 7);
  }

  function tick() {
    if (gameOver) return;

    if (keys["ArrowLeft"] || keys["a"]) player.x = Math.max(0, player.x - 3);
    if (keys["ArrowRight"] || keys["d"])
      player.x = Math.min(W - PW, player.x + 3);

    if ((keys[" "] || keys["ArrowUp"]) && shootCD <= 0 && bullets.length < 2) {
      bullets.push({ x: player.x + PW / 2 - 1, y: player.y - 5 });
      shootCD = 20;
    }
    if (shootCD > 0) shootCD--;

    bullets = bullets.filter((b) => {
      b.y -= 7;
      return b.y > -8;
    });

    const living = aliens.filter((a) => a.alive);
    if (!living.length) {
      wave++;
      alienSpeed = Math.min(2.2, 0.55 + wave * 0.28);
      placeAliens();
      updateHUD();
      return;
    }

    let hitEdge = false;
    living.forEach((a) => {
      a.x += alienDir * alienSpeed;
      if (a.x + AW >= W - 1 || a.x <= 1) hitEdge = true;
    });
    if (hitEdge) {
      alienDir *= -1;
      living.forEach((a) => (a.y += 12));
    }

    if (--aBulletTimer <= 0 && living.length) {
      const s = living[Math.floor(Math.random() * living.length)];
      aBullets.push({ x: s.x + AW / 2 - 1, y: s.y + AH });
      aBulletTimer = Math.max(18, 45 - wave * 4);
    }
    aBullets = aBullets.filter((b) => {
      b.y += 3;
      return b.y < H + 8;
    });

    // Player bullets hit aliens
    outer: for (let bi = bullets.length - 1; bi >= 0; bi--) {
      const b = bullets[bi];
      for (let ai = 0; ai < aliens.length; ai++) {
        const a = aliens[ai];
        if (!a.alive) continue;
        if (
          b.x < a.x + AW &&
          b.x + 3 > a.x &&
          b.y < a.y + AH &&
          b.y + 8 > a.y
        ) {
          a.alive = false;
          bullets.splice(bi, 1);
          score += (a.type + 1) * 10;
          updateHUD();
          continue outer;
        }
      }
    }

    // Alien bullets hit player
    for (let bi = aBullets.length - 1; bi >= 0; bi--) {
      const b = aBullets[bi];
      if (
        b.x < player.x + PW &&
        b.x + 3 > player.x &&
        b.y < player.y + PH &&
        b.y + 8 > player.y
      ) {
        aBullets.splice(bi, 1);
        if (--lives <= 0) {
          gameOver = true;
          draw();
          showGO();
          return;
        }
        updateHUD();
      }
    }

    // Aliens reach player line
    if (living.some((a) => a.y + AH >= player.y - 2)) {
      gameOver = true;
      draw();
      showGO();
      return;
    }

    draw();
  }

  function draw() {
    const bg = getCSS("--surface") || "#1a1a2e";
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    // Starfield
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let i = 0; i < 35; i++)
      ctx.fillRect((i * 83 + 11) % W, (i * 47 + 3) % H, 1, 1);
    aliens.forEach((a) => {
      if (a.alive) drawAlien(a);
    });
    drawPlayer();
    ctx.fillStyle = "#f5a623";
    bullets.forEach((b) => ctx.fillRect(b.x, b.y, 3, 8));
    ctx.fillStyle = "#e87a6b";
    aBullets.forEach((b) => ctx.fillRect(b.x, b.y, 3, 7));
  }

  function showGO() {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "bold 13px monospace";
    ctx.fillText("Game Over \ud83d\udc80", W / 2, H / 2 - 14);
    ctx.font = "10px monospace";
    ctx.fillText("Pontuação: " + score, W / 2, H / 2 + 4);
    ctx.fillText("clique para tentar de novo", W / 2, H / 2 + 22);
    canvas.style.cursor = "pointer";
    canvas.onclick = () => {
      canvas.onclick = null;
      canvas.style.cursor = "default";
      clearInterval(loop);
      reset();
      loop = setInterval(tick, 1000 / 50);
    };
  }

  let loop;
  function start() {
    clearInterval(loop);
    reset();
    loop = setInterval(tick, 1000 / 50);
  }

  const kd = (e) => {
    keys[e.key] = true;
    if ([" ", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key))
      e.preventDefault();
    if (e.key === "Escape") close();
  };
  const ku = (e) => {
    delete keys[e.key];
  };

  function close() {
    clearInterval(loop);
    document.removeEventListener("keydown", kd);
    document.removeEventListener("keyup", ku);
    modal.classList.remove("show");
  }

  document.addEventListener("keydown", kd);
  document.addEventListener("keyup", ku);
  document.getElementById("invaders-close").onclick = close;
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  start();
}

// ── Konami Code ──
(function () {
  const SEQ = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let p = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key === SEQ[p]) {
      p++;
      if (p === SEQ.length) {
        p = 0;
        queueAch("ee_konami");
        showEEToast(
          "Você realmente tentou código de trapaça num jogo de palavras... 🤦 Respeito.",
        );
        document.body.classList.add("ee-konami");
        setTimeout(() => document.body.classList.remove("ee-konami"), 3000);
      }
    } else {
      p = e.key === SEQ[0] ? 1 : 0;
    }
  });
})();

// ── DevTools easter egg (console.log estilizado) ──
(function () {
  setTimeout(() => {
    console.log(
      "%cOi? Tô vendo você aqui no console... pensou que eu não ia notar? 🕵️",
      "color: #f5a623; font-size: 14px; font-weight: bold; background: #1a1a1a; padding: 8px 16px; border-radius: 6px; border: 1px solid #f5a623; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);"
    );
  }, 1000);
})();

// ── Idle tab title rotator ──
(function () {
  const ORIG = document.title;
  const msgs = [
    "...você ainda tá aí? 👀",
    "Eu fico esperando, pode deixar...",
    "Ok. Tudo bem. Sem problema.",
    "🦗 *som de grilo*",
    "Ainda aqui. 😐",
    "...vai jogar ou vai ficar aí?",
  ];
  let idleT = null,
    rotT = null,
    mi = 0;
  function startRot() {
    mi = 0;
    rotT = setInterval(() => {
      document.title = msgs[mi++ % msgs.length];
    }, 4000);
  }
  function reset() {
    clearTimeout(idleT);
    clearInterval(rotT);
    document.title = ORIG;
    idleT = setTimeout(startRot, 30000);
  }
  ["mousemove", "keydown", "click", "touchstart"].forEach((ev) =>
    document.addEventListener(ev, reset, { passive: true }),
  );
  reset();
})();

// ── Logo "." → 3 cliques = Snake ──
(function () {
  const dot = document.querySelector(".logo-dot");
  if (!dot) return;
  dot.title = "";
  let n = 0,
    t = null;
  dot.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    n++;
    clearTimeout(t);
    if (n >= 3) {
      n = 0;
      queueAch("ee_snake");
      openSnakeGame();
    } else
      t = setTimeout(() => {
        n = 0;
      }, 1500);
  });
})();

// ── Logo "foo" → 5 cliques = wobble + toast ──
(function () {
  const foo = document.querySelector(".logo-foo");
  if (!foo) return;
  let n = 0,
    t = null;
  foo.addEventListener("click", (e) => {
    e.preventDefault();
    n++;
    clearTimeout(t);
    if (n >= 5) {
      n = 0;
      queueAch("ee_foo");
      foo.classList.remove("ee-logo-run");
      void foo.offsetWidth;
      foo.classList.add("ee-logo-run");
      showEEToast("Oi! Para de clicar no foo! 😤");
      foo.addEventListener(
        "animationend",
        () => foo.classList.remove("ee-logo-run"),
        { once: true },
      );
    } else {
      t = setTimeout(() => {
        n = 0;
      }, 1500);
    }
  });
})();

