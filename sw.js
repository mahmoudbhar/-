const CACHE_NAME = 'quran-sadaka-v2';
const assets = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => {
          if (e.request.url.includes('alquran.cloud')) {
            cache.put(e.request.url, fetchRes.clone());
          }
          return fetchRes;
        });
      });
    }).catch(() => caches.match('./index.html'))
  );
});