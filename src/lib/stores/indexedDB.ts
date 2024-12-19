import type { stuff, temp } from "./types"

const DB_NAME = 'myStuffDB'
const STORE_NAME = 'myStuffStore'
const DB_VERSION = 1

async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
  })
}

export async function storeInIndexedDB(
  key: string,
  value: stuff | stuff[] | temp | string | boolean
): Promise<void> {
  try {

    // Convert Proxy objects to plain objects
    const plainValue = JSON.parse(JSON.stringify(value))

    const db = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)

      const request = store.put(plainValue, key)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error('Error storing data in IndexedDB:', error)
    throw error
  }
}

export async function fetchFromIndexedDB(key: string): Promise<stuff | stuff[] | temp | string | boolean> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)

      const request = store.get(key)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error('Error fetching data from IndexedDB:', error)
    throw error
  }
}

export async function removeFromIndexedDB(key: string): Promise<void> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)

      const request = store.delete(key)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error('Error removing data from IndexedDB:', error)
    throw error
  }
}

export async function clearIndexedDB(): Promise<void> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)

      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error('Error clearing IndexedDB:', error)
    throw error
  }
}
