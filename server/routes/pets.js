var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require("../model/helper");

router.use(bodyParser.json());

// lists all pets
//works as of 11/5/19 @12:16PM according to POSTMAN
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
router.get("/:petID", (req, res) => {
  db(
    `SELECT *,  TIMEDIFF(now(), dateCreated) as age FROM pets WHERE petID=${req.params.petID};`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
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
    //have to figure out how to feed need pets
    db(
      `INSERT INTO events (petID, activity, timeActioned) VALUES (${req.params.petID}, 'madeHappy', NOW());`
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
    `SELECT TIMEDIFF(now(), dateCreated) as age FROM pets WHERE petID=${req.params.petID}`
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
    `SELECT *, TIMEDIFF(now(), timeActioned) as foodTime FROM events WHERE petID =${req.params.petID} and activity="lastFed"`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});


//POST feeds a pet
//works as of 11/5/19 @12:21PM according to POSTMAN
//just changed route to /:petID/satiety, don't forget to change the Pet js frontend fetch request that 
//corresponds to this and the README if it works
//it works
router.post("/:petID/satiety", (req, res) => {
  db(`INSERT INTO events (petID, activity, timeActioned) VALUES (${req.params.petID}, 'lastFed', NOW());`
    // ON DUPLICATE KEY UPDATE events SET timeActioned=NOW() WHERE petID=${req.params.petID} and activity='lastFed  ';
    //had the idea to  "ON DUPLICATE KEY UPDATE timeActioned=NOW();" but that doesn't exactly work"
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    db(
      `UPDATE pets SET satiety = satiety+2 WHERE petID = ${req.params.petID} and satiety<=30;`
    ).then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }

      db(
        `SELECT *, TIMEDIFF(now(), dateCreated) as age FROM pets WHERE petID = ${req.params.petID};`
      ).then(results => {
        if (results.error) {
          res.status(500).send(results.error);
        }
        res.send(results.data[0]);
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
      `UPDATE pets SET happy = happy+2 WHERE petID = ${req.params.petID} and happy<=30;`
    ).then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }

      db(
        `SELECT *, TIMEDIFF(now(), dateCreated) as age FROM pets WHERE petID = ${req.params.petID};`
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
      `UPDATE pets SET clean = clean+2 WHERE petID = ${req.params.petID} and clean<=15;`
    ).then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }

      db(
        `SELECT *, TIMEDIFF(now(), dateCreated) as age FROM pets WHERE petID = ${req.params.petID};`
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
      `UPDATE pets SET play = play+2 WHERE petID = ${req.params.petID} and play<=30;`
    ).then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }

      db(
        `SELECT *, TIMEDIFF(now(), dateCreated) as age FROM pets WHERE petID = ${req.params.petID};`
      ).then(results => {
        if (results.error) {
          res.status(500).send(results.error);
        }
        res.send(results.data[0]);
      });
    });
  });
});
module.exports = router;
