var Pusher = require("pusher");
var db = require("../model/helper");

var channels_client = new Pusher({
  appId: "890410",
  key: "a6e425669a496f8c754a",
  secret: "6d9208d18419965b6c11",
  cluster: "eu",
  encrypted: true
});

function petBars() {
  db(`UPDATE pets SET satiety = satiety-5 WHERE petID = ${req.params.petID};`);

  channels_client.trigger("my-channel", "my-event", {
    message: "hello world"
  });
}

module.exports = petBars;
