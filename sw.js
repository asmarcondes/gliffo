const CACHE_NAME = 'gliffo-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/index.css',
  '/config.js',
  '/graphics.js',
  '/cloud.js',
  '/app.js',
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
  // Limpa caches antigos
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
    })
  );
  self.clients.claim();
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
        // Guarda a resposta nova no cache para a próxima vez se for válida (status 200 e mesma origem)
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
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
