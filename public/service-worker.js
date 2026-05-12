/* fonebazar service worker
   - Stale-while-revalidate for HTML / navigation requests.
   - Cache-first for static assets (JS/CSS/fonts/images).
   - No API routes to worry about; the site is fully static.
   Bump CACHE_VERSION to invalidate every cache on deploy. */

const CACHE_VERSION = "fb-v1";
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

const ASSET_EXTENSIONS = /\.(?:js|css|woff2?|ttf|otf|svg|glb|gltf|bin)$/i;
const IMAGE_EXTENSIONS = /\.(?:png|jpg|jpeg|webp|avif|gif|ico)$/i;
const HTML_DEST = /^(document|iframe)$/;

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => !key.startsWith(CACHE_VERSION))
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isImageCDN =
    url.hostname.includes("unsplash.com") ||
    url.hostname.includes("pexels.com");
  if (url.origin !== self.location.origin && !isImageCDN) {
    return;
  }

  // HTML navigation — stale-while-revalidate
  if (request.mode === "navigate" || HTML_DEST.test(request.destination)) {
    event.respondWith(staleWhileRevalidate(request, PAGE_CACHE));
    return;
  }

  // Static assets — cache-first
  if (ASSET_EXTENSIONS.test(url.pathname)) {
    event.respondWith(cacheFirst(request, ASSET_CACHE));
    return;
  }

  // Images (local + Unsplash + Pexels CDNs) — cache-first with network fallback
  if (IMAGE_EXTENSIONS.test(url.pathname) || isImageCDN) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const fresh = await fetch(request);
    if (fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch (error) {
    return cached || Response.error();
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  return cached || (await networkPromise) || Response.error();
}

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
