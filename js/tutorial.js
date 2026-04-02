// ═══════════════════════════════════════════════
// TUTORIAL v3 — 7 steps, show > tell
// Word: BOLA
// ═══════════════════════════════════════════════
const TW = "BOLA";
const TWL = ["B", "O", "L", "A"];
const TC = ["#f5a623", "#9b8fe8", "#5bbfa0", "#e87a6b"];
const tcOf = {};
TWL.forEach((l, i) => {
  tcOf[l] = TC[i];
});

// Demo word ARCO para o tutorial
const TDL = ["A", "R", "C", "O"];
const tdOf = { A: TC[0], R: TC[1], C: TC[2], O: TC[3] };

// Variáveis do desafio interativo (mudam em case 3 para AMOR)
let iWord = "BOLA";
let iLetters = TWL;
let iColorOf = tcOf;

let tutStep = 0;
let tutTimers = [];
let currentActionToken = null;
let _chatLastAt = 0; // timestamp when last chatMsg bubble was shown
let _chatLastReadMs = 0; // estimated read time for that message
let _byeToken = null;
let onTutSolved = null;
let onTutGiveUp = null;

function tClear() {
  tutTimers.forEach(clearTimeout);
  tutTimers = [];
  tStopProgress();
  _chatLastAt = 0;
  _chatLastReadMs = 0;
}
function tStartProgress(durationMs) {
  const btn = document.getElementById("tut-next-btn");
  if (!btn) return;
  btn.style.setProperty("--fill-dur", durationMs + "ms");
  btn.classList.remove("auto-filling");
  void btn.offsetWidth;
  btn.classList.add("auto-filling");
}
function tStopProgress() {
  const btn = document.getElementById("tut-next-btn");
  if (!btn) return;
  btn.classList.remove("auto-filling");
}
function tDelay(fn, ms) {
  const t = setTimeout(fn, ms);
  tutTimers.push(t);
  return t;
}

function newToken() {
  if (currentActionToken) currentActionToken.cancelled = true;
  currentActionToken = { cancelled: false };
  return currentActionToken;
}
function tSleep(ms, token) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      if (token && token.cancelled) reject("cancelled");
      else resolve();
    }, ms);
    tutTimers.push(t);
  });
}
function tStroke() {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--glyph")
      .trim() || "#f0ebe4"
  );
}

function tStack(id, letters, colorFn, fadeIn) {
  tStackEl(document.getElementById(id), letters, colorFn, fadeIn);
}

function tStackEl(el, letters, colorFn, fadeIn) {
  if (!el) return;
  el.innerHTML = "";
  for (let i = letters.length - 1; i >= 0; i--) {
    const l = letters[i];
    if (!l) continue;
    const col = colorFn ? colorFn(l, i) : tStroke();
    const st = fadeIn
      ? "position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transition:opacity 0.5s;"
      : "position:absolute;top:0;left:0;width:100%;height:100%;";
    const svg = makeSVG(l, col, st);
    if (svg) {
      el.appendChild(svg);
      if (fadeIn) requestAnimationFrame(() => (svg.style.opacity = "1"));
    }
  }
}

function tSlots(id, letters, decoded) {
  const c = document.getElementById(id);
  if (!c) return;
  c.innerHTML = "";
  const s = tStroke();
  letters.forEach((l, i) => {
    const el = document.createElement("div");
    el.className = "tut-slot";
    if (decoded && decoded.has(i)) {
      el.classList.add("correct");
      el.style.background = tcOf[l] || TC[i % 4];
      const svg = makeSVG(l, "#fff");
      if (svg) {
        svg.style.cssText = "width:65%;aspect-ratio:1;";
        el.appendChild(svg);
      }
    } else {
      const svg = makeSVG(l, s);
      if (svg) {
        svg.style.cssText = "width:65%;aspect-ratio:1;";
        el.appendChild(svg);
      }
    }
    c.appendChild(el);
  });
}

// ── CONFETTI ──
function tutConfetti(el) {
  const colors = ["#f5a623", "#9b8fe8", "#5bbfa0", "#e87a6b", "#60a5fa"];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    const size = 5 + Math.random() * 7;
    p.style.cssText = `position:absolute;width:${size}px;height:${size}px;
      background:${colors[i % colors.length]};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      top:50%;left:50%;pointer-events:none;z-index:999;
      animation:confPop 0.8s ease-out forwards;
      --tx:${(Math.random() - 0.5) * 120}px;--ty:${-40 - Math.random() * 80}px;
      animation-delay:${Math.random() * 0.2}s;`;
    el.style.position = "relative";
    el.appendChild(p);
    setTimeout(() => p.remove(), 1100);
  }
}

// ── ISO: letra por letra ──
let isoLoop = null;
function stopIso() {
  if (isoLoop) {
    clearTimeout(isoLoop);
    isoLoop = null;
  }
}

function runIso(onDone, token) {
  stopIso();
  const stack = document.getElementById("iso-stack");
  if (!stack) return;
  const lbl = document.getElementById("iso-lbl");
  const zVals = [60, 20, -20, -60]; // B O L A top→bottom
  const buildOrder = [3, 2, 1, 0]; // A L O B (bottom to top)
  const layerLabels = [
    "A — base do glifo",
    "L — terceira camada",
    "O — segunda camada",
    "B — topo do glifo",
  ];

  stack.innerHTML = "";
  stack.style.transformStyle = "preserve-3d";
  // Começa collapsed (flat) para cada layer entrar já na posição exploded
  stack.classList.remove("exploded", "collapsed");

  let idx = 0;
  function addLayer() {
    if (token && token.cancelled) return;
    const bi = buildOrder[idx],
      l = TWL[bi];
    const layer = document.createElement("div");
    layer.className = "iso-layer";
    layer.style.transformStyle = "preserve-3d";
    layer.style.setProperty("--iso-z", zVals[bi] + "px");
    layer.style.zIndex = TWL.length - bi;
    layer.style.opacity = "0";
    // Inicia sem a classe exploded → translateZ(0), então aplicamos exploded
    // e forçamos dois frames para garantir transição suave
    layer.style.transform = "translateZ(0px) rotateX(0deg) rotateZ(0deg)";
    layer.style.transition = "none";
    const svg = makeSVG(l, tcOf[l]);
    if (svg) {
      svg.style.cssText = "width:90%;height:90%;";
      layer.appendChild(svg);
    }
    stack.appendChild(layer);
    if (lbl) lbl.textContent = layerLabels[idx];

    // Double-rAF: primeiro frame registra posição inicial, segundo anima
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (token && token.cancelled) return;
        layer.style.transition = "";
        layer.style.transform = `translateZ(${zVals[bi]}px) rotateX(45deg) rotateZ(-30deg)`;
        layer.style.opacity = "1";
      }),
    );

    idx++;
    if (idx < buildOrder.length) {
      isoLoop = setTimeout(addLayer, 780);
    } else {
      // Todas as layers visíveis — pausa e colapsa
      if (lbl) lbl.textContent = "Juntas formam o glifo!";
      isoLoop = setTimeout(() => {
        if (token && token.cancelled) return;
        const layers = [...stack.querySelectorAll(".iso-layer")];
        // Colapso animado: opacidade cai para ~0.08 enquanto o transform anima
        // (layers se cruzam em 3D mas ficam quase invisíveis — artefato imperceptível)
        layers.forEach((lay) => {
          lay.style.transition =
            "opacity 0.2s ease, transform 0.65s cubic-bezier(0.22,1.2,0.36,1)";
          lay.style.opacity = "0.08";
          lay.style.transform = "translateZ(0px) rotateX(0deg) rotateZ(0deg)";
        });
        // Após o transform terminar, restaura opacidade já em flat
        isoLoop = setTimeout(() => {
          if (token && token.cancelled) return;
          if (lbl) lbl.textContent = "B·O·L·A";
          layers.forEach((lay) => {
            lay.style.transition = "opacity 0.4s ease";
            lay.style.opacity = "1";
          });
          // Pausa mostrando o glifo flat, depois recomeça
          isoLoop = setTimeout(() => {
            if (token && token.cancelled) return;
            if (onDone) {
              onDone();
              return;
            }
            layers.forEach((lay) => {
              lay.style.transition = "opacity 0.3s ease";
              lay.style.opacity = "0";
            });
            isoLoop = setTimeout(() => {
              if (token && token.cancelled) return;
              runIso(null, token);
            }, 350);
          }, 2000);
        }, 700);
      }, 1000);
    }
  }
  addLayer();
}

// ── TYPING ──
let typingTimer = null;
function stopTyping() {
  if (typingTimer) {
    clearTimeout(typingTimer);
    typingTimer = null;
  }
}
function startTyping(word, slotsId, yoursId, interval, onDone, token) {
  stopTyping();
  const typed = [];
  tSlots(slotsId, new Array(TWL.length).fill(""), null);
  if (yoursId) tStack(yoursId, [], null);
  let i = 0;
  function next() {
    if (token && token.cancelled) return;
    if (i < word.length) {
      typed.push(word[i++]);
      // render slots with typed so far, rest empty
      const disp = [...typed, ...new Array(TWL.length - typed.length).fill("")];
      tSlots(slotsId, disp, null);
      if (yoursId) tStack(yoursId, typed, () => tStroke());
      typingTimer = setTimeout(next, interval);
    } else if (onDone) {
      typingTimer = setTimeout(onDone, 600);
    }
  }
  typingTimer = setTimeout(next, 500);
}

// ── PULSE color on glyph ──
function pulseColor(stackId, letter, onDone) {
  tStack(stackId, TWL, () => tStroke());
  const pulses = [
    [300, tcOf[letter]],
    [700, tStroke()],
    [1050, tcOf[letter]],
  ];
  pulses.forEach(([delay, col]) => {
    tDelay(() => {
      const c = document.getElementById(stackId);
      if (!c) return;
      c.querySelectorAll("svg").forEach((svg, svgIdx) => {
        // svgIdx in DOM: last letter = index 0 (A=first in DOM since rendered bottom-up reversed)
        // TWL reversed for DOM: A=0,L=1,O=2,B=3
        const domLetter = TWL[TWL.length - 1 - svgIdx];
        if (domLetter === letter) {
          svg
            .querySelectorAll("path")
            .forEach((p) => p.setAttribute("stroke", col));
          svg.style.filter =
            col !== tStroke() ? `drop-shadow(0 0 5px ${col})` : "";
        }
      });
    }, delay);
  });
  if (onDone) tDelay(onDone, 1600);
}

// ── DISAPPEAR animation ──
function animDisappear(stackId, letter, onDone) {
  tStack(stackId, TWL, () => tStroke());
  tDelay(() => {
    const c = document.getElementById(stackId);
    if (!c) return;
    c.querySelectorAll("svg").forEach((svg, svgIdx) => {
      const domLetter = TWL[TWL.length - 1 - svgIdx];
      if (domLetter === letter) {
        svg.style.transition = "opacity 0.6s, transform 0.6s";
        svg.style.opacity = "0";
        svg.style.transform = "scale(1.2)";
        tDelay(() => {
          svg.remove();
          if (onDone) onDone();
        }, 650);
      }
    });
  }, 500);
}

// ── INTERACT (step 5) — cursor não-linear ──
let iTyped = ["", "", "", ""],
  iCursor = 0,
  iConfirmed = new Set(), // índices de slots pré-confirmados (não editáveis)
  iWrongCount = 0, // easter egg: contador de letras erradas
  tutKeyHandler = null;
let tutInteractReady = false; // set by case 2 for path C (DEDO first)

function removeTutKeyHandler() {
  if (tutKeyHandler) {
    document.removeEventListener("keydown", tutKeyHandler);
    tutKeyHandler = null;
  }
}
function installTutKeyHandler() {
  removeTutKeyHandler();
  tutKeyHandler = (e) => {
    if (iTyped.join("") === iWord) return;
    const k = e.key.toUpperCase();
    if (k === "BACKSPACE") {
      e.preventDefault();
      if (!iConfirmed.has(iCursor) && iTyped[iCursor]) {
        iTyped[iCursor] = "";
      } else if (iCursor > 0) {
        let prev = iCursor - 1;
        while (prev > 0 && iConfirmed.has(prev)) prev--;
        if (!iConfirmed.has(prev)) {
          iCursor = prev;
          iTyped[iCursor] = "";
        }
      }
      buildInteract();
    } else if (k === "ARROWLEFT") {
      let prev = iCursor - 1;
      while (prev >= 0 && iConfirmed.has(prev)) prev--;
      if (prev >= 0) {
        iCursor = prev;
        buildInteract();
      }
    } else if (k === "ARROWRIGHT") {
      let next = iCursor + 1;
      while (next <= 3 && iConfirmed.has(next)) next++;
      if (next <= 3) {
        iCursor = next;
        buildInteract();
      }
    } else if (/^[A-Z]$/.test(k)) {
      if (iConfirmed.has(iCursor)) return; // protege slot confirmado
      // Easter egg: conta letras erradas
      const expected = iLetters.map((l, i) => (iConfirmed.has(i) ? null : l));
      if (expected[iCursor] && k !== expected[iCursor]) iWrongCount++;
      iTyped[iCursor] = k;
      // Avança para o próximo slot vazio, ou o seguinte
      let next = -1;
      for (let i = iCursor + 1; i < 4; i++) {
        if (!iTyped[i]) {
          next = i;
          break;
        }
      }
      if (next === -1)
        for (let i = 0; i < 4; i++) {
          if (!iTyped[i]) {
            next = i;
            break;
          }
        }
      if (next !== -1) iCursor = next;
      buildInteract();
    }
  };
  document.addEventListener("keydown", tutKeyHandler);
}

