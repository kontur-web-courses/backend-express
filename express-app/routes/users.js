var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text)`);

/* GET users listing. */
var users = [{
  "id": 1,
  "name": "name"
}]

router.get('/', function (req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

router.post('/', function (req, res, next) {
  const insert = "INSERT INTO users (name) VALUES (?)";
  console.log(req.body.name);
  db.run(insert, [req.body.name]);
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
})

module.exports = router;
