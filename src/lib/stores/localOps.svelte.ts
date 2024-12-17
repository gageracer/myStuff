import type { stuff, temp } from "./types"

async function openCache() {
  return await caches.open("my-cache")
}

async function storeInCache(lsName: string, item: stuff | stuff[] | temp | string | boolean) {
  const cache = await openCache()

  const response = new Response(JSON.stringify(item), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  cache.put(new Request(lsName), response)
}

async function fetchFromCache(lsName: string) {
  const cache = await openCache()
  const cachedResponse = await cache.match(new Request(lsName))

  if (cachedResponse) {
    return await cachedResponse.json()
  }
}

// These are set and get functions for the whole Containers list
export async function setList(
  item: stuff | stuff[] | temp | string | boolean,
  lsName: string,
) {
  if ($effect.tracking()) {
    $inspect(`${lsName} is set on Cache Store`)
  }
  //Store in localStorage
  //window.localStorage.setItem(lsName, JSON.stringify(item))

  //Store in Cache API
  await storeInCache(lsName, item)
}

export async function getList(str: string) {
  if ($effect.tracking()) {
    $inspect(`getList getting: ${str}`)
  }

  // First, check if the cache has the data
  const cachedData = await fetchFromCache(str)
  if (cachedData) {
    console.log("cachedData", str, cachedData)
    window.localStorage.setItem(str, JSON.stringify(cachedData))
    return cachedData
  }

  // If cache is empty, check localstorage
  const storedItem = window.localStorage.getItem(str)
  if (storedItem) {
    await storeInCache(str, JSON.parse(storedItem))
    return JSON.parse(storedItem)
  }

  if (str === "myVersion") return "0"
  if (str === "sortReverse") return "false"
  if (str === "myStuff") return new Array()
  if (str === "totalContainers") return new Array()
  if (str === "unSaved")
    return { id: "", name: "", type: "", items: [["", false]] }
  if (str === "tmpCont")
    return { id: "", name: "", type: "", items: [["", false]] }
}
