const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('mydb.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name TEXT
)`);

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ items: rows });
    }
  });
});

/* GET user by id. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  
  db.get("SELECT id, name FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(row);
    }
  });
});

/* POST create user. */
router.post('/', function(req, res, next) {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name], function(err) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, name });
    }
  });
});

module.exports = router;