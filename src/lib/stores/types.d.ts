export type stuff = {
  id: string
  name: string
  type: string
  items: [itemTypes, boolean][]
  interact: boolean
  containerColor: string
  isSum: boolean
  isRoot?: true
  folders?: folder
}

export type itemTypes = string | number | folder
export type folder = stuff[]
export type temp = { name: string; type: string; items: [string, boolean][] }

export type tmpContOrunSaved = 'unSaved' | 'tmpCont'
