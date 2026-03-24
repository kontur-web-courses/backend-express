const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

const express = require('express');
const router = express.Router();

const users = [
  {
    id: 1,
    name: "Темнякова Анна"
  },
  {
    id: 2,
    name: "Мартемьянова Вера"
  }
];

router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  db.all("SELECT id, name FROM users WHERE id=(?)", [id], (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.send(users);
    }
  });
})

router.post('/', function(req, res, next) {
  const name = req.body.name;
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name]);
  res.status(201).json(name);
})
module.exports = router;
