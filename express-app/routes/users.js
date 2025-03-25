var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
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
    ]
  });
});

module.exports = router;
