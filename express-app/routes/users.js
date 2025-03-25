var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const items = [
    {
      "id": 1,
      "name": "Yura"
    },
    {
      "id": 2,
      "name": "Max"
    },
    {
      "id": 3,
      "name": "Stas"
    },
    {
      "id": 4,
      "name": "Katya"
    },
  ]; 
  res.send(items);
});

module.exports = router;
