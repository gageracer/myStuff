import type { stuff, temp } from "./types"
import { storeInCache, fetchFromCache } from "./cachedstorage"
import { fetchFromLocalStorage, storeInLocalStorage } from "./localstorage"
import { fetchFromIndexedDB, storeInIndexedDB } from "./indexedDB"


// These are set and get functions for the whole Containers list
export async function setList(
  item: stuff | stuff[] | temp | string | boolean,
  lsName: string,
) {
  if ($effect.tracking()) {
    $inspect(`${lsName} is set on Cache Store`)
  }
  // Store in localStorage
  storeInLocalStorage(lsName, item)

  // Store in Cache API
  await storeInCache(lsName, item)

  // Store in IndexedDB
  await storeInIndexedDB(lsName, item)
}

export async function getList(str: string) {
  if ($effect.tracking()) {
    $inspect(`getList getting: ${str}`)
  }
  // First, check if the IndexedDB has the data
  try {
    const indexedDBData = await fetchFromIndexedDB(str)
    if (indexedDBData) {
      //console.log("indexedDBData", str, indexedDBData)
      await storeInCache(str, indexedDBData)
      storeInLocalStorage(str, indexedDBData)
      return indexedDBData
    }
  } catch (error) {
    console.error('Error fetching from IndexedDB:', error)
  }

  // Then, check if the cache has the data
  const cachedData = await fetchFromCache(str)
  if (cachedData) {
    //console.log("cachedData", str, cachedData)
    storeInLocalStorage(str, cachedData)
    await storeInIndexedDB(str, cachedData)
    return cachedData
  }


  // If cache is empty, check localstorage
  const storedItem = fetchFromLocalStorage(str)
  if (storedItem) {
    await storeInCache(str, storedItem)
    await storeInIndexedDB(str, storedItem)
    return storedItem
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
