var express = require('express');
var router = express.Router();

let users = [{
    "id": 1,
    "name": "name"
}];
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send({
        "items": users
    });
});

router.post('/', function (req, res, next) {
    const newUser = req.body;
    users.push(newUser);

});

module.exports = router;
