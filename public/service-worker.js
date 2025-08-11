self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('meu-app-cache').then(cache => {
      return cache.addAll(['/', '/index.html']);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => {
      return resp || fetch(e.request);
    })
  );
});
