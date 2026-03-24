const express = require('express');
const router = express.Router();

let users = [
    {
        "id": 1,
        "name": "Vladislav Ershov"
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

router.get('/:id', function (req, res, next) {
    const id = Number(req.params.id);
    for(let i = 0; i< users.length; i++){

        console.log(id);
        if (users[i].id === id){
            res.status(201).json(users[i]);
        }
    }
    res.status(404).json({})
})

module.exports = router;
