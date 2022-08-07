const version = "2"
const CACHE = version + "-onprem-wtf-offline";

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      // critical
      return cache.addAll([
          '/',
          '/index.html',
          '/offline',
          '/tags',
          '/PowerShell',
          '/post',
          '/search'
        ]);
    }),
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        var fetchPromise = fetch(event.request)
        .then(function (networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        .catch( error => {
          console.log("not found: " + error);
          return caches.match('/offline');
        });
        return response || fetchPromise;
      });
    }),
  );
});

self.addEventListener("activate", function(event) {

  event.waitUntil(
      caches
      .keys()
      .then(function(keys) {
          return Promise.all(
              keys
              .filter(function(key) {
                  return !key.startsWith(version);
              })
              .map(function(key) {
                  return caches.delete(key);
              })
          );
      })
  );
});