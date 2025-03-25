var express = require("express");
var router = express.Router();

const users = [];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send(users);
});

/* POST users listing */
router.post("/", function (req, res, next) {
  let newUser = req.body;
  newUser.id = users.length > 0 ? users.length + 1 : 1;
  users.push(newUser);
  res.status(200).send(newUser);
});

module.exports = router;
