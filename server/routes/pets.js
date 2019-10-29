var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require("../model/helper");

router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// lists all pets
router.get("/pets", (req, res) => {
  db("SELECT * FROM pets").then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

// lists pet by id
router.get("/pets/:petID", (req, res) => {
  db(`SELECT * FROM pets WHERE petID=${req.params.petID};`).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

// not sure what this post is doing, but it works!
router.post("/", (req, res) => {
  db(
    `INSERT INTO pets (name, dateCreated) VALUES ("${req.body.name}", NOW());`
  ).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
});

module.exports = router;
