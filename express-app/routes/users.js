var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');

db.run(`CREATE TABLE IF NOT EXIST users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name text)`)

router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send({items: rows});
    }
  });
});

router.post('/', function(req, res, next) {
  if (!req.body.name) {
    return res.status(400).send({ error: 'Name is required' });
  }

  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [req.body.name]);

  res.status(201).send({
    id: this.lastID,
    name: req.body.name
  });
});

module.exports = router;
