var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    items: [
      {
        id: 1,
        name: "Иван Иванов"
      },
      {
        id: 2,
        name: "Петр Петров"
      },
      {
        id: 3,
        name: "Сергей Сергеев"
      }
    ]
  });
});

module.exports = router;
