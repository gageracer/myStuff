import type { stuff, temp } from "./types"

async function openCache() {
  return await caches.open("my-cache")
}

export async function storeInCache(lsName: string, item: stuff | stuff[] | temp | string | boolean) {
  const cache = await openCache()

  const response = new Response(JSON.stringify(item), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  cache.put(new Request(lsName), response)
}

export async function fetchFromCache(lsName: string) {
  const cache = await openCache()
  const cachedResponse = await cache.match(new Request(lsName))

  if (cachedResponse) {
    return await cachedResponse.json()
  }
}
