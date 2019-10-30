const cron = require("node-cron");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require("../model/helper");

router.use(bodyParser.json());

cron.schedule("* * * * *", function() {
  console.log("running a task every minute");
});

module.exports = router;
