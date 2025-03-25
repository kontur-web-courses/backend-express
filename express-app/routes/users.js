var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send([{
  //   "id": 1,
  //   "name": "name"
  // }, {
  //   "id": 2,
  //   "name": "admin"
  // }, {
  //   "id": 3,
  //   "name": "sleepyCow"
  // }]);

});

router.post('/users', function(req, res, next) {
  let userData = req.body;
});
module.exports = router;
