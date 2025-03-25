var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

  const object = {
    items: [
      {
        "id": 1,
        "name": "наточка"
      }
    ]
  }
  res.send(object);
});

router.post('/', function (req, res, next) {
  const newUser = {
    id: usersStorage.length + 1,
    name: req.body.name
  };

  usersStorage.push(newUser);

  res.status(201).json(newUser);
});

module.exports = router;
