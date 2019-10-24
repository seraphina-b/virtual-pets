var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var db = require("../model/helper");

<<<<<<< HEAD
//a comment

/* GET home page. */
function sendItems(req, res) {
  db("SELECT * FROM pets").then(results => {
=======


/* GET home page. */
function sendItems(req, res) {
  db("SELECT * FROM items ORDER BY id ASC;").then(results => {
>>>>>>> added post request function???
    if (results.error) {
      res.status(500).send(results.error);
    }
    res.send(results.data);
  });
}

router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.get("/", (req, res) => {
  // Send back the full list of items
  sendItems(req, res);
});

//start copy paste here and figure out what to erase
//then add the INSERT thing into the put request

//use postman to test post
<<<<<<< HEAD
//does not work
router.post("/", (req, res) => {
  //will change the "Blob" to whatever is on the frontend
  db(`INSERT INTO pets (name, dateCreated) VALUES ("Blob", NOW());`).then(
    //not pushing because we're using SQL, bitch.
    //the SQL code is basically inserting the values into the table like we would type something into an Excel sheet wow
    results => {
      if (results.error) {
        res.status(500).send(results.error);
      }
      sendItems(req, res);
    }
  );
=======
router.post("/", (req, res) => {
  db(`INSERT INTO pets (name, dateCreated) VALUES ("Blob", NOW());`)
>>>>>>> added post request function???
}


);

module.exports = router;
