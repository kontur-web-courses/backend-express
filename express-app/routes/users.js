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
  ],
  nextId: 6
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(usersStorage);
});

router.post('/', function(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newUser = {
    id: usersStorage.nextId++,
    name: req.body.name
  };

  usersStorage.items.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
