const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text)`);

const express = require('express');
const router = express.Router();



/* GET users listing. */
router.get('/', function (req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
      return
    }
    res.send(rows);
  });
});

router.get('/:id', function (req, res, next) {
  const id = parseInt(req.params.id);
  db.get(`SELECT id, name FROM users where id = ${id}`, [], (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!rows) {
      return res.status(404).send('User not found');
    }
    res.json(rows);
  });
});

router.post('/', function (req, res, next) {
  const { name } = req.body;
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name], function (err) {
    res.status(201).json({
      id: this.lastID,
      name: name
    });
  });
});

module.exports = router;
