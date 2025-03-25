var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = {
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
  res.json(users);
});

module.exports = router;
