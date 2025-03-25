var express = require('express');
var router = express.Router();

/* GET users listing. */
var users = [{
  "id": 1,
  "name": "name"
}]

router.get('/', function(req, res, next) {
  res.send(users);
});

router.post('/', function(req, res, next) {
  users.push(req.body);
})

module.exports = router;
