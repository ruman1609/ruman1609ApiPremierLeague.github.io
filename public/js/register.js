window.addEventListener("load", ()=>{
  if("serviceWorker" in navigator){
    // service worker
    navigator.serviceWorker.register("../sw.js")
    .then(()=>console.log("Register Berhasil"))
    .catch(error=>console.log(error));
    // ---

    const urlBase64ToUint8Array = base64=>{
      const pad = "=".repeat((4 - base64.length % 4) % 4);
      const b64 = (base64 + pad).replace(/-/g, "+").replace(/_/g, "/");
      const rawData = window.atob(b64);
      const output = new Uint8Array(rawData.length);
      for (let i = 0 ;i<rawData.length;++i) output[i] = rawData.charCodeAt(i);
      return output;
    }

    // notifikasi
    Notification.requestPermission().then(result=>{
      if(result === "denied") return;
      else if(result === "default") return;
      if("PushManager" in window){
        navigator.serviceWorker.getRegistration().then(regis=>{
          regis.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BAEJNLNLiu4u300APGjF7JimnEwRg7f3M-9UBR3q_ONAhtUepoyKnyHC1CT_vjbPy9kt_O4j-EdWrkjt6vA38yk")
          }).then(subs=>{
            console.log("endpoint: ", subs.endpoint);
            console.log("p256dh key: ", btoa(String.fromCharCode.apply(
              null, new Uint8Array(subs.getKey("p256dh"))
            )));
            console.log("auth key: ", btoa(String.fromCharCode.apply(
              null, new Uint8Array(subs.getKey("auth"))
            )));
          }).catch(error=>console.log(error));
        });
      }
    });
  }else console.log("WEB Browser tidak mendukung Service Worker");
});
