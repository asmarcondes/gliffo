// glif.foo — Service Worker
// Estratégia: cache-first para assets estáticos, network-first para o HTML
// O jogo requer conexão para buscar a palavra do dia (Edge Function Supabase).
// O SW não tenta servir o jogo offline — apenas armazena assets estáticos
// para acelerar carregamentos subsequentes.
// Versão do cache: incrementar ao fazer deploy com mudanças

const CACHE_STATIC = "glifo-static-v5";

// Assets pré-cacheados no install (fontes, ícones, dicionário, animações)
const PRECACHE = [
  "/",
  "/index.html",
  "/app.css",
  "/app.js",
  "/manifest.json",
  "/data/dicionario.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/animations/sad_walking.json",
  "/animations/banana_boy.json",
];

const NETWORK_FIRST_PATHS = new Set([
  "/",
  "/index.html",
  "/app.css",
  "/app.js",
  "/manifest.json",
]);

function isNetworkFirstAsset(request, url) {
  return (
    request.destination === "document" || NETWORK_FIRST_PATHS.has(url.pathname)
  );
}

// ── INSTALL: pré-cacheia assets essenciais ──
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_STATIC)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => globalThis.skipWaiting()),
  );
});

// ── ACTIVATE: limpa caches antigos ──
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_STATIC).map((k) => caches.delete(k)),
        ),
      )
      .then(() => globalThis.clients.claim()),
  );
});

// ── FETCH: estratégia por tipo de recurso ──
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  // Só intercepta requisições do próprio domínio
  if (url.origin !== location.origin) {
    // Fontes Google: cache-first com fallback de rede
    if (url.hostname.includes("fonts.g")) {
      event.respondWith(cacheFirst(request));
    }
    return;
  }

  // Shell do app: network-first para reduzir risco de JS/CSS stale em deploys
  if (isNetworkFirstAsset(request, url)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Demais assets (ícones, manifest): cache-first
  event.respondWith(cacheFirst(request));
});

// ── Estratégias ──

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_STATIC);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Sem rede: serve do cache se disponível (acelera recargas em conexão instável)
    const cached = await caches.match(request);
    if (cached) return cached;
    // Sem cache: deixa o erro propagar — o jogo requer conexão para funcionar
    throw new Error("glif.foo: sem conexão e sem cache disponível");
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_STATIC);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("", { status: 408 });
  }
}
