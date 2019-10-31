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

router.put("/:petID", (req, res) => {
  db(`UPDATE pets SET satiety = satiety+2 WHERE petID = 1;`).then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
  });
});

module.exports = router;
