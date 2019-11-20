import { writable,get } from 'svelte/store';

export const mypage = writable("main");
export const myContainers = writable([]);


export function reLoad() {
    myContainers.set(getList("myStuff"));
}

export function addContainer(nname,ntype,nitems){
    myContainers.update(existing => [...existing, {
        id: existing.length + Math.random(),
        name: nname,
        type: ntype,
        items: nitems
    }]

    );
    setList(get(myContainers));
}

export function toggle(msg) {
    if (msg === "main") {
        mypage.set("main");
        reLoad();
        return;
    }
    if (msg === "newlist") {
        mypage.set("newlist");
        return;
    }


    mypage.set("newlist");
}

export function setList(myStuff) {
    console.log(myStuff);
    localStorage.setItem("myStuff", JSON.stringify(myStuff));
}

export function getList(str) {
    // console.log("inside getTODO: "+ str);
    if (localStorage.getItem(str)) { return JSON.parse(localStorage.getItem(str)); }
    else { return new Array; }
}