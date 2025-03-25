var express = require('express');
var router = express.Router();

let users = [
  {"id": 1, "name": "Petya"},
  {"id": 2, "name": "Anton"},
  {"id": 3, "name": "Roma"}
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({items: users});
});

router.post('/', function (req, res, next) {
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
})

module.exports = router;
