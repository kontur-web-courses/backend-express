var express = require('express');
var router = express.Router();
const users = {
  items: [
    {
      "id": 1,
      "name": "Your mother"
    }
  ]
};
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    "id": 2,
    "name": "name"
  });
});

router.post('/', function(req, res, next) {
  const newUser = {
    id: usersStorage.items.length + 1,
    name: req.body.name
  };

  usersStorage.items.push(newUser);

  res.status(201).json(newUser);
});


module.exports = router;
