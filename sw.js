// Минимальный service worker. Он нужен для того, чтобы сайт
// формально считался полноценным PWA (это требуется некоторым
// инструментам сборки APK, например PWABuilder). Кэширование
// специально не делается агрессивным, чтобы данные оборудования
// из Firebase всегда были самыми свежими.

self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  // Просто пропускаем все запросы напрямую в сеть.
  // Firebase и сами данные всегда должны идти "живыми".
  event.respondWith(fetch(event.request).catch(function () {
    return caches.match(event.request);
  }));
});
