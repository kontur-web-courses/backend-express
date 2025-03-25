var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function (req, res, next) {
    userArray = [
        {
            "name": "Дмитрий",
            "age": 19,
            "city": "Kurgan"
        },
        {
            "name": "Дмитрий",
            "age": 19,
            "city": "Ekaterinburg"
        }
    ]
    items = [
        {
            "id": 1,
            "name": "Дмитрий"
        },
        {
            "id": 2,
            "name": "Алексей"
        },
        {
            "id": 3,
            "name": "Александр"
        },
        {
            "id": 4,
            "name": "Георгий"
        }
    ]
    const obj = {
        "users": userArray,
        "items": items
    }
    res.send(obj);
});

router.post('/users/', function (req, res, next) {
    const newUser = req.body;
})


module.exports = router;
