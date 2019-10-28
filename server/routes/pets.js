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
// do we need get for /pets/id? or /pets/name? or /pets/dateCreated?

//use postman to test post
//does not work
router.post("/", (req, res) => {
  //frontend worker will edit the template literal to whatever is on the frontend
  db(
    `INSERT INTO pets (name, dateCreated) VALUES ("${req.body.name}", NOW());`
  ).then(
    //not pushing because we're using SQL, bitch.
    //the SQL code is basically inserting the values into the table like we would type something into an Excel sheet wow
    results => {
      if (results.error) {
        res.status(500).send(results.error);
      }
      sendItems(req, res);
    }
  );
});

module.exports = router;
