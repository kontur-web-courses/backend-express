const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

const insert = "INSERT INTO users (name) VALUES (?)";



/* GET users listing. */

db.run(insert, ["Чигвинцев Иван"]);
db.run(insert, ["Ипатов Игорь"]);


router.get('/', function(req, res, next) {

  db.all("SELECT id, name FROM users", [], (err, rows) => {
   if (err) {
      console.log(err);
   } else {
      res.send(rows);
   }
  });
});

router.get('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  db.get(`SELECT id, name FROM users WHERE id = ${id}`, [], (err, row) => {
    if (err) {
      res.status(404).send({ error: 'User not found' });
    } else {
      res.send(row);
    }
  });
});

router.post('/', function(req, res, next) {
  db.run(insert, [req.body.name]);
  res.status(201).send(req.body.name);
})

module.exports = router;