function buildInteract() {
  const c = document.getElementById("ts5-interact");
  if (!c) return;
  c.innerHTML = "";
  const s = tStroke();
  iTyped.forEach((l, i) => {
    const el = document.createElement("div");
    el.className = "tut-slot";
    const confirmed = iConfirmed.has(i);
    el.style.cursor = confirmed ? "default" : l ? "pointer" : "text";
    el.style.transition = "box-shadow 0.12s";
    if (confirmed) {
      // Slot pré-confirmado: fundo verde, sem cursor de edição
      el.style.background = iColorOf[l];
      el.style.borderColor = "transparent";
      const svg = makeSVG(l, "#fff");
      if (svg) {
        svg.style.cssText = "width:65%;aspect-ratio:1;";
        el.appendChild(svg);
      }
    } else {
      if (i === iCursor) {
        el.style.boxShadow = "0 0 0 2px var(--amber-400)";
        el.style.background = "rgba(245,166,35,0.08)";
      }
      if (l) {
        const svg = makeSVG(l, s);
        if (svg) {
          svg.style.cssText = "width:65%;aspect-ratio:1;";
          el.appendChild(svg);
        }
      }
    }
    el.onclick = () => {
      if (!confirmed) {
        iCursor = i;
        buildInteract();
      }
    };
    c.appendChild(el);
  });
  tStack(
    "ts5-yours",
    iTyped.filter((l, i) => l && !iConfirmed.has(i)),
    () => tStroke(),
  );

  const hint = document.getElementById("ts5-hint");
  const btn = document.getElementById("tut-next-btn");
  const solved = iTyped.join("") === iWord;
  if (solved) {
    if (hint) {
      hint.innerHTML = "";
    }
    const slots = c.querySelectorAll(".tut-slot");
    iLetters.forEach((l, i) => {
      slots[i].style.background = iColorOf[l];
      slots[i].style.borderColor = "transparent";
      slots[i].style.boxShadow = "";
      const sv = slots[i].querySelector("svg");
      if (sv)
        sv.querySelectorAll("path").forEach((p) =>
          p.setAttribute("stroke", "#fff"),
        );
    });
    tStack("ts5-yours", iLetters, (l) => iColorOf[l], true);
    tutConfetti(c);
    const title6 = document.getElementById("ts6-title");
    if (title6) {
      title6.style.cssText =
        "transition:opacity 0.3s;opacity:0;text-align:center;font-size:0.9rem;font-weight:700;color:var(--text);";
      title6.style.display = "";
      setTimeout(() => {
        title6.innerHTML = `🎉 <strong style="color:var(--amber-400)">${iWord}!</strong> Agora você sabe jogar!`;
        title6.style.opacity = "1";
      }, 350);
    }
    removeTutKeyHandler();
    const scards = document.getElementById("ts5-scards");
    if (scards) {
      scards.style.pointerEvents = "auto";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => (scards.style.opacity = "1")),
      );
    }
    if (typeof onTutSolved === "function") {
      const cb = onTutSolved;
      onTutSolved = null;
      cb();
    }
  } else {
    const filled = iTyped.filter(Boolean).length;
    if (hint) {
      if (iWrongCount >= 2) {
        hint.innerHTML =
          "😂 se você não acerta nem esses, não perde seu tempo jogando não...";
      } else {
        hint.textContent =
          filled === 0
            ? "ontouchstart" in window
              ? "Toque num slot e comece a digitar"
              : "Clique num slot e comece a digitar"
            : `${filled}/4 letras — forme ${iWord}`;
      }
      hint.style.color = "var(--text3)";
    }
    if (iWrongCount >= 2) {
      if (typeof onTutGiveUp === "function") {
        const cb = onTutGiveUp;
        onTutGiveUp = null;
        cb();
      }
    }
  }
}

// ── STEP 3 helper: insere item no TOPO do container com animação max-height ──
function ts3Prepend(container, dotStyle, innerHtml) {
  const item = document.createElement("div");
  item.className = "tut-result-item";
  item.style.cssText =
    "max-height:0;overflow:hidden;opacity:0;transition:max-height 0.45s ease,opacity 0.45s ease;";
  item.innerHTML = `<div class="tut-result-dot" style="${dotStyle}"></div><div>${innerHtml}</div>`;
  container.insertBefore(item, container.firstChild);
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      item.style.maxHeight = "120px";
      item.style.opacity = "1";
    }),
  );
  return item;
}

// ── STEP RENDERER ──
// ── Chat helpers (outer scope so sadGoodbye can also use them) ──
function scrollFeed() {
  const feed = document.getElementById("tut-chat-feed");
  requestAnimationFrame(() => {
    if (feed) feed.scrollTop = feed.scrollHeight;
  });
}
// Estimates how long a message takes to read (extra delay before next message).
// Returns 0–1000ms proportional to text length beyond a 30-char baseline.
function readDelay(html) {
  const len = html.replace(/<[^>]+>/g, "").length;
  return Math.max(0, Math.min(len * 20 - 600, 1000));
}

// Splits the text content of `el` into 2–4 visible chunks that reveal
// sequentially every 230ms, giving a "streaming" reading feel.
// Operates on innerHTML so inline HTML tags (strong, a, s…) are preserved.
function revealInChunks(el) {
  const text = el.textContent || "";
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 3) return; // short message — show immediately
  const n = Math.max(2, Math.min(4, Math.ceil(words.length / 6)));
  const breakAt = new Set();
  const wpc = Math.ceil(words.length / n);
  for (let i = wpc; i < words.length; i += wpc) {
    if (breakAt.size < n - 1) breakAt.add(i);
  }
  // Walk raw innerHTML char-by-char; insert span boundaries between words
  const raw = el.innerHTML;
  let result = '<span class="tut-chunk">';
  let inTag = false,
    inWord = false,
    wordIdx = 0;
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (c === "<") {
      inTag = true;
      result += c;
      continue;
    }
    if (c === ">") {
      inTag = false;
      result += c;
      continue;
    }
    if (inTag) {
      result += c;
      continue;
    }
    const isSpace = c === " " || c === "\n" || c === "\t";
    if (!isSpace && !inWord) {
      inWord = true;
      if (breakAt.has(wordIdx)) {
        result += '</span><span class="tut-chunk">';
      }
    } else if (isSpace && inWord) {
      inWord = false;
      wordIdx++;
    }
    result += c;
  }
  result += "</span>";
  el.innerHTML = result;
  el.querySelectorAll(".tut-chunk").forEach((s, i) => {
    const t = setTimeout(() => s.classList.add("show"), i * 230);
    tutTimers.push(t);
  });
}

// Shows typing indicator at `showDelay`, then atomically replaces it with a message bubble at `msgDelay`.
// Returns the indicator id so callers can optionally replace it manually (pass msgHtml=null to skip).
function chatTypingThenMsg(id, showDelay, msgHtml, msgDelay, token) {
  tDelay(() => {
    if (token && token.cancelled) return;
    const feed = document.getElementById("tut-chat-feed");
    if (!feed) return;
    // Reuse any existing typing indicator (e.g. decodingEl from glyph phase)
    const existing = feed.querySelector(".tut-typing:not([id])");
    if (existing) {
      existing.id = id;
      return; // already visible — just tag it and move on
    }
    const el = document.createElement("div");
    el.id = id;
    el.className = "tut-typing";
    el.innerHTML = "<span></span><span></span><span></span>";
    feed.appendChild(el);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.classList.add("show");
        scrollFeed();
        setTimeout(scrollFeed, 200);
      }),
    );
  }, showDelay);
  if (msgHtml != null) {
    tDelay(() => {
      if (token && token.cancelled) return;
      const feed = document.getElementById("tut-chat-feed");
      if (!feed) return;
      const indicator = document.getElementById(id);
      const div = document.createElement("div");
      div.className = "tut-bubble-left";
      div.innerHTML = msgHtml;
      if (indicator) {
        feed.replaceChild(div, indicator);
      } else {
        feed.appendChild(div);
      }
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          div.classList.add("show");
          scrollFeed();
          revealInChunks(div);
        }),
      );
    }, msgDelay);
  }
}
function chatMsg(html, delay) {
  const TYPING_LEAD = 600; // show indicator this many ms before message appears
  let typingEl = null;

  const appendTyping = (feed) => {
    if (typingEl) return;
    // Reuse any typing indicator already in the feed (e.g. decodingEl from glyph phase)
    const existing = feed.querySelector(".tut-typing");
    if (existing) {
      typingEl = existing;
      return;
    }
    typingEl = document.createElement("div");
    typingEl.className = "tut-typing";
    typingEl.innerHTML = "<span></span><span></span><span></span>";
    feed.appendChild(typingEl);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (typingEl) typingEl.classList.add("show");
        scrollFeed();
      }),
    );
  };

  // Pre-show typing indicator TYPING_LEAD ms before the message is due
  if (delay > TYPING_LEAD) {
    tDelay(() => {
      if (currentActionToken && currentActionToken.cancelled) return;
      const feed = document.getElementById("tut-chat-feed");
      if (feed) appendTyping(feed);
    }, delay - TYPING_LEAD);
  }

  tDelay(() => {
    if (currentActionToken && currentActionToken.cancelled) return;
    const feed = document.getElementById("tut-chat-feed");
    if (!feed) return;
    // Extra wait if previous message was long and the user may not have finished reading
    const extra = Math.max(0, _chatLastAt + _chatLastReadMs - Date.now());
    // If we're about to wait extra and have no indicator yet, show one now
    if (!typingEl && extra > 300) appendTyping(feed);
    const doShow = () => {
      _chatLastAt = Date.now();
      _chatLastReadMs = readDelay(html);
      const div = document.createElement("div");
      div.className = "tut-bubble-left";
      div.innerHTML = html;
      if (typingEl && typingEl.parentNode) {
        feed.replaceChild(div, typingEl);
        typingEl = null;
      } else {
        feed.appendChild(div);
      }
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          div.classList.add("show");
          scrollFeed();
          revealInChunks(div);
        }),
      );
    };
    if (extra > 50) {
      const t = setTimeout(doShow, extra);
      tutTimers.push(t);
    } else {
      doShow();
    }
  }, delay);
}
// Insere bolha do usuário de forma síncrona (não depende de token)
// e chama cb após 400ms — evita que tClear()/newToken() no onClick cancele a UI.
function chatUserNow(text, cb) {
  const feed = document.getElementById("tut-chat-feed");
  if (!feed) {
    if (cb) setTimeout(cb, 400);
    return;
  }
  const div = document.createElement("div");
  div.className = "tut-bubble-right";
  div.textContent = text;
  feed.appendChild(div);
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      div.classList.add("show");
      scrollFeed();
    }),
  );
  if (cb) {
    const t = setTimeout(cb, 400);
    tutTimers.push(t); // track so tClear() can cancel on close/reopen
  }
}

function chatUser(text, delay) {
  tDelay(() => {
    if (currentActionToken && currentActionToken.cancelled) return;
    const feed = document.getElementById("tut-chat-feed");
    if (!feed) return;
    const div = document.createElement("div");
    div.className = "tut-bubble-right";
    div.textContent = text;
    feed.appendChild(div);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        div.classList.add("show");
        scrollFeed();
      }),
    );
  }, delay);
}
function chatCard(buildFn, delay) {
  tDelay(() => {
    if (currentActionToken && currentActionToken.cancelled) return;
    const feed = document.getElementById("tut-chat-feed");
    if (!feed) return;
    const card = document.createElement("div");
    card.className = "tut-chat-card";
    buildFn(card);
    feed.appendChild(card);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        card.classList.add("show");
        scrollFeed();
      }),
    );
  }, delay);
}

// ── Tutorial State Machine ────────────────────────────────────────────
const TUT = {
  // Current state id. Set via TUT.setState() before calling chatChoices().
  // States: 'idle' | 's0_question' | 's0_yes_branch' | 's0_no_branch'
  //       | 'sad_walk' | 'comeback'
  //       | 'step_1' | 'step_2' | ... | 'step_6' | 'done'
  state: "idle",

  // Holds the active choices row + array so free-input can re-ask them.
  data: { currentChoices: null, currentRow: null },

  setState(id, extraData) {
    this.state = id;
    if (extraData) Object.assign(this.data, extraData);
  }
};
// ─────────────────────────────────────────────────────────────────────

