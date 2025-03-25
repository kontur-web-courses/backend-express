var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    "id": 1,
    "name": "name"
  });
});

const user = router.post('/', function(req, res, next) {
  res.send(req.body);
})

module.exports = router;
