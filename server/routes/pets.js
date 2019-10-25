var express = require("express");
var router = express.Router();

/* GET home page. */

function sendItems(req, res) {
  db("SELECT * FROM items ORDER BY id ASC;").then(results => {
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
router.post("/", (req, res) => {
  db(`INSERT INTO pets (name, dateCreated) VALUES ("Blob", NOW());`)
}


);

module.exports = router;
