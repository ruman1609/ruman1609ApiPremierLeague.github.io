import {getStand, getTeam, getSaved, getSavedId} from "../js/data.js";

document.addEventListener("DOMContentLoaded", ()=>{
  const side = document.querySelectorAll(".sidenav");
  M.Sidenav.init(side);
  const loadNav = ()=>{
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(this.readyState == 4){
        if(this.status !== 200) return;
        document.querySelectorAll(".topnav, .sidenav").forEach(elm=>{
          elm.innerHTML = xhr.responseText;
        });
        document.querySelectorAll(".sidenav a, .topnav a").forEach(elm=>{
          elm.addEventListener("click", event=>{
            const sideOpen = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideOpen).close();
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhr.open("GET", "/nav/nav.html", true);
    xhr.send();
  };
  loadNav();

  let page = window.location.hash.substr(1);
  const loadPage = page=>{
    if(page == "") page = "home";
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      const content = document.querySelector("#body-content");
      if(page === "home") getStand();
      else if(page === "saved") getSaved();

      if(this.status == 200) content.innerHTML = xhr.responseText;
      else if(this.status == 404) content.innerHTML = `<h1>Error 404 not found</h1>`;
      else content.innerHTML = `
        <div class="center">
          <h5>Tunggu sebentar ya...</h5>
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
            <div class="spinner-layer spinner-yellow">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
            <div class="spinner-layer spinner-red">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    };
    xhr.open("GET", `pages/${page}.html`, true);
    xhr.send();
  };
  loadPage(page);
});
