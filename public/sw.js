importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js")
// import script workbox

workbox.precaching.precacheAndRoute([
  { url: "/index.html", revision: "2" },
  { url: "/app.js", revision: "1" },
  { url: "/detail.js", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/assets/avatar.png", revision: "1" },
  { url: "/assets/foto.jpg", revision: "1" },
  { url: "/assets/logo192x192.png", revision: "1" },
  { url: "/assets/logo512x512.png", revision: "1" },
  { url: "/assets/logo1028x1028.png", revision: "1" },
  { url: "/css/materialize.min.css", revision: "1" },
  { url: "/js/materialize.min.js", revision: "1" },
  { url: "/js/idb.js", revision: "1" },
  { url: "/nav/nav.html", revision: "1" },
  { url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1" },
]);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
      cacheName: "pages"
    })
);

workbox.routing.registerRoute(
  new RegExp("/nav/"),
  workbox.strategies.staleWhileRevalidate({
      cacheName: "nav"
    })
);

workbox.routing.registerRoute(
  new RegExp("/js/"),
  workbox.strategies.staleWhileRevalidate({
      cacheName: "js"
    })
);

workbox.routing.registerRoute(
  new RegExp("/css/"),
  workbox.strategies.staleWhileRevalidate({
      cacheName: "css"
    })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football\-data\.org\/v2\//,
  workbox.strategies.cacheFirst({
    cacheName: "data"
  })
)

workbox.routing.registerRoute(
  new RegExp("/"),
  workbox.strategies.staleWhileRevalidate({
      cacheName: "detail"
    })
);

// push notif
self.addEventListener("push", event=>{
  let body = event.data ? event.data.text() : "No Payloads";
  const options = {
    body: body,
    icon: "/assets/logo.png",
    badge: "/assets/logo.png",
    image: "/assets/avatar.png",
    vibrate: [80, 160, 80, 240],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    }
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
