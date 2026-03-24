const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydb.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name text
)`);

router.get('/', function(req, res) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ items: rows });
  });
});

router.get('/:id', function(req, res) {
  const id = Number(req.params.id);

  db.get("SELECT id, name FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(row);
  });
});

router.post('/', function(req, res) {
  const { name } = req.body;

  const insert = "INSERT INTO users (name) VALUES (?)";

  db.run(insert, [name], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ id: this.lastID, name });
  });
});

module.exports = router;
