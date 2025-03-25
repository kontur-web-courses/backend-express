var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');


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

router.post('/', function(req, res, next) {
  const { name } = req.body;

  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name]);
});

module.exports = router;
