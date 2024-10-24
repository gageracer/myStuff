import { setContext, getContext } from 'svelte'
import { getList, setList } from '$lib/stores/localOps.svelte'
import type { stuff, tmpContOrunSaved } from './types'
import { onMount } from 'svelte'
import { goto } from '$app/navigation'
const MYSTUFF = 'MYSTUFF'

const emptyStuff: stuff = {
	id: '',
	name: '',
	type: '',
	items: [['', false]],
	interact: false,
	containerColor: '',
	isSum: true
}
class MyStuff {
	version: string = $state('')
	sortReverse: boolean = $state(false)
	stuff: stuff[] = $state([])
	tmpCont: stuff = $state(emptyStuff)
	unSaved: stuff = $state(emptyStuff)

	constructor() {
		const now = new Date()
		this.version = `0.${now.getUTCFullYear()}${now.getUTCMonth() + 1}${now.getUTCDate()}`
		onMount(() => {
			this.reLoad()
		})
	}
	// Grabs all local stored Stuff
	reLoad() {
		this.stuff = getList('myStuff')
		this.unSaved = getList('unSaved')
		this.tmpCont = getList('tmpCont')
		this.sortReverse = getList('sortReverse')
	}
	// Updates stuff to localstorage
	updateStuff() {
		setList(this.stuff, 'myStuff')
		setList(this.sortReverse, 'sortReverse')
	}
	// Updates tmpcont to localstorage
	tmpContLS() {
		setList(this.tmpCont, 'tmpCont')
	}
	// Updates unsaved to localstorage
	unSavedtLS() {
		setList(this.unSaved, 'unSaved')
	}
	// Editing any Container
	editCont(id: number) {
		$inspect(`tmpContis: ${id}`)
		if (id >= 0 && id <= this.stuff.length) {
			this.tmpCont = this.stuff[id]
		} else {
			goto('/')
		}
		$inspect('tmpCont updated to:', this.tmpCont)
	}

	// Deleting a Container
	deleteContainer(oId: string) {
		const x = this.stuff.findIndex((x) => x.id === oId)
		this.stuff.splice(x, 1)
		this.stuff.sort((a, b) => Number(a.id) - Number(b.id))
		this.updateStuff()
		this.clearTmpUnsaved('tmpCont')
	}
	clearTmpUnsaved(lsName: tmpContOrunSaved) {
		setList(emptyStuff, lsName)
		this.updateStuff()
		this.reLoad()
	}
	sortChange() {
		this.sortReverse = !this.sortReverse
		this.stuff.reverse()
		this.updateStuff()
	}
	// Adding or Updating a Container
	addContainer(_stuff: stuff) {
		if (_stuff.id === '') {
			$inspect('I am Creating new one')
			const newStuff: stuff = {
				id: (this.stuff.length + Math.random()).toString(),
				name: _stuff.name,
				type: _stuff.type,
				items: _stuff.items,
				interact: _stuff.interact,
				containerColor: _stuff.containerColor,
				isSum: _stuff.isSum
			}
			this.stuff.push(newStuff)
			this.clearTmpUnsaved('unSaved')
		} else {
			$inspect('updating the container...')
			const x = this.stuff.findIndex((x) => x.id === _stuff.id)
			this.stuff[x] = {
				id: _stuff.id,
				name: _stuff.name,
				type: _stuff.type,
				items: _stuff.items,
				interact: _stuff.interact,
				containerColor: _stuff.containerColor,
				isSum: _stuff.isSum
			}
			this.stuff.sort((a, b) => Number(a.id) - Number(b.id))
			this.clearTmpUnsaved('tmpCont')
		}
	}

	findStuff(_stuff: stuff) {
		return this.stuff.find((stuff) => stuff.id === _stuff.id)
	}
}
const STUFF_KEY = Symbol('MYSTUFF')
export function initMyStuff() {
	return setContext(STUFF_KEY, new MyStuff())
}

export function getMyStuff() {
	return getContext<ReturnType<typeof initMyStuff>>(STUFF_KEY)
}

// export const containerColors = $state([
//   ['nadePink', '#E9AFC3'],
//   ['lightBlue', '#BCD3F2'],
//   ['ashGray', '#C3D5C9'],
//   ['blizzardBlue', '#AEE6EA'],
//   ['babyPink', '#DFB9BA'],
//   ['columbiaBlue', '#CADCE2']
// ]);
