var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require("../model/helper");

router.use(bodyParser.json());

// lists all events
router.get("/events", (req, res) => {
  db("SELECT * FROM events").then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

// GET lists name, activity and timeActioned by petID
router.get("/events/fed/:petID", (req, res) => {
  db(`SELECT p.name, e.activity, e.timeActioned
FROM events AS e
LEFT JOIN pets AS p
ON e.petID = p.petID
WHERE p.petID=${req.params.petID}`).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

module.exports = router;