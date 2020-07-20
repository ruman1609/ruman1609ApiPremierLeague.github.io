const webPush = require("web-push");

const vapidKeys = {
  "publicKey": "BAEJNLNLiu4u300APGjF7JimnEwRg7f3M-9UBR3q_ONAhtUepoyKnyHC1CT_vjbPy9kt_O4j-EdWrkjt6vA38yk",
  "privateKey": "DTxa7_SBT9UvTkeze7mXFOeIpc3b3aWwz9mg1Bbh3PU"
}

webPush.setVapidDetails(
  "mailto:rudyrachman16@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const pushSubs = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/fojSga4S-ws:APA91bENZjTnTCT_wfEwaPlw22mg7lH1xXIe9JotQY1-_cD8nNspcnvCs_r6Ws18FjPsjs5p-Z2PeGiBbf5xNW5XroqvNmcLJDy1FoK2rV1EbNklVGGi6NfdocW1rIue8xLVFiFV_Slp",
  "keys": {
    "p256dh": "BIgnX4TaNzDlqv32I0h/v/zLaNwajckIDp7CiRKGTmk0CPHXKvjbePPcrtCzes/3zZu1xT9xjzaS0NHR9hhQy+A=",
    "auth": "90OYbwr6Ri7LnZ6P/PKNJg=="
  }
}

const payload = "PWA API PL 2020 dapat menerima Push Notification";

const options = {
  gcmAPIKey: "802097591888",
  TTL: 60
}

webPush.sendNotification(
  pushSubs,
  payload,
  options
);
