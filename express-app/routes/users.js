const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text)`);


let users = [
  { id: 1, name: "хопесима" },
  { id: 2, name: "райан гослинг" },
  { id: 3, name: "мурад" }
];

// GET /users
router.get('/', function(req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
      if (err) {
          console.log(err);
      } else {
          res.send(rows);
      }
  });
});

// POST /users
router.post('/', function(req, res, next) {
  let name = req.body.name;
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name]);
  res.send(req.body)
});

module.exports = router;