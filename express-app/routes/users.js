
var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
router.post('/', function(req, res, next) {
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [req.body['name']], function (err) {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(201).json({ message: 'User added'});
    }
  });
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});


module.exports = router;
