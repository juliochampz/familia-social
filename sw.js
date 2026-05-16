// Service Worker — sempre busca da rede, sem cache agressivo
self.addEventListener('install', e=>{
  self.skipWaiting();
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k))))
    .then(()=>self.clients.claim())
  );
});

// Network first — sempre tenta a rede, sem cache
self.addEventListener('fetch', e=>{
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
