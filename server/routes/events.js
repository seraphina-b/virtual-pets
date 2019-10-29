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

// lists timeActioned
// I want to list the action and the timeActioned
router.get("/events/timeActioned", (req, res) => {
  db("SELECT * FROM events").then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

module.exports = router;
