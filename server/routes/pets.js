var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require("../model/helper");

router.use(bodyParser.json());

// lists all pets
//works as of 11/5/19 @12:16PM according to POSTMAN
//works as of 11/10/19 at 3:30PM
router.get("/", (req, res) => {
  db("SELECT * FROM pets").then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

// lists pet by id
//works as of 11/5/19 @12:17PM according to POSTMAN
// SELECT TIMEDIFF(now(), dateCreated) AS age FROM pets WHERE petID = 1;
//works as of 11/10/19 at 3:31PM
router.get("/:petID", (req, res) => {
  db(
    //this gets all the pet data, please do not delete the *
    `SELECT *, TIME_TO_SEC(TIMEDIFF(now(), dateCreated)) AS age, TIMEDIFF(now(), timeFed) AS foodTime FROM pets WHERE petID=${req.params.petID};`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    } 
    //what would happen if I took the zero out?
    //it works the same way for some reason
    res.send(results.data[0]);
  });
});

// creates pet
//works as of 11/5/19 @12:18PM according to POSTMAN
router.post("/", (req, res) => {
  db(
    `INSERT INTO pets (name, dateCreated) VALUES ("${req.body.name}", NOW());`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }

    // db("SELECT * FROM pets ORDER BY petID DESC LIMIT 1;").then(results => {
    //   if (results.error) {
    //     res.status(500).send(results.error);
    //   }
    //   res.send(results.data);
    // })

    console.log(results);
    let petID = results.data[0].insertId;

    db(
      //this gets all the pet data, please do not delete the * we need it for the bars or they won't work
      `SELECT *, TIME_TO_SEC(TIMEDIFF(now(), dateCreated)) AS age, TIMEDIFF(now(), timeFed) AS foodTime FROM pets WHERE petID = ${petID};`
    ).then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }
      res.send(results.data[0]);
    });
  });
});

// GET lists name, activity and timeActioned by petID
//works as of 11/5/19 @12:19PM according to POSTMAN
router.get("/:petID/events", (req, res) => {
  db(`SELECT p.name, e.activity, e.timeActioned FROM events AS e
LEFT JOIN pets AS p
ON e.petID = p.petID
WHERE p.petID=${req.params.petID}`).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

// //gets the age
//doesn't work (500 error) 11/5/19 @12:21PM but we don't need this
router.get("/:petID/age", (req, res) => {
  db(
    `SELECT TIME_TO_SEC(TIMEDIFF(now(), dateCreated)) AS age FROM pets WHERE petID=${req.params.petID}`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

//sees the amount of time since it ate so it can poop
router.get("/:petID/poop", (req, res) => {
  db(
    `SELECT TIMEDIFF(now(), timeFed) AS foodTime FROM pets WHERE petID=${req.params.petID};"`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

//POST feeds a pet
//updated this to tell us last time the pet was fed so we can get info about poop
router.post("/:petID/satiety", (req, res) => {
  db(
    `INSERT INTO events (petID, activity, timeActioned) VALUES (${req.params.petID}, 'lastFed', NOW());`
    // ON DUPLICATE KEY UPDATE events SET timeActioned=NOW() WHERE petID=${req.params.petID} and activity='lastFed  ';
    //had the idea to  "ON DUPLICATE KEY UPDATE timeActioned=NOW();" but that doesn't exactly work"
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    db(
      `UPDATE pets SET satiety = satiety+5 WHERE petID = ${req.params.petID} and satiety<=30;`
    ).then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }

      db(
        `UPDATE pets SET timeFed = now() WHERE petID=${req.params.petID};`
      ).then(results => {
        if (results.error) {
          res.status(500).send(results.error);
        }

        db(
          //this gets all the pet data, please do not delete the * we need it for the bars or they won't work
          `SELECT *, TIME_TO_SEC(TIMEDIFF(now(), dateCreated)) AS age, TIMEDIFF(now(), timeFed) AS foodTime FROM pets WHERE petID = ${req.params.petID};`
        ).then(results => {
          if (results.error) {
            res.status(500).send(results.error);
          }
          res.send(results.data[0]);
        });
      });
    });
  });
});

//POST makes pet happy
router.post("/:petID/happy", (req, res) => {
  db(
    `INSERT INTO events (petID, activity, timeActioned) VALUES (${req.params.petID}, 'madeHappy', NOW());`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    db(
      `UPDATE pets SET happy = happy+5 WHERE petID=${req.params.petID} AND happy<=30;`
    ).then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }

      db(
        //this gets all the pet data, please do not delete the * we need it for the bars or they won't work
        `SELECT *, TIME_TO_SEC(TIMEDIFF(now(), dateCreated)) AS age, TIMEDIFF(now(), timeFed) AS foodTime FROM pets WHERE petID = ${req.params.petID};`
      ).then(results => {
        if (results.error) {
          res.status(500).send(results.error);
        }
        res.send(results.data[0]);
      });
    });
  });
});

//POST cleans pet
router.post("/:petID/clean", (req, res) => {
  db(
    `INSERT INTO events (petID, activity, timeActioned) VALUES (${req.params.petID}, 'cleanedPoop', NOW());`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    db(
      `UPDATE pets SET clean = clean+5 WHERE petID = ${req.params.petID} and clean<=15;`
    ).then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }

      db(
        //this gets all the pet data, please do not delete the * we need it for the bars or they won't work
        `SELECT *, TIME_TO_SEC(TIMEDIFF(now(), dateCreated)) AS age, TIMEDIFF(now(), timeFed) AS foodTime FROM pets WHERE petID = ${req.params.petID};;`
      ).then(results => {
        if (results.error) {
          res.status(500).send(results.error);
        }
        res.send(results.data[0]);
      });
    });
  });
});

router.post("/:petID/play", (req, res) => {
  db(
    `INSERT INTO events (petID, activity, timeActioned) VALUES (${req.params.petID}, 'playedWith', NOW());`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    db(
      `UPDATE pets SET play = play+5 WHERE petID = ${req.params.petID} and play<=30;`
    ).then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }
      db(
        //this gets all the pet data, please do not delete the * we need it for the bars or they won't work
        `SELECT *, TIME_TO_SEC(TIMEDIFF(now(), dateCreated)) AS age, TIMEDIFF(now(), timeFed) AS foodTime FROM pets WHERE petID = ${req.params.petID};`
      ).then(results => {
        if (results.error) {
          res.status(500).send(results.error);
        }
        res.send(results.data[0]);
      });
    });
  });
});

router.delete("/:petID", (req, res) => {
  db(
    `INSERT INTO events (petID, activity, timeActioned) VALUES (${req.params.petID}, 'abandoned', NOW());`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    db(
      `DELETE from pets WHERE petID = ${req.params.petID}`
    ).then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }
      res.status(200).send("You abandoned the fucking dog.");
    });
  });
});
      

module.exports = router;
