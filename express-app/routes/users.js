var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  const object = {
    items: [
      {
        "id": 1,
        "name": "наточка"
      }
    ]
  }
  res.send(object);
});

module.exports = router;
