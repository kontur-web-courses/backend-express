var express = require('express');
var router = express.Router();

let users = [
  {"id": 1, "name": "Petya"},
  {"id": 2, "name": "Anton"},
  {"id": 3, "name": "Roma"}
];


router.get('/', function(req, res, next) {
  res.json({items: users});
});

router.post('/', function(req, res, next) {
  const {name} = req.body;

  if (!name) {
    return res.status(400).json({ error: '"name" обязательно' });
  }

  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);
  res.status(201).json(newUser);
})

module.exports = router;
