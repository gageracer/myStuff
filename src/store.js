import { writable,get, readable } from 'svelte/store';

export const version = readable("0.505a");

export const mypage = writable("main");
export const myContainers = writable([]);
export const tmpCont = writable({id:"",name:"",type:"",items:[""]});
export const unSaved = writable({ id: "", name: "", type: "", items: [""] });
export const contInt = writable( [{id: "", items: []}] );

export function reLoad() {
    
    myContainers.set(getList("myStuff"));
    mypage.set(getLastPage("lastPage"));
    unSaved.set(getList("unSaved"));
    tmpCont.set(getList("tmpCont"));
    contInt.set(getList("contInt"));
    verUpdate(getList("myVersion"));
    //interactSync();
    
}

export function interactSync(){
    if(get(contInt)[0].id == undefined){
        const tmp = get(myContainers).map(e => [{id: e.id, items: e.items.map(() => {
            return "aaa"})}]
        );
        console.log("Interact Sync-TMP: ", tmp);
        contInt.update(
            () => tmp
        );
    }else{
        const tmp = get(myContainers).map(e => [{
            id: e.id, items: e.items.map(() => {
                return "aaa"
            })
        }]
        );
        console.log("Interact Sync-TMP: ", tmp);
        contInt.update(
            () => tmp
        );
        // contInt.update(
        //     tmp => [{ id: tmp.id, items: (tmp.items = true) }]
        // );
    }
    const finaltmp = get(myContainers).map(e => [{
        id: e.id, 
        name: e.name, 
        type: e.type,
        items: [e.items.map( ele => [ele,
            get(contInt).find( x => x.id == e.id)]
        )]
        }]//EN SON BURDA KALDIN
    );
    console.log("Interact Sync--- FINALTMP: ", finaltmp);
    totalContainers.update(() => finaltmp);
    setList(get(contInt),"contInt");
    console.log("Interact Sync: ", get(contInt));
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
    // if (!nitems.every((cell) => Array.isArray(cell))) {
    //     let tmp = nitems.map( item => [item,true]);
    //     nitems = tmp;
    // }
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
    // console.log(lsName," ----------------------->",item);
    localStorage.setItem(lsName, JSON.stringify(item));
}

function verUpdate(localver){
    if(localver < get(version)){
        console.log("version is old ",localver,"... gonna do stuff");
    }
    else{
        console.log("version is good!");
        setList(get(version), "myVersion");
    }
    
}
export function getList(str) {
    // console.log("inside getTODO: "+ str);
    if (localStorage.getItem(str))  return JSON.parse(localStorage.getItem(str)); 
    else { 
        if(str === "myVersion") return "0";
        if(str === "myStuff") return new Array;
        if(str === "totalContainers") return new Array;
        if(str === "unSaved") return { id: "", name: "", type: "", items: [""] };
        if(str === "tmpCont") return { id: "", name: "", type: "", items: [""] };
        if(str === "contInt") return [{ id: "", items: [] }];
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