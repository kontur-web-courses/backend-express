const express = require('express');
const router = express.Router();

/* GET users listing. */

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(rows);
    }
  });
});

router.post('/', function(req, res) {
  const name = req.body.name;
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name]);
  res.status(201).json({"message": "User was created"});
})

router.get('/:id', function(req, res, next) {
  const targetId = Number(req.params.id);
  db.all("SELECT id, name FROM users WHERE id = (?)", [targetId], (err, rows) => {
    if (err) {
      res.status(500);
    }
    else if (rows.length === 0) {
      res.status(404).send({"message": "User not found"});
    }
    else {
      res.status(200).send(rows);
    }
  });
})

module.exports = router;
