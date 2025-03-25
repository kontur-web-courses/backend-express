var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text)`);



const users = {
  items: [
    {
      "id": 1,
      "name": "Your mother"
    }
  ]
};
/* GET users listing. */
router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

router.post('/', function(req, res, next) {
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [req.body.name]);
  res.status(201).send();
});


module.exports = router;
