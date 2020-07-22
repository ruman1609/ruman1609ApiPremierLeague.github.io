import { saveFunc, deleteFunc, getAll, getById, check } from"./db.js";

const base = "https://api.football-data.org/v2/"
const stand = "competitions/2021/standings?standingType=TOTAL";
const team = "teams/";

const options = {
    "method": "GET",
    "headers":{
        "X-Auth-Token": "1e9fc9c8861a43e8ba2ee1cc2ae95593",
    },
};
// fetch options lihat di sini
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch

const status = response=>{
  if(response.status !== 200)
    return Promise.reject(new Error(response.statusText));
  else return Promise.resolve(response);
};
const json = response=>{
  return response.json();
};
const error = errors=>{
  console.log(errors);
};

const isiStand = datas=>{
  let isi = "";
  datas.standings[0].table.forEach(dat => {
    dat.team.crestUrl = dat.team.crestUrl.replace(/^http:\/\//i, "https://");
    isi += `
    <div class="card center">
      <div class="card-image">
        <img src="${dat.team.crestUrl}" alt="Club Badge" class="gambar">
      </div>
      <div class="card-content">
        <h1 class="card-title judul-kartu">#${dat.position} ${dat.team.name}</h1>
        <h5>Points: ${dat.points}</h5>
        <div class="divider"></div>
        <div class="row">
          <div class="col s4">
            <h6>W<br>${dat.won}</h6>
          </div>
          <div class="col s4">
            <h6>L<br>${dat.lost}</h6>
          </div>
          <div class="col s4">
            <h6>D<br>${dat.draw}</h6>
          </div>
        </div>
        <h5>Goal Difference: ${dat.goalDifference} times</h5>
        <div class="divider"></div>
        <div class="row">
          <div class="col s6">
            <h6>Goals For<br>${dat.goalsFor}</h6>
          </div>
          <div class="col s6">
            <h6>Goals Against<br>${dat.goalsAgainst}</h6>
          </div>
        </div>
      </div>
        <div class="card-action">
          <a href="detail.html?id=${dat.team.id}" class="waves-effect">
            About this Team
          </a>
        </div>
    </div>
    `;
  });
  document.querySelector("#standings").innerHTML = isi;
};
const getStand = () => {
  if("caches" in window){
    caches.match(base+stand).then(response=>{
      if(response){
        response.json().then(data=>{
          isiStand(data);
        });
      }
    });
  }
  fetch(base + stand, options).then(status).then(json)
  .then(data=>{
    isiStand(data);
  }).catch(error);
};

const isiTeam = data=>{
  let isi;
  data.email = data.email == null ? "-" : data.email;
  data.address = data.address == null ? "-" : data.address;
  data.phone = data.phone == null ? "-" : data.phone;
  data.venue = data.venue == null ? "-" : data.venue;
  data.crestUrl = data.crestUrl.replace(/^http:\/\//, "https://")
  isi = `
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-image">
            <img src="${data.crestUrl}" alt="Club Badge" class="gambar-det">
          </div>
          <div class="card-content">
            <h6 class="center">Founded: ${data.founded}</h6>
            <div class="center">
              <h1 class="card-title judul-kartu-det">${data.name}</h1>
              <h4>${data.shortName} (${data.tla})</h4>
            </div>
            <table class="centered">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Desciption</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td ><i class="material-icons">location_on</i></td>
                  <td>${data.address}</td>
                </tr>
                <tr>
                  <td ><i class="material-icons">phone</i></td>
                  <td>${data.phone}</td>
                </tr>
                <tr>
                  <td ><i class="material-icons">email</i></td>
                  <td>${data.email}</td>
                </tr>
                <tr>
                  <td ><i><strong>Venue</strong></i></td>
                  <td>${data.venue}</td>
                </tr>
                <tr>
                  <td ><i><strong>Club Colors</strong></i></td>
                  <td>${data.clubColors}</td>
                </tr>
                <tr>
                  <td colspan="2" class="link-table"><a href="${data.website}" class="waves-effect waves-orange">Click here to go to website</a></td>
                </tr>
              </tbody>
            </table>
            <h4>Liga yang diikuti ${data.shortName}</h4>
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Kode</th>
                </tr>
              </thead>
              <tbody id="league">
              </tbody>
            </table>
            <h4>Squad di ${data.shortName}</h4>
            <table class="responsive-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Role</th>
                  <th>Position</th>
                  <th>Nationality</th>
                </tr>
              </thead>
              <tbody id="squad">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
  document.title = data.name;
  document.querySelector("#body-content").innerHTML = isi;
  isi = "";
  data.activeCompetitions.forEach(list=>{
    isi += `
    <tr>
      <td>${list.name}</td>
      <td>${list.code}</td>
    </tr>
    `;
  });
  document.querySelector("#league").innerHTML += isi;
  isi = "";
  data.squad.forEach(list=>{
    list.position = list.position == null ? "-" : list.position;
    isi += `
    <tr>
      <td>${list.name}</td>
      <td>${list.role}</td>
      <td>${list.position}</td>
      <td>${list.nationality}</td>
    </tr>
    `;
  });
  document.querySelector("#squad").innerHTML += isi;
}

const getTeam = ()=>{
  return new Promise((resolve, reject)=>{
    const urlP = new URLSearchParams(window.location.search);
    const id = urlP.get("id");
    if("caches" in window){
      caches.match(base + team + id).then(response=>{
        if(response){
          response.json().then(data=>{
            isiTeam(data);
            resolve(data);
          });
        }
      });
    }
    fetch(base + team + id, options).then(status).then(json)
    .then(data=>{
      isiTeam(data);
      resolve(data);
    }).catch(error);
  });
};

const getSaved = ()=>{
  getAll().then(tim=>{
    console.log(tim.length);
    if(tim.length == 0){
      let isi = `
        <div class="card-panel blue lighten-3 center" style="margin-top:15px;">
          <span class="blue-text text-darken-4">Masih tidak ada tim yang difavoritkan</span>
        </div>
      `;
      document.querySelector("#body-content").innerHTML = isi;
    }else{
      let isi = "";
      tim.forEach(dat=>{
        isi += `
        <div class="card">
          <div class="card-image">
            <img src="${dat.crestUrl}" alt="Club Badge" class="gambar">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <h1 class="card-title judul-kartu">${dat.shortName}</h1>
              <h5>Founded: ${dat.founded}</h5>
              <h5>Venue: ${dat.venue}</h5>
            </div>
              <div class="card-action">
                <a href="detail.html?id=${dat.id}&saved=true" class="waves-effect">
                  Details
                </a>
              </div>
          </div>
        </div>
        `;
      });
      document.querySelector("#standings").innerHTML = isi;
    }
  });
};

const getSavedId = ()=>{
  return new Promise((resolve, reject)=>{
    const urlP = new URLSearchParams(window.location.search);
    const id = urlP.get("id");
    getById(id).then(tim=>{
      isiTeam(tim);
      resolve(tim);
    });
  })
};

export {getStand, getTeam, getSaved, getSavedId};
