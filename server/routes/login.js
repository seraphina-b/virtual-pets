var express = require('express');
var router = express.Router();

/* gets login page */
router.get('/', function (req, res) {
    res.send('this is the login page');
});

router.get('/ ')

module.exports = router;