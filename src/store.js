import { writable,get } from 'svelte/store';

export const mypage = writable("main");
export const myContainers = writable([]);
export const tmpCont = writable({id:"",name:"",type:"",items:[]});
export const unSaved = writable({ id: "", name: "", type: "", items: [""] });

export function reLoad() {
    myContainers.set(getList("myStuff"));
    mypage.set(getLastPage("lastPage"));
    unSaved.set(getList("unSaved"));
}

// Editing any Container Function
export function editCont(name,type,items,id) {
    console.log("tmpContis: " + name);
    $: console.log(tmpCont);
    tmpCont.set({
        name: name,
        type: type,
        items: items,
        id: id
    });


}

export function addContainer(nname,ntype,nitems){
    myContainers.update(existing => [...existing, {
        id: existing.length + Math.random(),
        name: nname,
        type: ntype,
        items: nitems
    }]

    );
    setList(get(myContainers),"myStuff");
    setList({ id: "", name: "", type: "", items: [""] },"unSaved");
}

export function toggle(msg) {
    if (msg === "main") {
        mypage.set("main");
        setLastPage(msg);
        reLoad();
        return;
    }
    if (msg === "newlist") {
        mypage.set("newlist");
        setLastPage(msg);
        return;
    }
    if (msg === "editlist") {
        mypage.set("editlist");
        setLastPage(msg);
        return;
    }


    mypage.set("newlist");
    setLastPage(msg);
}

// These are set and get functions for the whole Containers list
export function setList(item,lsName) {
    console.log(item);
    localStorage.setItem(lsName, JSON.stringify(item));
}

export function getList(str) {
    // console.log("inside getTODO: "+ str);
    if (localStorage.getItem(str)) { return JSON.parse(localStorage.getItem(str)); }
    else { 
        if(str === "myStuff") return new Array;
        if(str === "unSaved") return { id: "", name: "", type: "", items: [""] };
        }
}


// These are set and get functions for the last visited page
export function getLastPage(str) {
    // console.log("inside getTODO: "+ str);
    if (localStorage.getItem(str)) { return JSON.parse(localStorage.getItem(str)); }
    else { return "main"; }
}

export function setLastPage(str) {
    console.log(str);
    localStorage.setItem("lastPage", JSON.stringify(str));
}