function chatSetChoices(choices) {
  const feed = document.getElementById("tut-chat-feed");
  const choicesEl = document.getElementById("tut-chat-choices");
  if (!feed || !choicesEl) return;
  choicesEl.innerHTML = "";
  const row = document.createElement("div");
  row.className = "tut-choices";
  choices.forEach(({ label, secondary, onClick }) => {
    const b = document.createElement("button");
    b.className = "tut-choice-btn" + (secondary ? " secondary" : "");
    b.textContent = label;
    b.onclick = () => {
      row.querySelectorAll("button").forEach((x) => (x.disabled = true));
      row.remove();
      TUT.data.currentRow = null;
      chatUserNow(b.textContent, onClick);
    };
    row.appendChild(b);
  });
  feed.appendChild(row);

  function onChoicesReady() {
    // Store for re-ask on free-input
    TUT.data.currentChoices = choices;
    TUT.data.currentRow = row;
  }

  if (window.anime) {
    row.style.opacity = "1";
    row.style.transform = "none";
    const btns = row.querySelectorAll(".tut-choice-btn");
    btns.forEach((b) => {
      b.style.opacity = "0";
    });
    anime({
      targets: btns,
      opacity: [0, 1],
      translateY: [10, 0],
      delay: anime.stagger(80, { start: 50 }),
      duration: 360,
      easing: "easeOutBack",
      begin: () => scrollFeed(),
      complete: () => onChoicesReady(),
    });
  } else {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        row.classList.add("show");
        scrollFeed();
        onChoicesReady();
      }),
    );
  }
}
function chatChoices(choices, delay) {
  tDelay(() => {
    if (currentActionToken && currentActionToken.cancelled) return;
    chatSetChoices(choices);
  }, delay);
}

