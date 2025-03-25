var express = require('express');
var router = express.Router();

var our_object = {
  items: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Diana" }
  ]
};

router.get('/', function(req, res, next) {
  res.send(our_object);
});

router.post('/', function(req, res, next) {
  const newUser = req.body;

  newUser.id = our_object.items.length > 0
      ? our_object.items[our_object.items.length - 1].id + 1
      : 1;

  our_object.items.push(newUser);
});

module.exports = router;
