// glif.foo — Service Worker
// Estratégia: cache-first para assets estáticos, network-first para o HTML
// Versão do cache: incrementar ao fazer deploy com mudanças

const CACHE_STATIC = "glifo-static-v3";

// Assets que sempre ficam em cache (fontes, ícones, dicionário)
const PRECACHE = [
  "/",
  "/manifest.json",
  "/data/dicionario.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// ── INSTALL: pré-cacheia assets essenciais ──
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_STATIC)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
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
      .then(() => self.clients.claim()),
  );
});

// ── FETCH: estratégia por tipo de recurso ──
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Só intercepta requisições do próprio domínio
  if (url.origin !== location.origin) {
    // Fontes Google: cache-first com fallback de rede
    if (url.hostname.includes("fonts.g")) {
      event.respondWith(cacheFirst(request));
    }
    return;
  }

  // HTML principal: network-first (garante palavra do dia atualizada)
  if (request.destination === "document") {
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
    // Offline: serve do cache
    const cached = await caches.match(request);
    return (
      cached ||
      new Response(
        "<h1>glif.foo</h1><p>Sem conexão. Abra novamente quando estiver online.</p>",
        { headers: { "Content-Type": "text/html; charset=utf-8" } },
      )
    );
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
