var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello, world!');
  return {
    items: [
      {
        "id": 1,
        "name": "Stas"
      },

      {
        "id": 2,
        "name": "Ruslan"
      },

      {
        "id": 3,
        "name": "Russia"
      }
    ]
  }
});

module.exports = router;
