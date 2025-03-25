var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    items: [
      {id: 1, name: "Alice"},
      {id: 2, name: "Bob"},
      {id: 3, name: "Charlie"}
    ]
  });
});

module.exports = router;