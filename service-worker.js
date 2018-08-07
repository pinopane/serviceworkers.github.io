var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/serviceworkers.github.io/images/clear.png',
  '/serviceworkers.github.io/images/cloudy-scattered-showers.png',
  '/serviceworkers.github.io/images/cloudy.png',
  '/serviceworkers.github.io/images/fog.png',
  '/serviceworkers.github.io/images/ic_add_white_24px.svg',
  '/serviceworkers.github.io/images/ic_refresh_white_24px.svg',
  '/serviceworkers.github.io/images/partly-cloudy.png',
  '/serviceworkers.github.io/images/rain.png',
  '/serviceworkers.github.io/images/scattered-showers.png',
  '/serviceworkers.github.io/images/sleet.png',
  '/serviceworkers.github.io/images/snow.png',
  '/serviceworkers.github.io/images/thunderstorm.png',
  '/serviceworkers.github.io/images/wind.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