function renderStep(step, noClear) {
  tClear();
  stopTyping();
  removeTutKeyHandler();
  stopIso();
  const token = newToken();

  const feed = document.getElementById("tut-chat-feed");
  const choicesEl = document.getElementById("tut-chat-choices");
  if (!feed || !choicesEl) return;

  if (!noClear) {
    const old = document.getElementById("ts0-arrow-overlay");
    if (old) {
      if (old._cleanup) old._cleanup();
      old.remove();
    }
    feed.innerHTML = "";
  }
  choicesEl.innerHTML = "";

  function makeGlyphPanel(label) {
    const panel = document.createElement("div");
    panel.className = "tut-glyph-panel";
    const lbl = document.createElement("div");
    lbl.className = "tut-glyph-label";
    lbl.textContent = label;
    const stage = document.createElement("div");
    stage.className = "tut-gstage";
    const stack = document.createElement("div");
    stack.className = "tut-gstack";
    stage.appendChild(stack);
    panel.appendChild(lbl);
    panel.appendChild(stage);
    return { panel, stack };
  }
  function makeGlyphSingle(label, width) {
    const wrap = document.createElement("div");
    wrap.className = "tut-glyph-single";
    wrap.style.width = width || "200px";
    const lbl = document.createElement("div");
    lbl.className = "tut-glyph-label";
    lbl.textContent = label;
    const stage = document.createElement("div");
    stage.className = "tut-gstage";
    const stack = document.createElement("div");
    stack.className = "tut-gstack";
    stage.appendChild(stack);
    wrap.appendChild(lbl);
    wrap.appendChild(stage);
    return { wrap, stack };
  }
  function makeDemoRow(word, certas, encontradas) {
    const row = document.createElement("div");
    row.className = "hrow";
    const wc = document.createElement("div");
    wc.className = "hw";
    wc.textContent = word;
    const dc = document.createElement("div");
    dc.className = "dcell";
    certas.forEach((l) => {
      const d = document.createElement("div");
      d.className = "hdot";
      d.style.background = tdOf[l];
      dc.appendChild(d);
    });
    const fc = document.createElement("div");
    fc.className = "dcell";
    encontradas.forEach((l) => {
      const d = document.createElement("div");
      d.className = "hdot";
      d.style.background = tdOf[l];
      fc.appendChild(d);
    });
    row.appendChild(wc);
    row.appendChild(dc);
    row.appendChild(fc);
    return row;
  }

  // ── Helpers reutilizados nos desfechos ───────────────────────────
  function buildSummaryCards(card) {
    card.style.cssText += "background:transparent;border:none;padding:4px 0;";
    const scards = document.createElement("div");
    scards.className = "tut-summary-cards";
    scards.innerHTML =
      '<div class="tut-scard"><div class="tut-scard-icon">\uD83C\uDFAF</div><div class="tut-scard-text">4 TENTATIVAS por jogo</div></div>' +
      '<div class="tut-scard"><div class="tut-scard-icon">\uD83D\uDCC5</div><div class="tut-scard-text">1 PALAVRA POR DIA</div></div>' +
      '<div class="tut-scard"><div class="tut-scard-icon">\uD83D\uDD11</div><div class="tut-scard-text">1 CHAVE por tentativa para revelar uma letra</div></div>';
    card.appendChild(scards);
  }
  function chatFinale(afterWin, cardsDelay, btnDelay, verDeNovoMsgOverride) {
    chatCard(buildSummaryCards, cardsDelay);
    tDelay(() => {
      if (token.cancelled) return;
      const verDeNovoMsg =
        verDeNovoMsgOverride ||
        (afterWin
          ? "Você gabaritou e ainda quer ver de novo?! \uD83E\uDD26"
          : "Você não vai com a minha cara? \uD83D\uDE24");
      chatChoices(
        [
          {
            label: "Jogar agora! \uD83C\uDFAE",
            onClick: () => closeTutorial(),
          },
          {
            label: "Ver de novo \uD83D\uDD01",
            secondary: true,
            onClick: () => {
              tClear();
              chatMsg(verDeNovoMsg, 0);
              tDelay(() => {
                closeTutorial();
                setTimeout(() => openTutorial(), 400);
              }, 1800);
            },
          },
        ],
        0,
      );
    }, btnDelay);
  }

  switch (step) {
    case 0: {
      chatMsg(
        "Bem-vindo ao <strong style='color:var(--amber-400)'>Gliffo</strong>! \uD83D\uDC4B",
        200,
      );
      let boardCardEl = null;
      chatCard((card) => {
        boardCardEl = card;
        card.style.cssText +=
          "background:#121213;border-color:var(--border2);align-self:center;display:inline-flex;flex-direction:column;align-items:center;gap:3px;padding:8px 10px 10px;";
        const lbl = document.createElement("div");
        lbl.style.cssText =
          "font-size:0.58rem;font-weight:700;letter-spacing:0.14em;color:#818384;margin-bottom:4px;";
        lbl.textContent = "TERMO";
        card.appendChild(lbl);
        const termoData = [
          [
            ["P", "#3a3a3c"],
            ["I", "#3a3a3c"],
            ["N", "#3a3a3c"],
            ["G", "#b59f3b"],
            ["O", "#538d4e"],
          ],
          [
            ["T", "#b59f3b"],
            ["O", "#538d4e"],
            ["R", "#3a3a3c"],
            ["S", "#b59f3b"],
            ["O", "#538d4e"],
          ],
          [
            ["G", "#538d4e"],
            ["O", "#538d4e"],
            ["S", "#538d4e"],
            ["T", "#538d4e"],
            ["O", "#538d4e"],
          ],
        ];
        const allCells = [];
        termoData.forEach((row) => {
          const rowEl = document.createElement("div");
          rowEl.className = "tut-termo-row";
          row.forEach(([letter, bg]) => {
            const cell = document.createElement("div");
            cell.className = "tut-termo-cell";
            cell.style.cssText =
              "background:#3a3a3c;transform:scaleY(0);transition:transform 0.18s ease-in;";
            cell.dataset.bg = bg;
            cell.dataset.letter = letter;
            rowEl.appendChild(cell);
            allCells.push(cell);
          });
          card.appendChild(rowEl);
        });
        allCells.forEach((cell, idx) => {
          tDelay(
            () => {
              if (token.cancelled) return;
              cell.style.transition = "transform 0.16s ease-in";
              cell.style.transform = "scaleY(0)";
              setTimeout(() => {
                cell.style.background = cell.dataset.bg;
                cell.textContent = cell.dataset.letter;
                cell.style.transition = "transform 0.16s ease-out";
                cell.style.transform = "scaleY(1)";
              }, 160);
            },
            400 + Math.floor(idx / 5) * 700 + (idx % 5) * 60,
          );
        });
      }, 1200);
      chatMsg("J\u00E1 jogou o <strong>Termo</strong>?", 4100);
      tDelay(() => {
        if (token.cancelled || !boardCardEl) return;
        const bubbles = feed.querySelectorAll(".tut-bubble-left");
        const qBubble = bubbles[bubbles.length - 1];
        if (!qBubble) return;

        const ns = "http://www.w3.org/2000/svg";
        const svgEl = document.createElementNS(ns, "svg");
        svgEl.id = "ts0-arrow-overlay";
        svgEl.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:10;overflow:visible;";
        const mainPath = document.createElementNS(ns, "path");
        mainPath.setAttribute("fill", "none");
        mainPath.setAttribute("stroke", "#e879b9");
        mainPath.setAttribute("stroke-width", "2.5");
        mainPath.setAttribute("stroke-linecap", "round");
        const headPath = document.createElementNS(ns, "path");
        headPath.setAttribute("fill", "none");
        headPath.setAttribute("stroke", "#e879b9");
        headPath.setAttribute("stroke-width", "2.5");
        headPath.setAttribute("stroke-linecap", "round");
        svgEl.appendChild(mainPath);
        svgEl.appendChild(headPath);
        const overlayEl = document.querySelector(".tutorial-overlay");
        (overlayEl || document.body).appendChild(svgEl);

        const ah = 11;
        function updateArrowPaths() {
          const br = qBubble.getBoundingClientRect();
          const cr = boardCardEl.getBoundingClientRect();
          const fr = feed.getBoundingClientRect();
          // Esconde se o card saiu da área visível do feed
          if (cr.bottom < fr.top || cr.top > fr.bottom) {
            svgEl.style.opacity = "0";
            return 0;
          }
          svgEl.style.opacity = "1";
          const sx = br.right + 8;
          const sy = br.top + br.height * 0.45;
          const ex = cr.left + cr.width / 2;
          const ey = cr.bottom + 10;
          const cp1x = sx + 38,
            cp1y = sy;
          const cp2x = ex,
            cp2y = ey + 50;
          const tx = ex - cp2x,
            ty = ey - cp2y;
          const tang = Math.atan2(ty, tx);
          const a1 = tang + Math.PI + 0.4;
          const a2 = tang + Math.PI - 0.4;
          mainPath.setAttribute(
            "d",
            `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`,
          );
          headPath.setAttribute(
            "d",
            `M ${ex} ${ey} L ${ex + ah * Math.cos(a1)} ${ey + ah * Math.sin(a1)} M ${ex} ${ey} L ${ex + ah * Math.cos(a2)} ${ey + ah * Math.sin(a2)}`,
          );
          return Math.round(mainPath.getTotalLength());
        }

        // Initial draw with animation
        const pLen = updateArrowPaths();
        const hLen = Math.round(headPath.getTotalLength());
        mainPath.style.cssText = `stroke-dasharray:${pLen};stroke-dashoffset:${pLen};animation:ts0DrawPath 0.8s cubic-bezier(0.4,0,0.3,1) 0.05s forwards;`;
        headPath.style.cssText = `stroke-dasharray:${hLen};stroke-dashoffset:${hLen};animation:ts0DrawPath 0.25s ease-out 0.75s forwards;`;

        // After animation ends, track scroll to keep arrow aligned
        setTimeout(() => {
          mainPath.style.cssText = "";
          headPath.style.cssText = "";
          updateArrowPaths();
          feed.addEventListener("scroll", updateArrowPaths);
          svgEl._cleanup = () =>
            feed.removeEventListener("scroll", updateArrowPaths);
        }, 1100);
      }, 4250);
      TUT.setState("s0_question");
      chatChoices(
        [
          {
            label: "Sim, joguei bastante!",
            onClick: () => {
              chatMsg(
                "\u00D3timo! O Gliffo tem a mesma ideia \u2014 adivinhar a palavra do dia.",
                700,
              );
              chatMsg(
                "S\u00F3 que aqui a resposta j\u00E1 est\u00E1 na tela, codificada como um <strong>glifo</strong>. Um pouco mais <s>dif\u00EDcil</s> desafiador \uD83D\uDE08",
                1500,
              );
              chatMsg("Deixa eu te mostrar como funciona!", 2300);
              TUT.setState("s0_yes_branch");
              chatChoices(
                [
                  {
                    label: "Quero ver! \uD83C\uDFA8",
                    onClick: () => tutNext(),
                  },
                  {
                    label: "Parece complicado... vou sair!",
                    secondary: true,
                    onClick: () => sadGoodbye(),
                  },
                ],
                3100,
              );
            },
          },
          {
            label: "Nunca ouvi falar",
            secondary: true,
            onClick: () => {
              chatMsg(
                '<a href="https://term.ooo" target="_blank" rel="noopener">Termo</a> \u00E9 um jogo de adivinhar palavras \u2014 voc\u00EA v\u00EA s\u00F3 as cores das respostas para chegar na solu\u00E7\u00E3o.',
                700,
              );
              chatMsg(
                "Gliffo faz (quase) o mesmo. Aqui temos que decifrar os desenhos que as letras formam!",
                1500,
              );
              TUT.setState("s0_no_branch");
              chatChoices(
                [
                  {
                    label: "Quero tentar! \uD83C\uDFA8",
                    onClick: () => tutNext(),
                  },
                  {
                    label: "Parece complicado... vou sair!",
                    secondary: true,
                    onClick: () => sadGoodbye(),
                  },
                ],
                2600,
              );
            },
          },
        ],
        5500,
      );
      break;
    }

    case 1: {
      TUT.setState("step_1");
      chatMsg("Cada letra tem um glifo único. Veja a palavra BOLA!", 200);

      // perspWrap → wordRow (preserve-3d) → wrappers (preserve-3d, só SVG transparente)
      let perspWrap, wordRow, cardRef;
      const tileWrappers = []; // outer wrappers (rotateY counter)
      const tileData = []; // { wrapOuter, svgEl, letter } para colorir depois

      // Tile size: 96px capped so 4 tiles + 3 gaps fit across the panel width
      const _panelW = Math.min(480, window.innerWidth) - 64; // ~32px feed pad + 32px card pad
      const TILE_SZ = Math.floor(Math.min(96, (_panelW - 30) / 4)); // 30 = 3 * 10px gaps

      chatCard((card) => {
        cardRef = card;
        card.style.overflow = "visible";
        card.style.cssText +=
          "display:flex;flex-direction:column;gap:10px;align-items:center;justify-content:center;padding:22px 10px;";

        // Perspectiva 3D — será usado no flip
        perspWrap = document.createElement("div");
        perspWrap.style.cssText =
          "perspective:700px;perspective-origin:50% 50%;width:calc(100% + 20px);margin:0 -10px;display:flex;justify-content:center;overflow:visible;";

        wordRow = document.createElement("div");
        wordRow.style.cssText =
          "display:flex;justify-content:center;gap:10px;transform-style:preserve-3d;will-change:transform;";
        perspWrap.appendChild(wordRow);
        card.appendChild(perspWrap);
      }, 1200);

      // Tiles 3D — aparecem um a um com camadas de extrusão
      TWL.forEach((l, i) => {
        tDelay(
          () => {
            if (token.cancelled || !wordRow) return;

            // Wrapper transparente — só SVG, sem fundo nem extrusão
            const wrapOuter = document.createElement("div");
            wrapOuter.style.cssText = `width:${TILE_SZ}px;height:${TILE_SZ}px;display:flex;align-items:center;justify-content:center;transform-style:preserve-3d;`;

            const svg = makeSVG(l, tStroke());
            if (svg) {
              svg.style.cssText = `width:${TILE_SZ}px;height:${TILE_SZ}px;flex-shrink:0;`;
              wrapOuter.appendChild(svg);
            }
            const tl = null; // sem label

            tileWrappers.push(wrapOuter);
            tileData.push({
              wrapOuter,
              svgEl: svg,
              label: tl,
              letter: l,
            });
            wordRow.appendChild(wrapOuter);
            // Entrada fluída: surge de cima com pop de escala
            anime.set(wrapOuter, {
              opacity: 0,
              translateY: -14,
              scale: 0.65,
            });
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                anime({
                  targets: wrapOuter,
                  opacity: 1,
                  translateY: 0,
                  scale: 1,
                  duration: 480,
                  easing: "easeOutBack",
                });
              }),
            );
            scrollFeed();
          },
          1400 + i * 320,
        );
      });

      const allIn1 = 1400 + TWL.length * 320;
      chatMsg("Para entender melhor... Vamos juntar as letras!", allIn1 + 400);

      tDelay(() => {
        if (token.cancelled) return;
        chatChoices([
          {
            label: "Juntar as letras \uD83E\uDDE9",
            onClick: () => {
              if (!wordRow || !window.anime) {
                // Fallback sem anime — pula animação e segue
                scrollFeed();
                newToken();
                chatChoices(
                  [
                    {
                      label: "Entendi! \u2192",
                      onClick: () => tutNext(),
                    },
                  ],
                  600,
                );
                return;
              }

              // ── FASE 0: colorir as letras uma a uma (scale pop)
              const N = tileWrappers.length;
              const wordRowOrigStyle =
                "display:flex;justify-content:center;gap:10px;transform-style:preserve-3d;will-change:transform;";
              const perspWrapOrigStyle =
                "perspective:700px;perspective-origin:50% 50%;width:calc(100% + 20px);margin:0 -10px;display:flex;justify-content:center;overflow:visible;";
              let activeSplitRow = null;
              let phaseRan = false;
              let replayCount = 0;

              const runPhases = () => {
                const doRun = () => {
                  if (perspWrap.parentNode !== cardRef) {
                    cardRef.insertBefore(perspWrap, cardRef.firstChild);
                  }
                  wordRow.style.cssText = wordRowOrigStyle;
                  perspWrap.style.cssText = perspWrapOrigStyle;
                  tileWrappers.forEach((w) => {
                    w.style.position = "";
                    w.style.top = "";
                    w.style.left = "";
                    w.style.width = TILE_SZ + "px";
                    w.style.height = TILE_SZ + "px";
                    w.style.transform = "";
                    w.style.opacity = phaseRan ? "0" : "1";
                  });
                  anime.set(tileWrappers, { translateX: 0, rotateY: 0 });
                  anime.set([wordRow], { rotateY: 0 });

                  const rowCenterX = wordRow.offsetWidth / 2;
                  const targetTX = tileWrappers.map(
                    (el) => rowCenterX - (el.offsetLeft + el.offsetWidth / 2),
                  );
                  tileWrappers.forEach((w, idx) => {
                    w.style.zIndex = String(tileWrappers.length - idx);
                  });
                  if (phaseRan) {
                    anime({
                      targets: tileWrappers,
                      opacity: 1,
                      duration: 400,
                      delay: anime.stagger(60),
                      easing: "easeOutQuad",
                      complete: () =>
                        setTimeout(() => runAnimation(targetTX), 600),
                    });
                  } else {
                    runAnimation(targetTX);
                  }
                };

                // Reset: fade out o splitRow atual antes de reconstruir
                if (activeSplitRow && activeSplitRow.parentNode) {
                  anime({
                    targets: activeSplitRow,
                    opacity: 0,
                    duration: 350,
                    easing: "easeInQuad",
                    complete: () => {
                      if (activeSplitRow && activeSplitRow.parentNode)
                        activeSplitRow.parentNode.removeChild(activeSplitRow);
                      activeSplitRow = null;
                      doRun();
                    },
                  });
                } else {
                  doRun();
                }
              };

              const runAnimation = (targetTX) => {
                // ── FASE 1: afasta as letras
                anime({
                  targets: tileWrappers,
                  translateX: (el, i) => (i - (N - 1) / 2) * 52,
                  duration: 700,
                  easing: "easeOutCubic",
                  complete: () => {
                    // ── FASE 2: billboard
                    anime({
                      targets: wordRow,
                      rotateY: 90,
                      duration: 2200,
                      easing: "easeInOutQuad",
                    });
                    anime({
                      targets: tileWrappers,
                      rotateY: -90,
                      duration: 2200,
                      easing: "easeInOutQuad",
                      complete: () => {
                        // ── FASE 3a: convergem
                        anime({
                          targets: tileWrappers,
                          translateX: (el, i) => targetTX[i],
                          duration: 900,
                          easing: "easeInOutQuad",
                          complete: () => {
                            // ── FASE 3b: desfaz rotação
                            anime({
                              targets: wordRow,
                              rotateY: 0,
                              duration: 900,
                              easing: "easeInOutSine",
                            });
                            anime({
                              targets: tileWrappers,
                              rotateY: 0,
                              duration: 900,
                              easing: "easeInOutSine",
                              complete: () => {
                                scrollFeed();

                                // ── SPLIT
                                setTimeout(() => {
                                  if (!cardRef) return;
                                  wordRow.style.cssText = `position:relative;width:${TILE_SZ}px;height:${TILE_SZ}px;transform-style:preserve-3d;`;
                                  tileWrappers.forEach((w) => {
                                    w.style.position = "absolute";
                                    w.style.top = "0";
                                    w.style.left = "0";
                                    w.style.width = TILE_SZ + "px";
                                    w.style.height = TILE_SZ + "px";
                                    w.style.transform = "none";
                                  });
                                  perspWrap.style.cssText =
                                    "perspective:700px;perspective-origin:50% 50%;flex-shrink:0;";

                                  const splitRow =
                                    document.createElement("div");
                                  activeSplitRow = splitRow;
                                  splitRow.style.cssText = `position:relative;display:flex;justify-content:center;align-items:center;width:100%;height:${TILE_SZ}px;`;

                                  const leftCol = document.createElement("div");
                                  leftCol.style.cssText =
                                    "position:absolute;display:flex;align-items:center;";
                                  cardRef.removeChild(perspWrap);
                                  leftCol.appendChild(perspWrap);

                                  const rightCol =
                                    document.createElement("div");
                                  rightCol.style.cssText =
                                    "position:absolute;display:flex;align-items:center;";
                                  const rightStack =
                                    document.createElement("div");
                                  rightStack.style.cssText = `position:relative;width:${TILE_SZ}px;height:${TILE_SZ}px;`;
                                  tileData.forEach(({ letter }) => {
                                    const s = makeSVG(letter, tStroke());
                                    if (s) {
                                      s.style.cssText = `width:${TILE_SZ}px;height:${TILE_SZ}px;position:absolute;top:0;left:0;`;
                                      rightStack.appendChild(s);
                                    }
                                  });
                                  rightCol.appendChild(rightStack);

                                  // Botão replay
                                  const replayBtn =
                                    document.createElement("button");
                                  replayBtn.innerHTML = "&#8635;";
                                  replayBtn.title = "Repetir animação";
                                  replayBtn.style.cssText =
                                    "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:34px;height:34px;border:1px solid var(--border);background:var(--surface);color:var(--text3);border-radius:50%;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;z-index:10;transition:background 0.2s,color 0.2s;opacity:0;pointer-events:none;";
                                  splitRow.appendChild(replayBtn);
                                  splitRow.appendChild(rightCol);
                                  splitRow.appendChild(leftCol);
                                  cardRef.insertBefore(
                                    splitRow,
                                    cardRef.firstChild,
                                  );

                                  requestAnimationFrame(() =>
                                    requestAnimationFrame(() => {
                                      anime({
                                        targets: leftCol,
                                        translateX: -62,
                                        duration: 700,
                                        easing: "easeOutCubic",
                                      });
                                      anime({
                                        targets: rightCol,
                                        translateX: 62,
                                        duration: 700,
                                        easing: "easeOutCubic",
                                        complete: () => {
                                          // Mostra o botão replay no centro após split
                                          anime({
                                            targets: replayBtn,
                                            opacity: 1,
                                            duration: 300,
                                            easing: "easeOutQuad",
                                          });
                                          replayBtn.style.pointerEvents =
                                            "auto";
                                          replayBtn.addEventListener(
                                            "mouseover",
                                            () => {
                                              replayBtn.style.background =
                                                "var(--surface2)";
                                              replayBtn.style.color =
                                                "var(--text1)";
                                            },
                                          );
                                          replayBtn.addEventListener(
                                            "mouseout",
                                            () => {
                                              replayBtn.style.background =
                                                "var(--surface)";
                                              replayBtn.style.color =
                                                "var(--text3)";
                                            },
                                          );
                                          replayBtn.addEventListener(
                                            "click",
                                            () => {
                                              replayCount++;
                                              if (replayCount >= 3) {
                                                replayBtn.innerHTML =
                                                  "\uD83D\uDE2C";
                                                replayBtn.title =
                                                  "T\u00e1, pode parar...";
                                              }
                                              runPhases();
                                            },
                                          );
                                          if (!phaseRan) {
                                            phaseRan = true;
                                            scrollFeed();
                                            chatMsg(
                                              "Todas as letras empilhadas formam o glifo da palavra.",
                                              200,
                                            );
                                            chatMsg(
                                              "A ordem importa: BOLA \u2260 LOBA.",
                                              1200,
                                            );
                                            // Card comparativo BOLA vs LOBA
                                            chatCard((card) => {
                                              card.style.cssText +=
                                                "display:flex;justify-content:center;gap:20px;align-items:center;padding:12px;";
                                              [
                                                ["BOLA", ["B", "O", "L", "A"]],
                                                ["LOBA", ["L", "O", "B", "A"]],
                                              ].forEach(([word, letters]) => {
                                                const col =
                                                  document.createElement("div");
                                                col.style.cssText =
                                                  "display:flex;flex-direction:column;align-items:center;gap:6px;";
                                                const lbl =
                                                  document.createElement("div");
                                                lbl.textContent = word;
                                                lbl.style.cssText =
                                                  "font-size:0.7rem;font-weight:700;letter-spacing:0.08em;color:var(--text3);";
                                                const stack =
                                                  document.createElement("div");
                                                stack.style.cssText =
                                                  "position:relative;width:96px;height:96px;";
                                                // empilhar de trás para frente (última letra = base)
                                                [...letters]
                                                  .reverse()
                                                  .forEach((l) => {
                                                    const s = makeSVG(
                                                      l,
                                                      tcOf[l],
                                                    );
                                                    if (s) {
                                                      s.style.cssText =
                                                        "width:96px;height:96px;position:absolute;top:0;left:0;";
                                                      stack.appendChild(s);
                                                    }
                                                  });
                                                col.appendChild(lbl);
                                                col.appendChild(stack);
                                                card.appendChild(col);
                                              });
                                            }, 1900);
                                            setTimeout(() => {
                                              newToken();
                                              chatChoices(
                                                [
                                                  {
                                                    label: "Entendi! \u2192",
                                                    onClick: () => tutNext(),
                                                  },
                                                ],
                                                400,
                                              );
                                              // Easter egg: hover se repetiu (qualquer replay)
                                              setTimeout(() => {
                                                const btn =
                                                  document.querySelector(
                                                    ".tut-choice-btn",
                                                  );
                                                if (btn) {
                                                  const orig = btn.textContent;
                                                  btn.addEventListener(
                                                    "mouseenter",
                                                    () => {
                                                      if (replayCount >= 3)
                                                        btn.textContent =
                                                          "Vai logo, vai! \uD83D\uDE24";
                                                      else if (replayCount >= 1)
                                                        btn.textContent =
                                                          "Caraca, voc\u00ea \u00e9 um g\u00eanio!";
                                                    },
                                                  );
                                                  btn.addEventListener(
                                                    "mouseleave",
                                                    () => {
                                                      btn.textContent = orig;
                                                    },
                                                  );
                                                }
                                              }, 600);
                                            }, 3200);
                                          }
                                        },
                                      });
                                      scrollFeed();
                                    }),
                                  );
                                }, 600);
                              },
                            });
                          },
                        });
                      },
                    });
                  },
                });
              }; // fim runAnimation

              tileData.forEach(({ label }) => {
                if (label) label.style.opacity = "0";
              });

              let colored = 0;
              tileData.forEach(({ svgEl, letter }, i) => {
                setTimeout(() => {
                  if (!svgEl || !svgEl.parentNode) return;
                  svgEl.style.transition =
                    "transform 0.2s ease-in, opacity 0.2s";
                  svgEl.style.transform = "scale(0.6)";
                  svgEl.style.opacity = "0";
                  setTimeout(() => {
                    const newSvg = makeSVG(letter, tcOf[letter]);
                    if (!newSvg) return;
                    newSvg.style.cssText = svgEl.style.cssText;
                    newSvg.style.transform = "scale(0.6)";
                    newSvg.style.opacity = "0";
                    newSvg.style.transition =
                      "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s";
                    svgEl.parentNode.replaceChild(newSvg, svgEl);
                    tileData[i].svgEl = newSvg;
                    requestAnimationFrame(() =>
                      requestAnimationFrame(() => {
                        newSvg.style.transform = "scale(1)";
                        newSvg.style.opacity = "1";
                      }),
                    );
                    colored++;
                    if (colored === tileData.length) {
                      setTimeout(() => runPhases(), 400);
                    }
                  }, 200);
                }, i * 450);
              });
            },
          },
        ]);
      }, allIn1 + 2000);
      break;
    }

    case 2: {
      TUT.setState("step_2");
      chatMsg(
        "Agora veja <em>esse</em> Glifo do Dia. O que ser\u00E1? \uD83E\uDD14",
        200,
      );
      let stack2;
      chatCard((card) => {
        card.style.cssText +=
          "display:flex;justify-content:center;background:transparent;border:none;padding:0;";
        const { wrap, stack } = makeGlyphSingle(
          "Glifo do Dia \u2014 ???",
          "200px",
        );
        stack2 = stack;
        card.appendChild(wrap);
      }, 500);
      tDelay(() => {
        if (!token.cancelled && stack2) tStackEl(stack2, TDL, () => tStroke());
      }, 600);

      // ── Interactive guess section ────────────────────────────────
      const tried2 = new Set();
      const histEntries2 = [];
      // Phase 1 choices (reveal found letters). Phase 2 choices (lock O at slot 3).
      const WORDS2_P1 = ["LOTE", "RUDE", "POSE"];
      const WORDS2_P2 = ["RATO", "CALO", "VASO"];
      const wLetters2 = {
        LOTE: ["L", "O", "T", "E"],
        RUDE: ["R", "U", "D", "E"],
        POSE: ["P", "O", "S", "E"],
        RATO: ["R", "A", "T", "O"],
        CALO: ["C", "A", "L", "O"],
        VASO: ["V", "A", "S", "O"],
      };
      // Per-slot result against ARCO = [A(0),R(1),C(2),O(3)]
      const wSlots2 = {
        LOTE: ["miss", "found", "miss", "miss"],
        RUDE: ["found", "miss", "miss", "miss"],
        POSE: ["miss", "found", "miss", "miss"],
        RATO: ["found", "found", "miss", "correct"],
        CALO: ["found", "found", "miss", "correct"],
        VASO: ["miss", "found", "miss", "correct"],
      };
      const wCorrect2 = {
        LOTE: [],
        RUDE: [],
        POSE: [],
        RATO: ["O"],
        CALO: ["O"],
        VASO: ["O"],
      };
      const wFound2 = {
        LOTE: ["O"],
        RUDE: ["R"],
        POSE: ["O"],
        RATO: ["R", "A"],
        CALO: ["C", "A"],
        VASO: ["A"],
      };
      const _p2Msg = `A letra <strong style="color:${tdOf["O"]}">O</strong> foi decifrada! ✅ Quando uma letra está no lugar certo, ela <strong>some do Glifo</strong> — o desenho fica mais simples, e o jogo fica mais fácil.`;
      const wMsg2 = {
        LOTE: `O Glifo coloriu! Uma letra existe na palavra — mas está na posição errada. 🕵️`,
        RUDE: `Encontramos o <strong style="color:${tdOf["R"]}">R</strong>! Ele existe na palavra, mas está fora do lugar. Isso é raro — letras incomuns são pistas valiosas! 🔎`,
        POSE: `O Glifo coloriu! Uma letra existe na palavra — mas está na posição errada. 🕵️`,
        RATO: _p2Msg,
        CALO: _p2Msg,
        VASO: _p2Msg,
      };

      // Letters remaining in glyph (O removed once RATO/CALO/VASO tried)
      function glStack2() {
        const p2Done =
          tried2.has("RATO") || tried2.has("CALO") || tried2.has("VASO");
        return p2Done ? ["A", "R", "C"] : TDL;
      }
      // Colors for glyph based on found letters so far
      function glColor2() {
        const f = new Set();
        if (tried2.has("LOTE") || tried2.has("POSE")) f.add("O");
        if (tried2.has("RUDE")) f.add("R");
        if (tried2.has("RATO")) {
          f.add("R");
          f.add("A");
        }
        if (tried2.has("CALO")) {
          f.add("C");
          f.add("A");
        }
        if (tried2.has("VASO")) f.add("A");
        return (l) => (f.has(l) ? tdOf[l] : tStroke());
      }

      function runGuess2(word) {
        const num2 = tried2.size + 1;
        const letters2 = wLetters2[word];
        const isP2 = WORDS2_P2.includes(word);
        // Capture state BEFORE registering this guess
        const stackBefore2 = glStack2();
        const colorBefore2 = glColor2();
        tried2.add(word);
        histEntries2.push({
          word,
          correct: wCorrect2[word],
          found: wFound2[word],
        });
        // State AFTER
        const stackAfter2 = glStack2();
        const colorAfter2 = glColor2();

        const nextDelay2 = 4300;

        // Banana boy walks right→left on the very first guess (fires bbMidCb near end)
        let bbMidCb = null;
        if (num2 === 1) {
          tDelay(() => {
            if (!window.lottie) {
              if (bbMidCb) bbMidCb();
              return;
            }
            const panel = document.querySelector(
              "#tutorial-overlay .tut-panel",
            );
            if (!panel) return;
            const BB_W = 160;
            const bbDiv = document.createElement("div");
            bbDiv.style.cssText =
              [
                "position:absolute",
                "bottom:0",
                "right:-" + BB_W + "px",
                "width:" + BB_W + "px",
                "height:" + BB_W + "px",
                "z-index:10",
                "cursor:pointer",
                "will-change:right",
              ].join(";") + ";";
            panel.style.position = "relative";
            panel.style.overflow = "hidden";
            panel.appendChild(bbDiv);
            const bbInst = lottie.loadAnimation({
              container: bbDiv,
              renderer: "svg",
              loop: true,
              autoplay: true,
              animationData: _bananaBoyData || undefined,
              path: _bananaBoyData ? undefined : "animations/banana_boy.json",
            });
            const panelW = panel.offsetWidth || 480;
            const DIST = panelW + BB_W;
            const T_WALK = 7500;
            const eio = (p) => -(Math.cos(Math.PI * p) - 1) / 2;
            let t0 = null,
              midFired = false,
              bbStopped = false;
            // Easter egg: clicar na banana — ela vira e volta
            const _bbClick = () => {
              if (bbStopped) return;
              bbStopped = true;
              bbDiv.removeEventListener("click", _bbClick);
              bbDiv.style.cursor = "default";
              // Insert the easter egg bubble before the bb-typing indicator (if visible)
              const feed = document.getElementById("tut-chat-feed");
              const typingEl = document.getElementById("bb-typing");
              const eggBubble = document.createElement("div");
              eggBubble.className = "tut-bubble-left";
              eggBubble.textContent = "Ei! O menino só passa, não morde! 🍌";
              if (feed && typingEl) {
                feed.insertBefore(eggBubble, typingEl);
              } else if (feed) {
                feed.appendChild(eggBubble);
              }
              requestAnimationFrame(() =>
                requestAnimationFrame(() => {
                  eggBubble.classList.add("show");
                  scrollFeed();
                }),
              );
              if (!midFired) {
                midFired = true;
                if (bbMidCb) setTimeout(bbMidCb, 1200);
              }
              // Flip horizontally and animate back to the right
              bbDiv.style.transform = "scaleX(-1)";
              const startRight = parseFloat(bbDiv.style.right) || 0;
              const returnDist = startRight + BB_W; // distance back off-screen right
              const T_RETURN = Math.max(
                1200,
                (returnDist / DIST) * T_WALK * 0.6,
              );
              let r0 = null;
              const doReturn = (ts) => {
                if (!r0) r0 = ts;
                const p = Math.min((ts - r0) / T_RETURN, 1);
                bbDiv.style.right =
                  (startRight - eio(p) * returnDist).toFixed(0) + "px";
                if (p < 1) {
                  requestAnimationFrame(doReturn);
                  return;
                }
                if (bbInst) bbInst.destroy();
                bbDiv.remove();
              };
              requestAnimationFrame(doReturn);
            };
            bbDiv.addEventListener("click", _bbClick);
            const doFrame = (ts) => {
              if (bbStopped) return;
              if (!t0) t0 = ts;
              const t = ts - t0;
              if (!midFired && t >= T_WALK * 0.85) {
                midFired = true;
                if (bbMidCb) bbMidCb();
              }
              if (t >= T_WALK) {
                bbDiv.removeEventListener("click", _bbClick);
                if (bbInst) bbInst.destroy();
                bbDiv.remove();
                return;
              }
              bbDiv.style.right =
                (-BB_W + eio(Math.min(t / T_WALK, 1)) * DIST).toFixed(0) + "px";
              requestAnimationFrame(doFrame);
            };
            requestAnimationFrame(doFrame);
          }, nextDelay2 + 1000);
        }

        let gSt2, wSt2, slEl2, hEl2;
        chatCard((card) => {
          card.style.cssText += "display:flex;flex-direction:column;gap:10px;";
          const row = document.createElement("div");
          row.className = "tut-glyph-row";
          const { panel: dp2, stack: ds2 } = makeGlyphPanel("Glifo do Dia");
          gSt2 = ds2;
          const { panel: gp2, stack: gs2 } = makeGlyphPanel(word);
          wSt2 = gs2;
          row.appendChild(dp2);
          row.appendChild(gp2);
          card.appendChild(row);
          slEl2 = document.createElement("div");
          slEl2.className = "tut-slots";
          slEl2.style.justifyContent = "center";
          letters2.forEach(() => {
            const el = document.createElement("div");
            el.className = "tut-slot";
            // letters animated in one-by-one after card appears
            slEl2.appendChild(el);
          });
          card.appendChild(slEl2);
          hEl2 = document.createElement("div");
          hEl2.style.cssText =
            "border:1px solid var(--border);border-radius:10px;overflow:hidden;opacity:0;transition:opacity 0.4s;";
          const hHdr = document.createElement("div");
          hHdr.className = "hdr";
          hHdr.innerHTML =
            "<span>Tentativa</span><span>Certas</span><span>Encontradas</span>";
          hEl2.appendChild(hHdr);
          // Rows rendered invisible so height is set from the start
          [...histEntries2].reverse().forEach((e) => {
            const row = makeDemoRow(e.word, e.correct, e.found);
            row.style.opacity = "0";
            hEl2.appendChild(row);
          });
          card.appendChild(hEl2);
        }, 400);

        // Show daily glyph before-state; right glyph builds incrementally
        tDelay(() => {
          if (token.cancelled) return;
          tStackEl(gSt2, stackBefore2, colorBefore2);
        }, 500);

        // Show typing indicator alongside the card (signals typing is coming)
        let decodingEl = null;
        tDelay(() => {
          if (token.cancelled) return;
          const feed = document.getElementById("tut-chat-feed");
          if (!feed) return;
          decodingEl = document.createElement("div");
          decodingEl.className = "tut-typing";
          decodingEl.innerHTML = "<span></span><span></span><span></span>";
          feed.appendChild(decodingEl);
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              decodingEl.classList.add("show");
              scrollFeed();
            }),
          );
        }, 600);

        // Animate letters into slots one by one; each letter also grows the right glyph
        letters2.forEach((l, i) => {
          tDelay(
            () => {
              if (token.cancelled || !slEl2) return;
              // Slot: add letter with pop animation
              const slot = slEl2.children[i];
              if (!slot) return;
              const sv = makeSVG(l, tStroke());
              if (sv) {
                sv.style.cssText = "width:65%;aspect-ratio:1;";
                slot.appendChild(sv);
              }
              slot.classList.remove("tap");
              void slot.offsetWidth;
              slot.classList.add("tap");
              scrollFeed();
              // Remove typing indicator when last letter lands
              // (kept alive — chatMsg will claim the existing .tut-typing instead)
              // Right glyph: prepend letter's SVG layer so letter[0] ends on top
              if (wSt2) {
                const wSvg = makeSVG(
                  l,
                  tStroke(),
                  "position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transition:opacity 0.3s;",
                );
                if (wSvg) {
                  wSt2.insertBefore(wSvg, wSt2.firstChild);
                  requestAnimationFrame(() =>
                    requestAnimationFrame(() => {
                      wSvg.style.opacity = "1";
                    }),
                  );
                }
              }
            },
            1100 + i * 350,
          );
        });

        // Animate slots revealing result + update right glyph per letter
        tDelay(() => {
          if (token.cancelled || !slEl2) return;
          const slots2 = [...slEl2.children];
          letters2.forEach((l, i) => {
            const status = wSlots2[word][i];
            setTimeout(() => {
              const el = slots2[i];
              if (!el) return;
              // Slot flip in
              el.style.transition = "transform 0.19s ease-in";
              el.style.transform = "scaleY(0)";
              setTimeout(() => {
                // Slot reveal
                el.innerHTML = "";
                if (status === "correct") {
                  el.style.background = tdOf[l];
                  el.style.borderColor = "transparent";
                  const sv = makeSVG(l, "#fff");
                  if (sv) {
                    sv.style.cssText =
                      "width:65%;aspect-ratio:1;display:block;";
                    el.appendChild(sv);
                  }
                } else {
                  el.style.background = "var(--surface2)";
                  el.style.borderColor = "var(--border2)";
                  const sv = makeSVG(l, tStroke());
                  if (sv) {
                    sv.style.cssText =
                      "width:65%;aspect-ratio:1;display:block;opacity:0.5;";
                    el.appendChild(sv);
                  }
                }
                void el.offsetWidth; // force reflow so flip-back transition fires
                el.style.transition = "transform 0.19s ease-out";
                el.style.transform = "scaleY(1)";
                // Right glyph: fade all letters out as slots reveal
                const wSvgIdx = letters2.length - 1 - i;
                const wSvgEl = wSt2 && wSt2.children[wSvgIdx];
                if (wSvgEl) {
                  wSvgEl.style.transition = "opacity 0.3s";
                  wSvgEl.style.opacity = "0";
                }
              }, 190);
            }, i * 200);
          });
        }, 3100);

        // Update glyph after all slots have finished flipping
        // Slots: start 3100ms + i*200ms offset + 380ms flip = last done ~4080ms
        tDelay(() => {
          if (token.cancelled) return;
          if (isP2) {
            // O locks — animate O disappearing from glyph (svgIdx 0 in DOM)
            const oSvg = gSt2 && gSt2.querySelectorAll("svg")[0];
            if (oSvg) {
              oSvg.style.transition = "opacity 0.6s, filter 0.6s";
              oSvg.style.opacity = "0";
              oSvg.style.filter = "blur(4px)";
              tDelay(() => {
                if (oSvg) oSvg.remove();
              }, 650);
            }
            tDelay(() => {
              tStackEl(gSt2, stackAfter2, colorAfter2);
              // Ghost O — dashed pulsing outline where O used to be
              const ghostSvg = makeSVG(
                "O",
                tdOf["O"],
                "position:absolute;top:0;left:0;width:100%;height:100%;",
              );
              if (ghostSvg && gSt2) {
                const g = ghostSvg.querySelector("g");
                if (g) {
                  g.setAttribute("stroke-width", "4");
                  g.setAttribute("stroke-dasharray", "5 8");
                  g.setAttribute("stroke-linecap", "round");
                }
                ghostSvg.classList.add("tut-ghost-o");
                gSt2.appendChild(ghostSvg);
              }
            }, 700);
          } else {
            // Phase 1 word: glyph gains found color
            tStackEl(gSt2, stackAfter2, colorAfter2);
          }
        }, 4300);

        tDelay(() => {
          if (token.cancelled || !hEl2) return;
          hEl2.style.opacity = "1";
          [...hEl2.querySelectorAll(".hrow")].forEach((row, i) => {
            row.style.transition = "opacity 0.4s";
            setTimeout(
              () => {
                row.style.opacity = "1";
              },
              i * 150 + 50,
            );
          });
          // Pulse found slots and history dots to draw attention
          if (!isP2) {
            const foundDots = [
              ...hEl2.querySelectorAll(".dcell:last-child .hdot"),
            ];
            const pulseEls = [...foundDots];
            setTimeout(() => {
              pulseEls.forEach((el) => el.classList.add("tut-found-pulse"));
            }, 200);
            setTimeout(() => {
              pulseEls.forEach((el) => el.classList.remove("tut-found-pulse"));
            }, 1500); // stop 300ms before Quaaase
          }
        }, 4400);

        if (isP2) {
          // Explain O locking, then player confirms before CARO curiosity
          chatMsg(wMsg2[word], nextDelay2 + 300);

          // CARO comparison sequence — extracted so birra flow can also call it
          const startCaro = (cameFromBirra) => {
            // Compute which letters the player discovered across both guesses
            const coloredSet = new Set();
            tried2.forEach((w) => wFound2[w].forEach((l) => coloredSet.add(l)));
            coloredSet.delete("O"); // O is always correct/decoded after P2
            const coloredArr = [...coloredSet];
            const unknownInGlyph = ["A", "R", "C"].filter(
              (l) => !coloredSet.has(l),
            );

            // Shared BOLA ≠ LOBA → CARO/ARCO panels → "Entendido" choice.
            // `base` = ms delay for the first BOLA message (relative to now).
            const continueBolaSeq = (base) => {
              let caroGst, arcoGst;
              chatMsg(
                `Lembra de <strong>BOLA ≠ LOBA</strong> lá em cima? É exatamente isso aqui — mesmas letras, ordem diferente. Ficamos com 2 opções: <strong>CARO</strong> e <strong>ARCO</strong>.`,
                base,
              );
              chatMsg(
                `Mas olha a pegadinha: o glifo deles é idêntico! 😯 Ambas têm A, C, O, R — só a ordem muda.`,
                base + 900,
              );
              chatCard((card) => {
                card.style.cssText +=
                  "display:flex;flex-direction:column;gap:10px;";
                const caroRow = document.createElement("div");
                caroRow.className = "tut-glyph-row";
                const { panel: cp, stack: cs } = makeGlyphPanel("CARO");
                caroGst = cs;
                const { panel: ap, stack: as_ } = makeGlyphPanel("ARCO");
                arcoGst = as_;
                caroRow.appendChild(cp);
                caroRow.appendChild(ap);
                card.appendChild(caroRow);
              }, base + 1500);
              // Color both glyphs identically (same ARCO colors) to show they're the same
              tDelay(() => {
                if (token.cancelled) return;
                tStackEl(caroGst, ["C", "A", "R", "O"], (l) => tdOf[l]);
                tStackEl(arcoGst, TDL, (l) => tdOf[l]);
              }, base + 1800);
              tDelay(() => {
                if (token.cancelled) return;
                chatChoices([
                  {
                    label: "Entendido — e agora? 🤔",
                    onClick: () => {
                      chatMsg(
                        `Se essa palavra fosse mais difícil, você poderia usar a <strong>Chave 🔑</strong> — ela revela a letra numa posição que você escolher. Mas tenho certeza que você não precisa dela pra essa palavra ridiculamente fácil, né? 😏`,
                        200,
                      );
                      let tutKeyRevealedPos = null;
                      const launchInteractive = (delay) => {
                        // Interactive slots — user types ARCO or CARO letter by letter
                        tDelay(() => {
                          if (token.cancelled) return;
                          iWord = "ARCO";
                          iLetters = TDL;
                          iColorOf = tdOf;
                          iTyped = ["", "", "", ""];
                          iConfirmed = new Set();
                          // O (last slot) is always decoded — pre-confirm it
                          const oPos = TDL.length - 1;
                          iTyped[oPos] = TDL[oPos];
                          iConfirmed.add(oPos);
                          if (tutKeyRevealedPos !== null) {
                            iTyped[tutKeyRevealedPos] = TDL[tutKeyRevealedPos];
                            iConfirmed.add(tutKeyRevealedPos);
                          }
                          iWrongCount = -999; // disable easter egg
                          iCursor = 0;
                          while (
                            iCursor < TDL.length &&
                            iConfirmed.has(iCursor)
                          )
                            iCursor++;
                          onTutGiveUp = null;
                          tutInteractReady = true;

                          const feed = document.getElementById("tut-chat-feed");
                          if (!feed) return;

                          const wrap = document.createElement("div");
                          wrap.className = "tut-bubble-right";

                          const staticHint = document.createElement("p");
                          staticHint.id = "ts5-hint";
                          staticHint.style.cssText =
                            "font-size:0.76rem;color:var(--text3);margin:0 0 8px;text-align:center;";
                          staticHint.textContent =
                            "ARCO ou CARO? Só a ordem certa decifra o glifo ↵";
                          wrap.appendChild(staticHint);

                          const slotsEl = document.createElement("div");
                          slotsEl.id = "ts5-interact";
                          slotsEl.className = "tut-slots";
                          slotsEl.style.justifyContent = "center";
                          wrap.appendChild(slotsEl);

                          const confirmBtn = document.createElement("button");
                          confirmBtn.className = "tut-choice-btn";
                          confirmBtn.style.cssText =
                            "margin-top:8px;width:100%;font-size:0.82rem;padding:6px 12px;";
                          confirmBtn.textContent = "Confirmar ↵";
                          wrap.appendChild(confirmBtn);

                          const kbd = document.createElement("div");
                          kbd.id = "tut-kbd";
                          kbd.className = "tut-kbd";
                          // Only show letters that haven't been confirmed yet
                          const remainingLetters = [
                            ...new Set(
                              TDL.filter((_, i) => !iConfirmed.has(i)),
                            ),
                          ];
                          const fireKey = (key) =>
                            tutKeyHandler?.({
                              key,
                              preventDefault: () => {},
                            });
                          remainingLetters.forEach((letter) => {
                            const btn = document.createElement("button");
                            btn.className = "tut-kbd-btn";
                            btn.type = "button";
                            btn.textContent = letter;
                            btn.addEventListener("pointerdown", (e) => {
                              e.preventDefault();
                              fireKey(letter);
                            });
                            kbd.appendChild(btn);
                          });
                          const bksp = document.createElement("button");
                          bksp.className = "tut-kbd-btn";
                          bksp.type = "button";
                          bksp.textContent = "⌫";
                          bksp.style.minWidth = "52px";
                          bksp.addEventListener("pointerdown", (e) => {
                            e.preventDefault();
                            fireKey("Backspace");
                          });
                          kbd.appendChild(bksp);
                          wrap.appendChild(kbd);

                          feed.appendChild(wrap);
                          requestAnimationFrame(() =>
                            requestAnimationFrame(() => {
                              wrap.classList.add("show");
                              scrollFeed();
                            }),
                          );

                          const handleNonArco = () => {
                            if (!iTyped.every(Boolean)) return;
                            const typed = iTyped.join("");
                            if (typed === "ARCO") return; // auto-handled by buildInteract
                            removeTutKeyHandler();
                            tutInteractReady = false;
                            if (confirmBtn.parentNode) confirmBtn.remove();
                            document.getElementById("tut-kbd")?.remove();
                            if (typed === "CARO") {
                              const zoada = cameFromBirra
                                ? `Sério?! Você disse que estava confuso... e ainda errou! Isso é talento. 😂`
                                : `Quase! Era <strong>ARCO</strong> — as letras eram as mesmas, mas a ordem importa! 😄`;
                              chatMsg(zoada, 300);
                              chatMsg(
                                `A palavra do dia é <strong>ARCO</strong>. Óbvio, né? 😏`,
                                1400,
                              );
                              chatMsg(
                                `Mas agora você sabe como funciona! Bora jogar? 🎮`,
                                2400,
                              );
                              const caroMsg = cameFromBirra
                                ? "Depois de toda aquela birra... errou CARO... e ainda quer revisar?! \uD83D\uDE2D"
                                : "Você não vai com a minha cara? \uD83D\uDE24";
                              chatFinale(false, 2900, 3400, caroMsg);
                            } else {
                              chatMsg(
                                `Hmm... nem era uma das opções! 😅 Era <strong>ARCO</strong>.`,
                                300,
                              );
                              chatMsg(
                                `Mas agora você sabe como funciona! Bora jogar? 🎮`,
                                1500,
                              );
                              chatFinale(false, 2000, 2500);
                            }
                          };

                          confirmBtn.onclick = handleNonArco;

                          onTutSolved = () => {
                            tutInteractReady = false;
                            if (confirmBtn.parentNode) confirmBtn.remove();
                            document.getElementById("tut-kbd")?.remove();
                            tutConfetti(feed);
                            chatMsg(
                              `Isso aí! 🎉 Era <strong>ARCO</strong>! Você conseguiu!`,
                              300,
                            );
                            chatMsg(
                              `Mandou bem! Agora você sabe jogar. 🏆`,
                              1400,
                            );
                            chatFinale(true, 1900, 2500);
                          };

                          buildInteract();
                          installTutKeyHandler();

                          // Patch: add Enter key for non-ARCO submissions
                          const baseHandler = tutKeyHandler;
                          document.removeEventListener("keydown", baseHandler);
                          const caroKeyHandler = (e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleNonArco();
                            } else {
                              baseHandler(e);
                            }
                          };
                          tutKeyHandler = caroKeyHandler;
                          document.addEventListener("keydown", caroKeyHandler);
                        }, delay);
                      }; // end launchInteractive
                      tDelay(() => {
                        if (token.cancelled) return;
                        chatSetChoices([
                          {
                            label: "Claro que não! 💪",
                            onClick: () => launchInteractive(400),
                          },
                          {
                            label: "Quero usar a Chave 🔑",
                            secondary: true,
                            onClick: () => {
                              chatMsg(
                                `Ok, mas fique sabendo que isso ficará marcado pra sempre em minha memória... 📝`,
                                0,
                              );
                              chatCard((card) => {
                                card.style.cssText += "gap:10px;";
                                const lbl = document.createElement("p");
                                lbl.style.cssText =
                                  "margin:0 0 2px;font-size:0.78rem;color:var(--text3);text-align:center;";
                                lbl.textContent =
                                  "Escolha a posição que quer revelar:";
                                card.appendChild(lbl);
                                const boxRow = document.createElement("div");
                                boxRow.className = "kboxes";
                                boxRow.style.marginBottom = "8px";
                                const kboxEls = [];
                                let selPos = null;
                                let revBtn;
                                // O (last position) is already decoded — mark as used
                                const tutKeyUsed = new Set([TDL.length - 1]);
                                TDL.forEach((letter, pos) => {
                                  const b = document.createElement("div");
                                  const isUsed = tutKeyUsed.has(pos);
                                  b.className =
                                    "kbox" + (isUsed ? " used" : "");
                                  if (isUsed) {
                                    b.style.background = tdOf[letter];
                                    b.style.borderColor = "transparent";
                                    const svg = makeSVG(letter, "#fff");
                                    if (svg) {
                                      svg.style.cssText =
                                        "width:62%;height:62%;";
                                      b.appendChild(svg);
                                    }
                                  } else {
                                    b.textContent = "?";
                                    b.onclick = () => {
                                      kboxEls.forEach((x) =>
                                        x.classList.remove("sel"),
                                      );
                                      b.classList.add("sel");
                                      selPos = pos;
                                      revBtn.disabled = false;
                                    };
                                  }
                                  kboxEls.push(b);
                                  boxRow.appendChild(b);
                                });
                                card.appendChild(boxRow);
                                revBtn = document.createElement("button");
                                revBtn.className = "kuse-btn";
                                revBtn.disabled = true;
                                revBtn.textContent = "Revelar 🔑";
                                revBtn.onclick = () => {
                                  if (selPos === null) return;
                                  const letter = TDL[selPos];
                                  const color = tdOf[letter];
                                  kboxEls.forEach((b, i) => {
                                    b.onclick = null;
                                    if (i === selPos) {
                                      b.classList.remove("sel");
                                      b.style.background = color;
                                      b.style.borderColor = "transparent";
                                      b.style.cursor = "default";
                                      b.textContent = "";
                                      const svg = makeSVG(letter, "#fff");
                                      if (svg) {
                                        svg.style.cssText =
                                          "width:62%;height:62%;";
                                        b.appendChild(svg);
                                      }
                                    } else {
                                      b.style.opacity = "0.3";
                                      b.style.cursor = "default";
                                    }
                                  });
                                  revBtn.disabled = true;
                                  revBtn.style.opacity = "0.5";
                                  tutKeyRevealedPos = selPos;
                                  launchInteractive(900);
                                };
                                card.appendChild(revBtn);
                              }, 1000);
                            },
                          },
                        ]);
                      }, 1200);
                    },
                  },
                ]);
              }, base + 2300);
            }; // end continueBolaSeq

            if (coloredArr.length === 3) {
              chatMsg(
                `O glifo ficou com 3 letras — e <strong>todas estão coloridas</strong>! ✨ Você descobriu que <strong>A</strong>, <strong>C</strong> e <strong>R</strong> existem na palavra, e <strong>O</strong> está na posição certa.`,
                200,
              );
              continueBolaSeq(1200);
            } else if (unknownInGlyph.length === 1) {
              const [miss] = unknownInGlyph;
              const found2Str = coloredArr
                .map((l) => `<strong>${l}</strong>`)
                .join(" e ");
              // Keep a reference to the bubble so "Eu descobri?" can redact it
              let introBubble = null;
              const introHtmlVisible = `Temos <strong>2 letras coloridas</strong> no glifo — você descobriu que ${found2Str} existem na palavra, e <strong>O</strong> está no lugar certo. Falta o <strong>${miss}</strong>... mas entre nós: ele também está lá 🤫.`;
              const introHtmlMasked = `Temos <strong>2 letras coloridas</strong> no glifo — você descobriu que <strong>◆</strong> e <strong>◆</strong> existem na palavra, e <strong>O</strong> está no lugar certo. Falta o <strong>◆</strong>... mas entre nós: ele também está lá 🤫.`;
              tDelay(() => {
                if (token.cancelled) return;
                const feed = document.getElementById("tut-chat-feed");
                if (!feed) return;
                introBubble = document.createElement("div");
                introBubble.className = "tut-bubble-left";
                introBubble.innerHTML = introHtmlVisible;
                feed.appendChild(introBubble);
                requestAnimationFrame(() =>
                  requestAnimationFrame(() => {
                    introBubble.classList.add("show");
                    scrollFeed();
                  }),
                );
              }, 200);
              tDelay(() => {
                if (token.cancelled) return;
                chatSetChoices([
                  {
                    label: "Ok",
                    onClick: () => continueBolaSeq(300),
                  },
                  {
                    label: "Eu descobri? 🔍",
                    secondary: true,
                    onClick: () => {
                      // Redact the letters in the existing bubble
                      if (introBubble) introBubble.innerHTML = introHtmlMasked;
                      chatMsg(
                        `Sim... VOCÊ! Sem ajuda, eu não disse NADA 🙊`,
                        300,
                      );
                      tDelay(() => {
                        if (token.cancelled) return;
                        continueBolaSeq(200);
                      }, 1800);
                    },
                  },
                ]);
              }, 1200);
            } else {
              const [l1] = coloredArr;
              chatMsg(
                `Só conseguimos <strong>1 letra colorida</strong> — sabemos que <strong>${l1}</strong> existe na palavra, e <strong>O</strong> está no lugar certo. Com um spoilerim: <strong>C</strong> e <strong>R</strong> também estão lá! 🤫 Ou seja: <strong>A, C, O</strong> e <strong>R</strong>.<br><br>No jogo de verdade não revelamos qual é a letra colorida — você precisa descobrir olhando o glifo: às vezes ela fica no topo da pilha (bem óbvio!), às vezes aparecem só alguns traços coloridos lá no fundo. 🎨`,
                200,
              );
              continueBolaSeq(1200);
            }
          };

          // "Birra" flow — tutorial makes a fuss before relenting
          const irParaTermo = () => {
            window.open("https://term.ooo", "_blank", "noopener");
          };
          const birraRound3 = () => {
            chatMsg(
              `...........tá. Mas fique sabendo que eu tô fazendo um <em>enorme</em> favor. 😤`,
              0,
            );
            tDelay(() => {
              chatSetChoices([
                {
                  label: "Muito obrigado! 🙏",
                  onClick: () => {
                    startCaro(true);
                  },
                },
              ]);
            }, 1400);
          };
          const birraRound2 = () => {
            chatMsg(`Hmm. Não sei não... você me parece muito suspeito. 🤨`, 0);
            tDelay(() => {
              chatSetChoices([
                {
                  label: "Eu juro que entendo! Pode continuar! 🤞",
                  onClick: () => {
                    birraRound3();
                  },
                },
                {
                  label: "Ok, pro Termo mesmo... 🚪",
                  onClick: () => {
                    chatMsg(`Boa escolha. 😤`, 0);
                    setTimeout(irParaTermo, 800);
                  },
                },
              ]);
            }, 1400);
          };
          const birraRound1 = () => {
            chatMsg(
              `Fala sério! Mais explicado do que isso? Vai jogar <a href="https://term.ooo" target="_blank" rel="noopener">Termo</a>, vai! 😄`,
              0,
            );
            tDelay(() => {
              chatSetChoices([
                {
                  label: "Mas eu gosto mais do Gliffo! 🥺",
                  onClick: () => {
                    birraRound2();
                  },
                },
                {
                  label: "Tá bem, vou mesmo... 🚪",
                  onClick: () => {
                    chatMsg(`Boa viagem! 👋`, 0);
                    setTimeout(irParaTermo, 800);
                  },
                },
              ]);
            }, 1400);
          };

          chatChoices(
            [
              {
                label: "Acho que já sei! 🧠",
                onClick: () => {
                  startCaro(false);
                },
              },
              {
                label: "Estou confuso ainda... 😵",
                secondary: true,
                onClick: () => {
                  birraRound1();
                },
              },
            ],
            nextDelay2 + 1500,
          );
        } else {
          chatTypingThenMsg(
            "pre-typing",
            2400,
            `Quase lá! 🔎 Glifos coloridos indicam que a letra <strong>existe</strong> na palavra — mas está na posição errada.`,
            nextDelay2 + 500,
            token,
          );
          chatTypingThenMsg("bb-typing", nextDelay2 + 1000, null, null, token);
          const showP2 = () => {
            const feed = document.getElementById("tut-chat-feed");
            const indicator = document.getElementById("bb-typing");
            const div = document.createElement("div");
            div.className = "tut-bubble-left";
            const p1FoundCount = wFound2[word].length;
            div.innerHTML = `Temos <strong>${p1FoundCount}</strong> letra${p1FoundCount !== 1 ? "s" : ""} colorida${p1FoundCount !== 1 ? "s" : ""} no glifo — o jogo não vai te dizer qual é: vai ter que descobrir. 🕵️`;
            if (feed && indicator) {
              feed.replaceChild(div, indicator);
            } else if (feed) {
              feed.appendChild(div);
            }
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                div.classList.add("show");
                scrollFeed();
              }),
            );
            tDelay(() => {
              if (token.cancelled) return;
              chatMsg(`Vamos tentar outra palavra! 🔄`, 0);
              tDelay(() => {
                if (token.cancelled) return;
                chatSetChoices(
                  WORDS2_P2.map((w) => ({
                    label: w,
                    onClick: () => runGuess2(w),
                  })),
                );
              }, 900);
            }, 1000);
          };
          if (num2 === 1) {
            bbMidCb = showP2;
          } else {
            tDelay(() => {
              if (!token.cancelled) showP2();
            }, nextDelay2 + 2400);
          }
        }
      }

      chatChoices(
        [
          {
            label: "Quero tentar descobrir!",
            onClick: () => {
              chatMsg("Qual palavra tentar primeiro?", 200);
              tDelay(() => {
                if (token.cancelled) return;
                chatSetChoices(
                  WORDS2_P1.map((w) => ({
                    label: w,
                    onClick: () => runGuess2(w),
                  })),
                );
              }, 800);
            },
          },
        ],
        2000,
      );
      break;
    }
  }
}

