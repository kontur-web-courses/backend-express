var express = require('express');
var router = express.Router();


let usersStorage = {
  items: [
    {
      "id": 1,
      "name": "TIM"
    },
    {
      "id": 2,
      "name": "GOGA"
    },
    {
      "id": 3,
      "name": "JURA"
    },
    {
      "id": 4,
      "name": "ARTEMCHIK"
    },
    {
      "id": 5,
      "name": "VOLODYA"
    }
  ],
  nextId: 4
};

router.get('/', function(req, res, next) {
  res.send({
    items: localStorage['items']
  });
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    items: usersStorage.items
  });
});

router.post('/', function(req, res, next) {
  if (!req.body.name) {
    return res.status(400).send({ error: 'Name is required' });
  }

  const newUser = {
    id: usersStorage.nextId++,
    name: req.body.name
  };

  usersStorage.items.push(newUser);

  res.status(201).send(newUser);
});

module.exports = router;
