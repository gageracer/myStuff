import type { stuff, temp } from "./types"

// These are set and get functions for the whole Containers list
export function setList(
	item: stuff | stuff[] | temp | string | boolean,
	lsName: string,
) {
	if ($effect.tracking()) {
		$inspect(`${lsName} is set on LocalStore`)
	}
	window.localStorage.setItem(lsName, JSON.stringify(item))
}

export function getList(str: string) {
	if ($effect.tracking()) {
		$inspect(`getList getting: ${str}`)
	}
	if (window.localStorage.getItem(str)) {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		return JSON.parse(window.localStorage.getItem(str)!)
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
