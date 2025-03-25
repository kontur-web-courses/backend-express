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
const users = [];
router.post('/users', function(req, res, next) {
  const user = req.body;
  users.push(user);
  res.status(201).json({
    message: 'successfully',
    user
  });
});
module.exports = router;
