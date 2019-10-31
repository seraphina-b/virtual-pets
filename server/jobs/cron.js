var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require("../model/helper");
const cron = require("node-cron");
// const sendNotification = require("./sendNotification");

router.use(bodyParser.json());

cron.schedule("* * * * *", function() {
  console.log("running a task every minute");
  // sendNotification();
});

module.exports = router;
