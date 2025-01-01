import { setContext, getContext } from "svelte"
import { getList, setList } from "$lib/stores/localOps.svelte"
import type { stuff, tmpContOrunSaved } from "./types"
import { onMount } from "svelte"
import { goto } from "$app/navigation"
import { browser } from "$app/environment"
const MYSTUFF = "MYSTUFF"

const emptyStuff: stuff = {
  id: "",
  name: "",
  type: "",
  items: [["", false]],
  interact: false,
  containerColor: "",
  isSum: true,
  isRoot: true
}
class MyStuff {
  version: string = $state("")
  sortReverse: boolean = $state(false)
  stuff: stuff[] = $state([])
  tmpCont: stuff = $state(emptyStuff)
  unSaved: stuff = $state(emptyStuff)
  firstTime: boolean = $state(false)

  constructor() {
    const now = new Date()
    this.version = `0.${now.getUTCFullYear()}${now.getUTCMonth() + 1}${now.getUTCDate()}`
    onMount(() => {
      this.reLoad()
    })
  }
  // Grabs all local stored Stuff
  async reLoad() {
    this.stuff = await getList("myStuff")
    this.unSaved = await getList("unSaved")
    this.tmpCont = await getList("tmpCont")
    this.sortReverse = await getList("sortReverse")
    if (this.stuff.length === 0) {
      this.firstTime = true
    }
  }
  // Updates stuff to localstorage
  async updateStuff() {
    await setList(this.stuff, "myStuff")
    await setList(this.sortReverse, "sortReverse")
  }
  // Updates tmpcont to localstorage
  async tmpContLS() {
    await setList(this.tmpCont, "tmpCont")
  }
  // Updates unsaved to localstorage
  async unSavedtLS() {
    await setList(this.unSaved, "unSaved")
  }
  // Editing any Container
  editCont(id: number) {
    if ($effect.tracking()) {
      $inspect(`tmpCont is: ${id}`)
    }
    if (id >= 0 && id <= this.stuff.length) {
      this.tmpCont = this.stuff[id]
    } else {
      goto("/")
    }
    if ($effect.tracking()) {
      $inspect("tmpCont updated to:", this.tmpCont)
    }
  }

  // Deleting a Container
  async deleteContainer(oId: string) {
    const x = this.stuff.findIndex((x) => x.id === oId)
    this.stuff.splice(x, 1)
    this.stuff.sort((a, b) => Number(a.id) - Number(b.id))
    this.updateStuff()
    this.clearTmpUnsaved("tmpCont")
  }
  async clearTmpUnsaved(lsName: tmpContOrunSaved) {
    await setList(emptyStuff, lsName)
    await this.updateStuff()
    await this.reLoad()
  }
  async sortChange() {
    this.sortReverse = !this.sortReverse
    this.stuff.reverse()
    await this.updateStuff()
  }
  // Adding or Updating a Container
  async addContainer(_stuff: stuff) {
    if (_stuff.id === "") {
      if ($effect.tracking()) {
        $inspect("I am Creating new one")
      }
      const newStuff: stuff = {
        id: (this.stuff.length + Math.random()).toString(),
        name: _stuff.name,
        type: _stuff.type,
        items: _stuff.items,
        interact: _stuff.interact,
        containerColor: _stuff.containerColor,
        isSum: _stuff.isSum,
      }
      this.stuff.push(newStuff)
      await this.clearTmpUnsaved("unSaved")
    } else {
      if ($effect.tracking()) {
        $inspect("updating the container...")
      }
      const x = this.stuff.findIndex((x) => x.id === _stuff.id)
      this.stuff[x] = {
        id: _stuff.id,
        name: _stuff.name,
        type: _stuff.type,
        items: _stuff.items,
        interact: _stuff.interact,
        containerColor: _stuff.containerColor,
        isSum: _stuff.isSum,
      }
      this.stuff.sort((a, b) => Number(a.id) - Number(b.id))
      await this.clearTmpUnsaved("tmpCont")
    }
  }

  findStuff(_stuff: stuff) {
    return this.stuff.find((stuff) => stuff.id === _stuff.id)
  }
}

const STUFF_KEY = Symbol(MYSTUFF)

export function initMyStuff() {
  browser && setContext(STUFF_KEY, new MyStuff())
}

export function getMyStuff() {
  return browser ? getContext<MyStuff>(STUFF_KEY) : new MyStuff()
}

// export const containerColors = $state([
//   ['nadePink', '#E9AFC3'],
//   ['lightBlue', '#BCD3F2'],
//   ['ashGray', '#C3D5C9'],
//   ['blizzardBlue', '#AEE6EA'],
//   ['babyPink', '#DFB9BA'],
//   ['columbiaBlue', '#CADCE2']
// ]);
