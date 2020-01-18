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
  db(`UPDATE pets SET satiety = satiety-2 WHERE satiety>1;`);
  db(`UPDATE pets SET happy = happy-2 WHERE happy>1;`);
  db(`UPDATE pets SET clean = clean-2 WHERE clean>1;`);
  db(`UPDATE pets SET play = happy-2 WHERE play>1;`);

  channels_client.trigger("my-channel", "my-event", {
    message: "hi world"
  });
}

module.exports = petBars;
