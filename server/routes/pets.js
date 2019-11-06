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
    res.send(results.data[0]);
  });
});

//from nicole: confusing because there isn't a satiety field in the //pets table. this gives us a 500 error. it would make more sense to
//`SELECT *,  TIMEDIFF(now(), dateCreated) as age FROM events WHERE petID=${req.params.petID} and activty='last fed';`; I think. Will work this out later?
//gives 500 error as of 11/5/19 @12:17PM according to POSTMAN
router.put("/:petID", (req, res) => {
  db(
    `UPDATE pets SET satiety = satiety+2 WHERE petID = ${req.params.petID};`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
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
    `SELECT TIMEDIFF(now(), timeActioned) as age from pets WHERE petID=${req.params.petID}`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

//POST feeds a pet
//works as of 11/5/19 @12:21PM according to POSTMAN
router.post("/:petID/events", (req, res) => {
  db(
    `INSERT INTO events (petID, activity, timeActioned) VALUES (${req.params.petID}, 'lastfed', NOW());`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    db(
      `UPDATE pets SET satiety = satiety+2 WHERE petID = ${req.params.petID};`
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
    //res.send({ message: "baby was fed!" });
  });
});

module.exports = router;