function tutNext() {
  renderStep(++tutStep, true);
}
function sadGoodbye() {
  if (_byeToken) {
    _byeToken.cancelled = true;
    _byeToken = null;
  }
  const token = { cancelled: false };
  _byeToken = token;
  TUT.setState("sad_walk");
  tClear();
  stopTyping();
  stopIso();
  if (currentActionToken) {
    currentActionToken.cancelled = true;
    currentActionToken = null;
  }

  // Clear choices immediately so nothing is clickable during the walk
  const choicesEl = document.getElementById("tut-chat-choices");
  if (choicesEl) choicesEl.innerHTML = "";

  // Mensagem imediata para preencher o tempo de carregamento do boneco
  newToken();
  chatMsg("Poxa\u2026 \uD83E\uDD79", 0);
  // Typing indicator enquanto o boneco anda
  tDelay(() => {
    if (currentActionToken && currentActionToken.cancelled) return;
    const feed = document.getElementById("tut-chat-feed");
    if (!feed) return;
    const typing = document.createElement("div");
    typing.id = "tut-bye-typing";
    typing.className = "tut-typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    feed.appendChild(typing);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        typing.classList.add("show");
        feed.scrollTop = feed.scrollHeight;
      }),
    );
  }, 600);

  const panel = document.querySelector("#tutorial-overlay .tut-panel");

  // The panel is position:relative implicitly — we need it to clip and contain the cat
  panel.style.position = "relative";
  panel.style.overflow = "hidden"; // already set in CSS but ensure it

  // lottie-web: reutiliza div pré-renderizado ou cria novo
  const CAT_W = 160;
  let catDiv, lottieInst;
  if (_sadLottie) {
    // já renderizado: apenas reposiciona no painel
    catDiv = _sadLottie.div;
    lottieInst = _sadLottie.inst;
    _sadLottie = null;
    catDiv.id = "tut-bye-cat";
    catDiv.style.cssText =
      [
        "position:absolute",
        "bottom:0",
        "left:-" + CAT_W + "px",
        "width:" + CAT_W + "px",
        "height:" + CAT_W + "px",
        "z-index:10",
        "pointer-events:none",
        "will-change:left",
      ].join(";") + ";";
    panel.appendChild(catDiv);
  } else {
    // fallback: cria do zero
    catDiv = document.createElement("div");
    catDiv.id = "tut-bye-cat";
    catDiv.style.cssText =
      [
        "position:absolute",
        "bottom:0",
        "left:-" + CAT_W + "px",
        "width:" + CAT_W + "px",
        "height:" + CAT_W + "px",
        "z-index:10",
        "pointer-events:none",
        "will-change:left",
      ].join(";") + ";";
    panel.appendChild(catDiv);
    lottieInst = window.lottie
      ? lottie.loadAnimation({
          container: catDiv,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: _sadWalkingData || undefined,
          path: _sadWalkingData ? undefined : "animations/sad_walking.json",
        })
      : null;
  }

  const panelW = panel.offsetWidth || 480;
  const DIST = panelW + CAT_W;
  const T_WALK = 7500; // ms to cross panel
  const T_MSG = T_WALK * 0.75; // dispara mensagens a 75% do percurso
  const eio = (p) => -(Math.cos(Math.PI * p) - 1) / 2; // ease-in-out sine

  let rafId = null,
    t0 = null,
    msgsFired = false;
  const doFrame = (ts) => {
    if (token.cancelled) return;
    if (!t0) t0 = ts;
    const t = ts - t0;

    // Dispara mensagens antes do fim do percurso
    if (!msgsFired && t >= T_MSG) {
      msgsFired = true;
      // Replace typing indicator atomically with first message
      const feed = document.getElementById("tut-chat-feed");
      const typingEl = document.getElementById("tut-bye-typing");
      _byeToken = null;
      newToken();
      onTutSolved = null;
      onTutGiveUp = null;
      TUT.setState("comeback");
      const div = document.createElement("div");
      div.className = "tut-bubble-left";
      div.innerHTML = "Psst\u2026 ficou a\u00ED? \uD83D\uDC40";
      if (feed && typingEl) {
        feed.replaceChild(div, typingEl);
      } else if (feed) {
        feed.appendChild(div);
      }
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          div.classList.add("show");
          scrollFeed();
        }),
      );
      chatMsg(
        "A gente promete que fica mais f\u00E1cil depois do primeiro jogo!",
        800,
      );
      chatChoices(
        [
          {
            label: "Ok, me convenceu! \uD83C\uDFA8",
            onClick: () => {
              tutStep = 1;
              renderStep(1, true);
            },
          },
          {
            label: "Tchau mesmo \uD83D\uDC4B",
            secondary: true,
            onClick: () => tutSkipOrRestart(),
          },
        ],
        1800,
      );
    }

    if (t >= T_WALK) {
      if (lottieInst) {
        lottieInst.destroy();
        lottieInst = null;
      }
      catDiv.remove();
      return;
    }
    catDiv.style.left =
      (-CAT_W + eio(Math.min(t / T_WALK, 1)) * DIST).toFixed(0) + "px";
    rafId = requestAnimationFrame(doFrame);
  };

  rafId = requestAnimationFrame(doFrame);
}



