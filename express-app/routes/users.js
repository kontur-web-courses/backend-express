var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    "items": [{
    "id": 1,
    "name": "name"
  }]});
});

module.exports = router;
