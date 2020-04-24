const cacheVersion = "version1";

const cacheAssets = ["index.html", "about.html", "css/style.css", "main.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(cacheVersion)
      .then((cache) => {
        console.log("caching Assets");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== cacheVersion) {
            console.log("deleting old caches");
            caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .open(cacheVersion)
      .then(
        cache.match(e.request).then((res) => {
          if (res) {
            console.log("fetching from service worker");
            return res;
          } else {
            console.log("fecthing from live version");
            fetch(e.request);
          }
        })
      )
      .catch((err) => console.log("Error" + err))
  );
});
