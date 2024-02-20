

// These are set and get functions for the whole Containers list
export function setList(item: string | boolean, lsName: string) {
  $inspect(lsName, " ----------------------->", item);
  localStorage.setItem(lsName, JSON.stringify(item));
}

export function getList(str: string) {
  $inspect("inside getTODO: " + str);
  if (localStorage.getItem(str)) return JSON.parse(localStorage.getItem(str)!);
  else {
    if (str === "myVersion") return "0";
    if (str === "sortReverse") return "false";
    if (str === "myStuff") return new Array;
    if (str === "totalContainers") return new Array;
    if (str === "unSaved") return { id: "", name: "", type: "", items: [["", false]] };
    if (str === "tmpCont") return { id: "", name: "", type: "", items: [["", false]] };
  }
}

// These are set and get functions for the last visited page
export function getLastPage(str: string) {
  // console.log("inside getTODO: "+ str);
  if (localStorage.getItem(str)) { return JSON.parse(localStorage.getItem(str)!); }
  else { return "main"; }
}

export function setLastPage(str: string) {
  console.log(str);
  localStorage.setItem("lastPage", JSON.stringify(str));
}
