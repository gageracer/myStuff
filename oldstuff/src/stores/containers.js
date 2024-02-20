import { setList } from './localOps';
import {tmpCont,myContainers } from '../store';

import {get} from 'svelte/store';

// Editing any Container Function
export function editCont(name, type, items, id) {
    console.log("tmpContis: " + id);

    tmpCont.set({
        name: name,
        type: type,
        items: items,
        id: id
    });

    console.log(tmpCont);

}

export function deleteContainer(oId) {
    let x = get(myContainers).findIndex(x => x.id === oId);
    let tmpContainer = get(myContainers);
    tmpContainer.splice(x, 1);
    myContainers.update(() => tmpContainer.sort((a, b) => a.id - b.id));

    setList({ id: "", name: "", type: "", items: [["", false]] }, "tmpCont");
    setList(get(myContainers), "myStuff");
}

export function addContainer(nname, ntype, nitems, oId = "", ninteract= false) {
    // if (!nitems.every((cell) => Array.isArray(cell))) {
    //     let tmp = nitems.map( item => [item,true]);
    //     nitems = tmp;
    // }
    if (oId == "") {
        console.log("I am Creating new one");
        myContainers.update(existing => [...existing, {
            id: existing.length + Math.random(),
            name: nname,
            type: ntype,
            items: nitems,
            interact: false
        }]
        );
        setList({ id: "", name: "", type: "", items: [["", false]] }, "unSaved");
    }
    else {
        console.log("updating the container...");
        let x = get(myContainers).findIndex(x => x.id === oId);
        let tmpContainer = get(myContainers);
        tmpContainer.splice(x, 1, {
            id: oId,
            name: nname,
            type: ntype,
            items: nitems,
            interact: ninteract

        });
        myContainers.update(() => tmpContainer.sort((a, b) => a.id - b.id));

        setList({ id: "", name: "", type: "", items: [["", false]] }, "tmpCont");
    }

    setList(get(myContainers), "myStuff");

}

// export function interactSync() {
//     if (get(contInt)[0].id == undefined) {
//         const tmp = get(myContainers).map(e => [{
//             id: e.id, items: e.items.map(() => {
//                 return "aaa"
//             })
//         }]
//         );
//         console.log("Interact Sync-TMP: ", tmp);
//         contInt.update(
//             () => tmp
//         );
//     } else {
//         const tmp = get(myContainers).map(e => [{
//             id: e.id, items: e.items.map(() => {
//                 return "aaa"
//             })
//         }]
//         );
//         console.log("Interact Sync-TMP: ", tmp);
//         contInt.update(
//             () => tmp
//         );
//         // contInt.update(
//         //     tmp => [{ id: tmp.id, items: (tmp.items = true) }]
//         // );
//     }
//     const finaltmp = get(myContainers).map(e => [{
//         id: e.id,
//         name: e.name,
//         type: e.type,
//         items: [e.items.map(ele => [ele,
//             get(contInt).find(x => x.id == e.id)]
//         )]
//     }]//EN SON BURDA KALDIN
//     );
//     console.log("Interact Sync--- FINALTMP: ", finaltmp);
//     totalContainers.update(() => finaltmp);
//     setList(get(contInt), "contInt");
//     console.log("Interact Sync: ", get(contInt));
// }