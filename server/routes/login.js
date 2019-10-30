var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');
var secret = "Big ballin' is my hobby"

/* goes to login page */
//post request because the user will attempt a new login
//i don't know if it needs a next
router.post("/", function (req, res, next) {
    let user = {
        username: "rihanna",
        pass: "codeop"
    };

    inputUsername = req.body.username;
    inputPassword = req.body.password;

    if (user.username === inputUsername && user.pass == inputPassword) {
        //if user and pass match the req.body, generate a new token 
        var token = jwt.sign({ userID: 1, username: user.username }, secret);
        res.send({ message: "...logging in" })
    }

    //otherwise error
    res.status(400).send({ message: "Username or password not valid! Sorry :(" });


    res.send({ title: 'this is the login page' });
});



module.exports = router;