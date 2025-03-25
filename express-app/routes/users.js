var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
  res.json({ items: users });
});

module.exports = router;
