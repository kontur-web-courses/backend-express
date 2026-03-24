const express = require('express');
const router = express.Router();

let users = [
    {
        "id": 1,
        "name": "Vladislav Ershov pidoras"
    },
    {
        "id": 2,
        "name": "Vinogradova Elizaveta"
    },
];


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send({
        items: users
    });
});

router.post('/', function (req, res, next) {
    const maxId = Math.max(...users.map(u => u.id));
    const newUser = { id: maxId + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

module.exports = router;
