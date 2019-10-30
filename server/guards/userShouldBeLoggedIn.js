var jwt = require("jsonwebtoken");
var secret = "Big ballin' is my hobby";

function userShouldBeLoggedIn(req, res, next) {
    let token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).send({ message: "You need to provide a token" });
    }
    jwt.verify(token, secret, function (err, decoded) {
        // err
        if (err) res.status(401).send({ message: err.message });
        // decoded undefined
        res.send({ message: "good to go" });
    });
    //at this point, there is a token but it nneeds to be verified
    res.status(401).send({ message: "You're not authorized!" });

}

//please work

module.exports = userShouldBeLoggedIn;