function tutSkipOrRestart() {
  localStorage.setItem("gliffoo_tutdone", "1");
  closeTutorial();
}
function showRatingAndClose() {
  tClear();
  newToken();
  chatMsg(
    "Antes de ir \u2014 s\u00F3 uma perguntinha r\u00E1pida! \uD83D\uDE07",
    600,
  );
  chatMsg(
    "De <strong>0 a 10</strong>, como voc\u00EA avalia nosso tutorial?",
    1400,
  );
  tDelay(() => {
    if (currentActionToken && currentActionToken.cancelled) return;
    const feed = document.getElementById("tut-chat-feed");
    if (!feed) return;
    const wrap = document.createElement("div");
    wrap.style.cssText =
      "display:flex;flex-wrap:nowrap;gap:3px;padding:4px 0;width:100%;box-sizing:border-box;";

    const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    scores.forEach((n) => {
      const b = document.createElement("button");
      b.className = "tut-choice-btn" + (n < 7 ? " secondary" : "");
      b.style.cssText =
        "min-width:0;padding:5px 2px;font-size:0.78rem;flex:1 1 0;border-radius:8px;line-height:1;";
      b.textContent = String(n);
      b.dataset.score = n;
      wrap.appendChild(b);

      if (n !== 10) {
        b.addEventListener("mouseenter", (e) => {
          if (b._fled) return;
          b._fled = true;
          b.style.pointerEvents = "none";

          const rect = b.getBoundingClientRect();
          const wrapRect = wrap.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = cx - e.clientX;
          const dy = cy - e.clientY;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const dist = 70 + Math.random() * 60;
          const rawTx = (dx / len) * dist + (Math.random() - 0.5) * 40;
          const rawTy = (dy / len) * dist + (Math.random() - 0.5) * 40;
          // Clamp horizontal so button never exits the wrap width
          const maxLeft = wrapRect.left - rect.left;
          const maxRight = wrapRect.right - rect.right;
          const tx = Math.max(maxLeft, Math.min(maxRight, rawTx));
          const ty = rawTy;
          const rot = (Math.random() - 0.5) * 80;

          anime({
            targets: b,
            translateX: tx,
            translateY: ty,
            rotate: rot,
            opacity: 0.2,
            duration: 160,
            easing: "easeOutQuad",
          });
        });
      }

      b.addEventListener("click", () => {
        if (b._fled) return;
        card.remove();
        const picked = parseInt(b.dataset.score);
        const msg =
          picked === 10
            ? "\uD83E\uDD73 Que alegria! Obrigado pelo feedback!"
            : picked >= 6
              ? "Obrigado! A gente vai trabalhar pra chegar no 10 \uD83D\uDE04"
              : "Poxa... pelo menos foi honesto \uD83D\uDE4F Vamos melhorar!";
        chatUserNow(String(picked), () => {
          newToken();
          chatMsg(msg, 200);
          tDelay(() => closeTutorial(), 2000);
        });
      });
    });

    const card = document.createElement("div");
    card.className = "tut-chat-card show";
    card.style.cssText += "padding:10px 12px;";
    card.appendChild(wrap);
    feed.appendChild(card);
    feed.scrollTop = feed.scrollHeight;
  }, 2200);
}

