import { setContext, getContext } from 'svelte'
import { getList, setList } from '$lib/stores/localOps.svelte';
import type { stuff } from './types'

const MYSTUFF = 'MYSTUFF'

class MyStuff {
  version = '0.190224'
  sortReverse: boolean = $state(false)
  stuff: stuff[] = $state([])
  tmpCont: stuff = $state({ id: '', name: '', type: '', items: [['', false]], interact: false })
  unSaved: stuff = $state({ id: '', name: '', type: '', items: [['', false]], interact: false })
  constructor() {
    this.reLoad()
  }
  // Grabs all local stored Stuff
  reLoad() {
    this.stuff = getList('myStuff')
    this.unSaved = getList('unSaved');
    this.tmpCont = getList('tmpCont');
    this.sortReverse = getList('sortReverse');
  }
  // Editing any Container
  editCont(stuff: stuff) {
    $inspect('tmpContis: ' + stuff.id);
    this.tmpCont = stuff
    $inspect('tmpCont updated to:', this.tmpCont);
  }

  // Deleting a Container
  deleteContainer(oId: string) {
    let x = this.stuff.findIndex((x) => x.id === oId);
    this.stuff.splice(x, 1);
    this.stuff.sort((a, b) => Number(a.id) - Number(b.id));
    setList({ id: '', name: '', type: '', items: [['', false]], interact: false }, 'tmpCont');
    setList(this.stuff, 'myStuff');
  }
  // Adding or Updating a Container
  addContainer(nname: string, ntype: string, nitems: [[string, false]], oId = '') {
    if (oId == '') {
      $inspect('I am Creating new one');
      let newStuff: stuff = {
        id: (this.stuff.length + Math.random()).toString(),
        name: nname,
        type: ntype,
        items: nitems,
        interact: false
      }
      this.stuff.push(newStuff)
      setList({ id: '', name: '', type: '', items: [['', false]], interact: false }, 'unSaved');
    } else {
      $inspect('updating the container...');
      let x = this.stuff.findIndex((x) => x.id === oId);
      this.stuff[x] = {
        id: oId,
        name: nname,
        type: ntype,
        items: nitems,
        interact: false
      };
      this.stuff.sort((a, b) => Number(a.id) - Number(b.id));
      setList({ id: '', name: '', type: '', items: [['', false]], interact: false }, 'tmpCont');
    }
    setList(this.stuff, 'myStuff');
  }

  sortOption() {
    this.sortReverse = !this.sortReverse;
    $inspect('sortReverse is: ', this.sortReverse);
    this.stuff.reverse()
    setList(this.sortReverse, 'sortReverse');
  }
}

export function setMyStuff() {
  const myStuff = new MyStuff()
  setContext(MYSTUFF, myStuff)
  return myStuff
}

export function getMyStuff() {
  return getContext(MYSTUFF)
}

// export const containerColors = $state([
//   ['nadePink', '#E9AFC3'],
//   ['lightBlue', '#BCD3F2'],
//   ['ashGray', '#C3D5C9'],
//   ['blizzardBlue', '#AEE6EA'],
//   ['babyPink', '#DFB9BA'],
//   ['columbiaBlue', '#CADCE2']
// ]);
