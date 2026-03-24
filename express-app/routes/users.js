const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
                                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                                           name text)`);



router.get('/', function(req, res) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.json({ items: rows });
    }
  });
});


router.post('/', function(req, res) {
  const name = req.body.name;

  if (!name) {
    return res.status(400).send("Name is required");
  }

  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name], function(err) {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }

    const newUser = {
      id: this.lastID,
      name: name
    };
    res.status(201).json(newUser);
  });
});

router.get('/:id', function(req, res) {
  const id = req.params.id;
  const sql = "SELECT id, name FROM users WHERE id = ?";

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else if (!row) {
      res.status(404).send("Not Found");
    } else {
      res.json(row);
    }
  });
});

module.exports = router;