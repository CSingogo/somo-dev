// Service worker template. integrations/pwa.mjs writes it to dist/sw.js after the build,
// replacing the two placeholders below with the build hash and the list of files to precache.
const VERSION = "__VERSION__";
const PRECACHE = /* PRECACHE */ [];
const CACHE = `somo-${VERSION}`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // Pages: network first so deploys show up straight away; cache when offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) caches.open(CACHE).then((c) => c.put(request, res.clone()));
          return res;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE);
          return (
            (await cache.match(request, { ignoreSearch: true })) ||
            (await cache.match(url.pathname.replace(/\/$/, "") || "/")) ||
            (await cache.match("/404"))
          );
        }),
    );
    return;
  }

  // Assets: cache first; anything new is cached as it's fetched.
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const hit = await cache.match(request);
      if (hit) return hit;
      try {
        const res = await fetch(request);
        if (res.ok) cache.put(request, res.clone());
        return res;
      } catch (err) {
        const stale = await cache.match(request, { ignoreSearch: true });
        if (stale) return stale;
        throw err;
      }
    }),
  );
});
