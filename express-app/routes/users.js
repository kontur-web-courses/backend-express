var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let data = {
      "items": [{
        "id": 1,
        "name": "Kirill"
      },
        {
        "id": 2,
        "name": "Artem"
      }]
  }
  res.send(data);
});

router.post('/', function(req, res, next) {
    let user;
    user = req.body;
});

module.exports = router;
