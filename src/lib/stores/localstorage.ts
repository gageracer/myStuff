import type { stuff, temp } from "./types"

// These are set and get functions for the Local Storage
export function storeInLocalStorage(
  lsName: string,
  item: stuff | stuff[] | temp | string | boolean,

) {
  window.localStorage.setItem(lsName, JSON.stringify(item))
}

export function fetchFromLocalStorage(str: string) {
  // If cache is empty, check localstorage
  const storedItem = window.localStorage.getItem(str)
  if (storedItem) {
    return JSON.parse(storedItem)
  }
}
