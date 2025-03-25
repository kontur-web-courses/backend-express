var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    let result = {
        "users": [{
            "id": 1,
            "name": "Biba"
        }, {
            "id": 2,
            "name": "Boba"
        }]
    }
    res.send(result);
});

module.exports = router;
