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
  db(`UPDATE pets SET satiety = satiety-5;`);
  db(`UPDATE pets SET happy = happy-5 WHERE happy>=0;`);
  db(`UPDATE pets SET clean = clean-5 WHERE clean>=0;`);
  db(`UPDATE pets SET play = happy-5 WHERE play>=0;`);

  channels_client.trigger("my-channel", "my-event", {
    //hi this is nicole. i changed the message to "hi world" to see if it's working and it's not
    message: "hi world"
  });
}

module.exports = petBars;

// UPDATE pets SET satiety = satiety-5 WHERE satiety>=0