function closeTutorial() {
  TUT.setState("done");
  TUT._freeInputOverride = null;
  // 1. Cancela todas as animações pendentes
  if (_byeToken) {
    _byeToken.cancelled = true;
    _byeToken = null;
  }
  const _byeCat = document.getElementById("tut-bye-cat");
  if (_byeCat) _byeCat.remove();
  // dotLottie cleanup handled via token.cancelled check in doFrame
  const _byeScene = document.getElementById("tut-bye-scene");
  if (_byeScene) _byeScene.remove();
  const _tutPanel = document.querySelector("#tutorial-overlay .tut-panel");
  if (_tutPanel) _tutPanel.removeAttribute("style");
  tClear();
  stopTyping();
  stopIso();
  removeTutKeyHandler();
  if (currentActionToken) {
    currentActionToken.cancelled = true;
    currentActionToken = null;
  }

  // 2. Fecha o overlay
  document.getElementById("tutorial-overlay").classList.add("hidden");

  // 2b. Limpa o chat para próxima abertura
  const _oldArrow = document.getElementById("ts0-arrow-overlay");
  if (_oldArrow) {
    if (_oldArrow._cleanup) _oldArrow._cleanup();
    _oldArrow.remove();
  }
  const feed = document.getElementById("tut-chat-feed");
  const choices = document.getElementById("tut-chat-choices");
  if (feed) feed.innerHTML = "";
  if (choices) choices.innerHTML = "";
  onTutSolved = null;
  onTutGiveUp = null;

  // 3. Reset limpo do estado do jogo (evita estado sujo após tutorial)
  G.typed = [];
  G.cursor = nextCursor(0);
  G.attempts = [];
  G.decoded = new Set();
  G.found = new Set();
  G.keyUsed = false;
  G.keyPos = new Set();
  G.done = false;
  G.won = false;
  G.selKey = null;

  // 4. Reconstrói UI do jogo do zero
  buildAtts();
  buildBoxes();
  buildKB();
  renderDaily();
  renderYours();

  // 5. Persiste flag de tutorial visto
  localStorage.setItem("gliffoo_tutdone", "1");
}
let _sadWalkingData = null; // pre-fetched lottie JSON
let _sadLottie = null; // { div, inst } pré-renderizado offscreen
let _bananaBoyData = null; // pre-fetched lottie JSON
function _prepareSadLottie(data) {
  if (!window.lottie || _sadLottie) return;
  const div = document.createElement("div");
  div.style.cssText =
    "position:fixed;left:-9999px;top:-9999px;width:160px;height:160px;";
  document.body.appendChild(div);
  const inst = lottie.loadAnimation({
    container: div,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: data,
  });
  _sadLottie = { div, inst };
}
function openTutorial(startStep) {
  tClear();
  newToken();
  tutStep = startStep || 0;
  document.getElementById("tutorial-overlay").classList.remove("hidden");
  renderStep(tutStep);
}
function _dbgTutStep(step) {
  openTutorial(step);
}
window.addEventListener("load", () => {
  // Pré-carrega e pré-renderiza animação do personagem triste
  if (window.fetch) {
    fetch("animations/sad_walking.json")
      .then((r) => r.json())
      .then((d) => {
        _sadWalkingData = d;
        _prepareSadLottie(d);
      })
      .catch(() => {});
    fetch("animations/banana_boy.json")
      .then((r) => r.json())
      .then((d) => {
        _bananaBoyData = d;
      })
      .catch(() => {});
  }
  if (!localStorage.getItem("gliffoo_tutdone"))
    setTimeout(() => openTutorial(), 500);
  // Registra Service Worker (PWA)
  if ("serviceWorker" in navigator) {
    const isLocalServiceWorkerRuntime =
      location.protocol === "file:" ||
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1";

    if (isLocalServiceWorkerRuntime) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) =>
          Promise.all(
            registrations.map((registration) => registration.unregister()),
          ),
        )
        .catch(() => {});

      if ("caches" in window) {
        caches
          .keys()
          .then((keys) =>
            Promise.all(
              keys
                .filter((key) => key.startsWith("glifo-static-"))
                .map((key) => caches.delete(key)),
            ),
          )
          .catch(() => {});
      }
    } else {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {});
    }
  }
});
document.querySelector('.hbtn[title="Ajuda"]').onclick = () => openTutorial();

