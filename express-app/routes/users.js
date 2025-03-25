var express = require('express');
var router = express.Router();

let allUsers = [];

/* GET users listing. */
router.get('/',
    function (req, res, next) {
        res.send({
            items: allUsers
        });
    });

/* POST - create new user */
router.post('/',
    function (req, res, next) {
    let newUser = req.body;
    allUsers.push(newUser);
        res.status(201).send(newUser);
    });
module.exports = router;
