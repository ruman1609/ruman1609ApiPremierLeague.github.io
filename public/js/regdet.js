import {getStand, getTeam, getSaved, getSavedId} from "./data.js";  // karena dia satu folder mesti ada .
import { saveFunc, deleteFunc, getAll, getById } from"./db.js";

window.addEventListener("load", ()=>{
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("../sw.js")
    .then(()=>console.log("Register Berhasil"))
    .catch(error=>console.log(error));
  }else console.log("WEB Browser tidak mendukung Service Worker");
});

document.addEventListener("DOMContentLoaded", function(){
  const save = document.querySelector("#save");
  let item;
  const urlP = new URLSearchParams(window.location.search);
  if(urlP.get("saved")){
    save.innerHTML=`<i class="material-icons">delete</i>`;
    item = getSavedId();
    save.onclick = event=>{
      item.then(tim=>{
        deleteFunc(tim);
      })
    };
  }else{
    save.innerHTML = `<i class="material-icons">save</i>`
    item = getTeam();
    save.onclick = event=>{
      save.style.display = "none";
      item.then(tim=>{
        saveFunc(tim);
      });
    };
  }
});
