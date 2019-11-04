var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require("../model/helper");

router.use(bodyParser.json());

// lists all pets
router.get("/", (req, res) => {
  db("SELECT * FROM pets").then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

// lists pet by id
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

router.put("/:petID", (req, res) => {
  db(`UPDATE pets SET satiety = satiety+2 WHERE petID = 1;`).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
  });
});

// GET lists name, activity and timeActioned by petID
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

// function getAge(req, res) {
//   db(
//     `SELECT TIMEDIFF(now(), dateCreated) as age from pets WHERE petID=${req.params.petID}`
//   ).then(results => {
//     if (results.error) {
//       res.error(results.error);
//     }
//     res.send(results.data);
//   });
// }

// /* GET all locations */
// router.get("/", getAge);

// //gets the age
router.get("/:petID/age", (req, res) => {
  db(
    `SELECT TIMEDIFF(now(), dateCreated) as age from pets WHERE petID=${req.params.petID}`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

//POST feeds a pet
router.post("/:petID/events", (req, res) => {
  db(
    `INSERT INTO events (petID, activity, timeActioned) VALUES (${req.params.petID}, 'lastfed', NOW());`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    db(`UPDATE pets SET satiety = satiety+2 WHERE petID = 1;`).then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }
    });
    res.send({ message: "baby was fed!" });
  });
});

module.exports = router;
