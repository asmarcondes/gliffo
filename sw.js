const CACHE_NAME = 'gliffo-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.css',
  '/js/config.js',
  '/js/graphics.js',
  '/js/cloud.js',
  '/js/tutorial.js',
  '/js/achievements.js',
  '/js/arquivo.js',
  '/js/easter-eggs.js',
  '/js/app.js',
  '/data/dicionario.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching pre-requisites', STATIC_ASSETS);
      // Usar cache.addAll mas lidar com fetch errors suavemente (pode falhar no dev)
      return Promise.allSettled(
        STATIC_ASSETS.map(url => cache.add(url).catch(err => console.warn(`Falha ao cachear ${url}:`, err)))
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Limpa caches antigos e clama os clients na mesma cadeia de Promise
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Limpando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Pega o controle das páginas abertas imediatamente só se estiver pronto
      return self.clients.claim().catch(() => {});
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Ignora requisições de API (Edge Functions Supabase)
  if (event.request.url.includes('supabase.co')) {
    return;
  }

  // Estratégia Stale-While-Revalidate para o dicionário e scripts (mantem rápido mas atualiza background)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Guarda a resposta nova no cache para a próxima vez se:
        // - Foi com sucesso (200)
        // - É do tipo basic
        // - O esquema é http/https (bloqueia chrome-extension://)
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === 'basic' &&
          event.request.url.startsWith('http')
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache).catch(() => {});
          });
        }
        return networkResponse;
      }).catch(() => null);

      // Retorna o cache IMEDIATAMENTE. Se não houver cache, aguarda a rede cair.
      return cachedResponse || fetchPromise.then(res => {
         // Se a rede falhar também, retorna fallback genérico offline se for navigation
         if (!res && event.request.mode === 'navigate') {
            return caches.match('/index.html');
         }
         return res;
      });
    })
  );
});
