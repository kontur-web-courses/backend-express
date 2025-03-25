var express = require('express');
var router = express.Router();

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
let nextId = 4;

router.get('/', function(req, res, next) {
  res.json({ items: users });
});

router.post('/', function(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newUser = {
    id: nextId++,
    name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
