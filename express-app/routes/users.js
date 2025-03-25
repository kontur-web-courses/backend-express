var express = require('express');
var router = express.Router();

let usersStorage = {
  items: [
    {
      id: 1,
      name: 'Julik'
    },
    {
      id: 2,
      name: 'renover'
    },
    {
      id: 3,
      name: 'meow'
    },
    {
      id: 4,
      name: 'Olega Rasin'
    },
    {
      id: 5,
      name: 'Dmitriy Kosolobik'
    }
  ]
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(usersStorage);
});

router.post('/', function (req, res, next) {
  const newUser = {
    id: usersStorage.items.length + 1,
    name: req.body.name
  };

  usersStorage.items.push(newUser);

  res.status(201).json(newUser);
});

module.exports = router;
