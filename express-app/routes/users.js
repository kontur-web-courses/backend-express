var express = require('express');
var router = express.Router();

const arr = {
  items: [
    {
      "id": 1,
      "name": "Stas"
    },

    {
      "id": 2,
      "name": "Ruslan"
    },

    {
      "id": 3,
      "name": "Russia"
    }
  ]
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(arr);
});


router.post('/', function(req, res, next) {
  const newPerson  = req.body;
  arr.items.push(newPerson);
  res.send(arr);
})

module.exports = router;
