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
  db(`UPDATE pets SET satiety = satiety-1 WHERE satiety>=0;`);
  db(`UPDATE pets SET happy = happy-1 WHERE happy>=0;`);
  db(`UPDATE pets SET clean = clean-1 WHERE clean>=0;`);
  db(`UPDATE pets SET play = happy-1 WHERE play>=0;`);

  channels_client.trigger("my-channel", "my-event", {
    message: "hi world"
  });
}

module.exports = petBars;
