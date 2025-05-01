var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("mydb.db");


db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');

router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    res.json({ items: rows });
  });
});

router.post('/', function(req, res, next) {
  const name = req.body.name;
  db.run("INSERT INTO users (name) VALUES (?)", [name], function(err) {
    res.status(201).json({ id: this.lastID, name: name });
  });
});

module.exports = router;
