var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
//it's .. because it's going one file back
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var secret = "you'll be so goddamn pretty like the stars";

/* goes to login page */
//post request because the user will attempt a new login
//i don't know if it needs a next
router.post("/", function(req, res, next) {
  // let user = {
  //   username: "rihanna",
  //   pass: "codeop"
  // };

  // inputUsername = req.body.username;
  // inputPassword = req.body.password;

  // if (user.username === inputUsername && user.pass == inputPassword) {
  //   //if user and pass match the req.body, generate a new token
  //   var token = jwt.sign({ userID: 1, username: user.username }, secret);
  //   res.send({ message: "This is your virtualpet owner token", token });
  // }

  // //otherwise error
  // res.status(400).send({ message: "Username or password not valid! Sorry :(" });

  res.send({ title: "this is the login page" });
});

//a protected route
router.get("/account", userShouldBeLoggedIn, function(req, res, next) {
  //do your DB query stuff with req.userID
  //code below would be used once there is a user table
  sql = "SELECT *FROM users WHERE userID=" + req.userID;
  res.send({ message: "Here is your data!", userID: req.userID });
});

module.exports = router;
