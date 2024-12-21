import type { stuff, temp } from "./types"
import { storeInCache, fetchFromCache } from "./cachedstorage"
import { fetchFromLocalStorage, storeInLocalStorage } from "./localstorage"
import { fetchFromIndexedDB, storeInIndexedDB } from "./indexedDB"

// Define which items should use which storage
const INDEXED_DB_ITEMS = ['myStuff', 'totalContainers'];
const LOCAL_STORAGE_ITEMS = ['sortReverse', 'myVersion', 'unSaved', 'tmpCont'];

// You could also define default values as a constant
const DefaultValues = {
  myVersion: "0",
  sortReverse: "false",
  myStuff: [],
  totalContainers: [],
  unSaved: { id: "", name: "", type: "", items: [["", false]] },
  tmpCont: { id: "", name: "", type: "", items: [["", false]] }
} as const;


// These are set and get functions for the whole Containers list
export async function setList(
  item: stuff | stuff[] | temp | string | boolean,
  lsName: string,
) {
  if ($effect.tracking()) {
    $inspect(`${lsName} is set on Cache Store`)
  }

  if (INDEXED_DB_ITEMS.includes(lsName)) {
    // Store complex data in IndexedDB and Cache
    await storeInIndexedDB(lsName, item)
  } else if (LOCAL_STORAGE_ITEMS.includes(lsName)) {
    // Store in localStorage
    storeInLocalStorage(lsName, item)
  } else {
    console.warn(`cannot store this type of data, ${lsName}, anywhere`)
  }
  // Store in Cache API
  // await storeInCache(lsName, item)
  // Store in IndexedDB
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

  if (INDEXED_DB_ITEMS.includes(str)) {
    try {
      const indexedDBData = await fetchFromIndexedDB(str)
      if (indexedDBData) {
        return indexedDBData
      }
      // Fallback to cache if IndexedDB fails
      const cachedData = await fetchFromCache(str)
      if (cachedData) {
        await storeInIndexedDB(str, cachedData)
        return cachedData
      }

    } catch (error) {
      console.error("Error fetching from IndexedDB:", error)
    }
  }
  
  if(LOCAL_STORAGE_ITEMS.includes(str)){
    const storedItem = fetchFromLocalStorage(str)
    if(storedItem){
      return storedItem
    }
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
