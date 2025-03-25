var express = require('express');
const req = require("express/lib/request");
const res = require("express/lib/response");
var router = express.Router();

let users = [];

router.post('/', (req, res) => {
  users.push(req.body);
  return res.status(200)});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(users);
});

module.exports = router;
