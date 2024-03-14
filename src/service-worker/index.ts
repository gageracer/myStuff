///<refernce types="@sveltejs/kit"/>
///<reference lib="webworker"/>

declare let self: ServiceWorkerGlobalScope

import { build, files, version } from '$service-worker'

const CACHE = `dev-my-stuff-${version}`
const ASSETS = [...build, ...files]

// install
self.addEventListener("install", installEvent => {
  async function addFilesToCache() {
    const cache = await caches.open(CACHE)
    await cache.addAll(ASSETS)
  }
  installEvent.waitUntil(addFilesToCache())
})

// activate
self.addEventListener('activate', activateEvent => {
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key != CACHE) {
        await caches.delete(key)
      }
    }
  }
  activateEvent.waitUntil(deleteOldCaches())
})

// fetch
self.addEventListener("fetch", fetchEvent => {
  if (fetchEvent.request.method !== 'GET') return

  async function respond() {
    const url = new URL(fetchEvent.request.url)
    const cache = await caches.open(CACHE)

    //serve build files from cache
    if (ASSETS.includes(url.pathname)) {
      const cachedResponse = await cache.match(url.pathname)
      if (cachedResponse) {
        return cachedResponse
      }
    }

    // try the network first
    try {
      const response = await fetch(fetchEvent.request)
      const isNotExtension = url.protocol === 'http:'
      const isSuccess = response.status === 200

      if (isNotExtension && isSuccess) {
        cache.put(fetchEvent.request, response.clone())
      }
      return response
    } catch (err) {
      //fallbackto cache
      const cachedResponse = await cache.match(url.pathname)
      if (cachedResponse) {
        return cachedResponse
      }
    }
    return new Response('Not found', { status: 404 })
  }
  fetchEvent.respondWith(respond())
})
