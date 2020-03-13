import { writable,get, readable } from 'svelte/store';

export const mypage = writable("main");
export const myContainers = writable([]);
export const tmpCont = writable({id:"",name:"",type:"",items:[""]});
export const unSaved = writable({ id: "", name: "", type: "", items: [""] });
export const version = readable("0.309");

export function reLoad() {
    myContainers.set(getList("myStuff"));
    mypage.set(getLastPage("lastPage"));
    unSaved.set(getList("unSaved"));
    tmpCont.set(getList("tmpCont"));
}

// Editing any Container Function
export function editCont(name,type,items,id) {
    console.log("tmpContis: " + id);
    
    tmpCont.set({
        name: name,
        type: type,
        items: items,
        id: id
    });
    
    console.log(tmpCont);

}
export function deleteContainer(oId){
    let x = get(myContainers).findIndex(x => x.id === oId);
    let tmpContainer = get(myContainers);
    tmpContainer.splice(x, 1);
    myContainers.update(() => tmpContainer);

    setList({ id: "", name: "", type: "", items: [""] }, "tmpCont");
    setList(get(myContainers), "myStuff");
}

export function addContainer(nname, ntype, nitems, oId = ""){
    
    if(oId == ""){
        console.log("I am Creating new one");
        myContainers.update(existing => [...existing, {
            id: existing.length + Math.random(),
            name: nname,
            type: ntype,
            items: nitems
        }]

        );
        setList({ id: "", name: "", type: "", items: [""] }, "unSaved");
        
        
        
    }
    else{
        let x = get(myContainers).findIndex(x => x.id === oId);
        let tmpContainer = get(myContainers);
        tmpContainer.splice(x,1, {
            id: oId,
            name: nname,
            type: ntype,
            items: nitems});
        myContainers.update(() => tmpContainer);

        setList({ id: "", name: "", type: "", items: [""] }, "tmpCont");
    }
    
    setList(get(myContainers),"myStuff");
    
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
        if (str === "tmpCont") return { id: "", name: "", type: "", items: [""] };
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