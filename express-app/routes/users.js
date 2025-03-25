var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text)`);

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
    let name = req.body.name;
    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [name]);
    res.send(req.body)
});

router.delete('/:id', function(req, res, next) {
  const userId = req.params.id;
  const del = "DELETE FROM users WHERE id = ?";
  db.run(del, [userId], function(err) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Delete failed' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: `User with ID ${userId} deleted` });
    }
  });
});


module.exports = router;