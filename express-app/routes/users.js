var express = require('express');
var router = express.Router();

let usersStorage = {
  items: [
    {
      "id": 1,
      "name": "Дмитрий Косолобов"
    },
    {
      "id": 2,
      "name": "Иван Симонов"
    },
    {
      "id": 3,
      "name": "Сергей Сергеев"
    }
  ]
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
    id: usersStorage.items.length + 1, 
    name: req.body.name
  };

  usersStorage.items.push(newUser);

  res.status(201).json(newUser);
});

module.exports = router;
