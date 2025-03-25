var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text)`);

function insertUser(name) {
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name]);
}

function getUsers(res) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  getUsers(res);
});

router.post('/', function (req, res, next) {
    const newUser = req.body;
    insertUser(newUser.name);
    res.send();
});

module.exports = router;
