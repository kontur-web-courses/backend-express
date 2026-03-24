const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydb.db');
db.run(
  `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name text)`,
);

/* GET users listing. */
router.get('/', function (req, res, next) {
  db.all('SELECT id, name FROM users', [req.params.id], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

router.get('/:id', (req, res) => {

  db.get('SELECT id, name FROM users WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).send('User not found');
    }

    res.json(row);
  });
});

router.post('/', function (req, res) {
  name = req.body.name;

  const insert = 'INSERT INTO users (name) VALUES (?)';

  db.run(insert, [name]);
  res.status(201).send(req.body);
});

module.exports = router;
