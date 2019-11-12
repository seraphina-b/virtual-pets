var Pusher = require("pusher");

var channels_client = new Pusher({
  appId: "890410",
  key: "a6e425669a496f8c754a",
  secret: "6d9208d18419965b6c11",
  cluster: "eu",
  encrypted: true
});

function sendNotification() {
  channels_client.trigger("my-channel", "updatePet", {
    message: "hello world"
  });
}

module.exports = sendNotification;
