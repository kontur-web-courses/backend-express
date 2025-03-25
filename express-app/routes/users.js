var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    items: [
      {
        id: 1,
        name: "хопесима"
      },
      {
        id: 2,
        name: "райан гослинг"
      },
      {
        id: 3,
        name: "мурад"
      }
    ]
  });
});

module.exports = router;
