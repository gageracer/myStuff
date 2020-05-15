import { writable, readable, get } from 'svelte/store';
import {getList, setList, setLastPage, getLastPage} from './stores/localOps';

export const version = readable("0.514d");

export const mypage = writable("main");
export const myContainers = writable([]);
export const tmpCont = writable({ id: "", name: "", type: "", items: [["", false]]});
export const unSaved = writable({ id: "", name: "", type: "", items: [["", false]]});

export function reLoad() {
    if(get(myContainers).length == 0){
        verUpdate1(getList("myVersion"));
    }
    myContainers.set(getList("myStuff"));
    mypage.set(getLastPage("lastPage"));
    unSaved.set(getList("unSaved"));
    tmpCont.set(getList("tmpCont"));

}

function verUpdate1(localver) {
    // THIS IS WHERE YOU WILL MODIFY THE LOCAL STORAGE DATA MYSTUFF AND SAVE IT
    let localCont = getList("myStuff");
    if (localver < "0.513a" && localCont.length !== 0 ) {
        console.log("version is old ", localver, "... gonna do stuff");
        let temp;
        typeof (localCont[0].items[0][1]) !== "boolean" && (
            
            temp = localCont.map(ele => [{
            id: ele.id,
            name: ele.name,
            type: ele.type,
            items: ele.items.map(x => [x, false]),
            interact: false
            }]
            )
        )
        myContainers.update(() => temp);
        console.log("temp is---------------------------->",get(myContainers));
        setList(get(myContainers), "myStuff");
        setList(get(version), "myVersion");
        setList({ id: "", name: "", type: "", items: [["", false]] },"unSaved");
        setList({ id: "", name: "", type: "", items: [["", false]] },"tmpCont");
    }
    else {
        console.log("version is good!");
        setList(get(version), "myVersion");
    }

}

export function toggle(msg) {
    setLastPage(msg);
    if (msg === "main") {
        mypage.set("main");
        reLoad();
        return;
    }
    if (msg === "newlist") {
        mypage.set("newlist");
        return;
    }
    if (msg === "editlist") {
        mypage.set("editlist");
        return;
    }


    mypage.set("newlist");
}