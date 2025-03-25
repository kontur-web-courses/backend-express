var express = require('express');
var router = express.Router();

const users = [
  { id: 1, name: 'Артем' },
  { id: 2, name: 'Вова' },
  { id: 3, name: 'Гога' }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ items: users });
});

router.post('/users', function(req, res, next) {
  const userData = req.body;

  if (!userData.name) {
    return res.status(400).json({ error: 'Имя пользователя обязательно' });
  }

  const newId = users.length > 0
      ? Math.max(...users.map(user => user.id)) + 1
      : 1;

  const newUser = {
    id: newId,
    name: userData.name
  };

  users.push(newUser);

  res.status(201).json(newUser);
})

module.exports = router;
