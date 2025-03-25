var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    'items': [
      {
        'id': 1,
        'name': 'Maksim'
      },
      {
        'id': 2,
        'name': 'Alex'
      },
      {
        'id': 3,
        'name': 'John'
      }
    ]
  });
});

router.post('/', function(req, res, next) {
  req.bod
});


module.exports = router;
