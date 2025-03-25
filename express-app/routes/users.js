var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = [
    { id: 1, name: 'Артем' },
    { id: 2, name: 'Вова' },
    { id: 3, name: 'Гога' }
  ];

  res.json({ items: users });
});

module.exports = router;
