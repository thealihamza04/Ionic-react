
const CACHE_VERSION = 'v5';
const APP_SHELL_CACHE = `app-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/timetable.html',
  '/timetable.base.css',
  '/timetable.states.css',
  '/timetable.js'
];

self.addEventListener('install', (event) => {
  // Activate immediately to start serving from cache
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then(async (cache) => {
      console.log('[SW] Pre-caching static assets...');
      try {
        await cache.addAll(STATIC_ASSETS);
      } catch (error) {
        console.error('[SW] Pre-cache failed:', error);
      }
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== APP_SHELL_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Communication channel for progress
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'START_PRECACHE') {
    const assets = event.data.payload || [];
    const allToCache = [...new Set([...STATIC_ASSETS, ...assets])];
    
    event.waitUntil(
      caches.open(APP_SHELL_CACHE).then(async (cache) => {
        let completed = 0;
        const total = allToCache.length;

        const report = (url, status) => {
          completed++;
          const progress = Math.round((completed / total) * 100);
          if (event.source) {
            event.source.postMessage({
              type: 'SW_PROGRESS',
              payload: { url, status, completed, total, progress }
            });
          }
        };

        for (const url of allToCache) {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            await cache.put(url, response);
            report(url, 'success');
          } catch (err) {
            console.warn(`[SW] Failed to cache ${url}:`, err);
            report(url, 'error');
          }
        }
      })
    );
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  
  // Cache Google Fonts to keep typography working offline.
  const isGoogleFonts =
    url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com';

  if (!isSameOrigin && !isGoogleFonts) return;

  const isNavigation = request.mode === 'navigate';

  if (isNavigation) {
    if (url.pathname === '/timetable.html') {
      event.respondWith(
        fetch(request).catch(() => caches.match('/timetable.html'))
      );
      return;
    }

    // SPA navigation: Network-first with cache fallback
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match('/index.html') || caches.match('/'))
    );
    return;
  }

  // Static assets: Cache-first, then Network (Stale-While-Revalidate)
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
