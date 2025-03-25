var express = require('express');
var router = express.Router();

let users = {
    items: [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
        { id: 3, name: "User 3" }
    ],
    nextId: 4
};

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send(users);
})

router.post('/', function (req, res, next) {
    const newUser = {
        id: users.nextId++,
        name: req.body.name,
    };

    users.items.push(newUser);
    users.nextId++;

    res.status(200).json(newUser);
});

module.exports = router;
