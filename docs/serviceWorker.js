const staticMyStuff = "dev-my-stuff"
const assets = [
    "/",
    "/index.html",
    "/bundle.js",
    "/bundle.js.map",
    "/global.css",
    "/bundle.css",
    "/bundle.css/map",
    "/android-chrome-192x192.png",
    "/android-chrome-512x512.png",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticMyStuff).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})