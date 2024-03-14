export type stuff = {
	id: string
	name: string
	type: string
	items: [string, boolean][]
	interact: boolean
	containerColor: string
	isSum: boolean
}
export type temp = { name: string; type: string; items: [string, boolean][] }

export type tmpContOrunSaved = 'unSaved' | 'tmpCont'
