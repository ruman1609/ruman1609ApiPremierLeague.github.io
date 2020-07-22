import "./idb.js";

const DB = idb.open("api-bola", 1, upDB => {
  const objStore = upDB.createObjectStore("teams", { keyPath: "id" });
  objStore.createIndex("name", "name", { unique: true });
  // penamaan id dan namenya berdasarkan key di API
});

const check = (id)=>{
  DB.then(db=>{
    const tr = db.transaction("teams", "readonly");
    const st = tr.objectStore("teams");
    st.get(id);
    return tr.complete;
  })
};

const saveFunc = tim => {
  DB.then(db => {
    const tr = db.transaction("teams", "readwrite");
    const st = tr.objectStore("teams");
    st.add(tim);
    return tr.complete;
  }).then(() => {
    M.toast({html: `Tim ${tim.shortName} berhasil ditambahkan di favorit`});
  }).catch(()=>{
    M.toast({html: `Tim ${tim.shortName} sudah ada di daftar favorit`});
  });
};

const deleteFunc = tim => {
  DB.then(db => {
    const tr = db.transaction("teams", "readwrite");
    const st = tr.objectStore("teams");
    st.delete(tim.id);
    history.back();
    return tr.complete;
  }).then(() => {
    M.toast({html: `Tim ${tim.shortName} berhasil dihapus dari favorit`});
  }).catch(()=>{
    M.toast({html: `Terjadi kesalahan`});
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    DB.then(db => {
      const tr = db.transaction("teams", "readonly");
      const st = tr.objectStore("teams");
      return st.getAll();
    }).then(tim => resolve(tim));
  });
}

const getById = id => {
  return new Promise((resolve, reject) => {
    DB.then(db => {
      const tr = db.transaction("teams", "readonly");
      const st = tr.objectStore("teams");
      console.log(typeof "61");
      console.log(typeof id);
      return st.get(parseInt(id));
    }).then(tim => resolve(tim));
  });
};

export { saveFunc, deleteFunc, getAll, getById, check };
