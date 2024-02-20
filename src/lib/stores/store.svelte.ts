import { writable, readable, get } from 'svelte/store';
import { setContext, getContext } from 'svelte'
import { getList, setList, setLastPage, getLastPage } from '$lib/stores/localOps.svelte';
import type { stuff } from './types'

const MYSTUFF = 'MYSTUFF'
// export const version = readable('0.11100');
// export const sortReverse = writable(false);

class MyStuff {
  version = '0.190224'
  sortReverse: boolean = $state(false)
  stuff: [stuff] | [] = $state([])
  tmpCont: stuff = $state({ id: '', name: '', type: '', items: [['', false]] })
  unSaved: stuff = $state({ id: '', name: '', type: '', items: [['', false]] })
  constructor() {
    reLoad()
  }
  reLoad() {
    this.stuff = getList('myStuff')
    this.unSaved = getList('unSaved');
    this.tmpCont = getList('tmpCont');
    this.sortReverse = getList('sortReverse');
  }
  sortOption() {
    this.sortReverse = !this.sortReverse;
    $inspect('sortReverse is: ', this.sortReverse);
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

// export const mypage = writable('main');
// export const myContainers = writable([]);
// export const tmpCont = writable({ id: '', name: '', type: '', items: [['', false]] });
// export const unSaved = writable({ id: '', name: '', type: '', items: [['', false]] });
export const containerColors = $state([
  ['nadePink', '#E9AFC3'],
  ['lightBlue', '#BCD3F2'],
  ['ashGray', '#C3D5C9'],
  ['blizzardBlue', '#AEE6EA'],
  ['babyPink', '#DFB9BA'],
  ['columbiaBlue', '#CADCE2']
]);

// export function reLoad() {
//   // if(get(myContainers).length == 0){
//   //     verUpdate1(getList("myVersion"));
//   // }
//   myContainers.set(getList('myStuff'));
//   mypage.set(getLastPage('lastPage'));
//   unSaved.set(getList('unSaved'));
//   tmpCont.set(getList('tmpCont'));
//   sortReverse.set(getList('sortReverse'));
// }

// export function sortOption() {
//   sortReverse.set(!get(sortReverse));
//   $inspect('sortReverse is: ', get(sortReverse));
//   setList(get(sortReverse), 'sortReverse');
// }

function verUpdate1(localver: string) {
  // THIS IS WHERE YOU WILL MODIFY THE LOCAL STORAGE DATA MYSTUFF AND SAVE IT
  let localCont = getList('myStuff');
  if (localver < '0.513a' && localCont.length !== 0) {
    console.log('version is old ', localver, '... gonna do stuff');
    let temp;
    typeof localCont[0].items[0][1] !== 'boolean' &&
      (temp = localCont.map((ele) => [
        {
          id: ele.id,
          name: ele.name,
          type: ele.type,
          items: ele.items.map((x) => [x, false]),
          interact: false
        }
      ]));
    myContainers.update(() => temp);
    console.log('temp is---------------------------->', get(myContainers));
    setList(get(myContainers), 'myStuff');
    setList(get(version), 'myVersion');
    setList({ id: '', name: '', type: '', items: [['', false]] }, 'unSaved');
    setList({ id: '', name: '', type: '', items: [['', false]] }, 'tmpCont');
  } else {
    console.log('version is good!');
    setList(get(version), 'myVersion');
  }
}

// export function toggle(msg: string) {
//   setLastPage(msg);
//   if (msg === 'main') {
//     mypage.set('main');
//     reLoad();
//     return;
//   }
//   if (msg === 'newlist') {
//     mypage.set('newlist');
//     return;
//   }
//   if (msg === 'editlist') {
//     mypage.set('editlist');
//     return;
//   }

//   mypage.set('newlist');
// }
