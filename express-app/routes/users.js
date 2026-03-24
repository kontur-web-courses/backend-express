const express = require("express");
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
   const db = new sqlite3.Database('mydb.db');
   db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text)`);

/* GET users listing. */
router.get("/", function (req, res, next) {
  const users = db.all("SELECT id, name FROM users", [], (err, rows) => {
      if (err) {
         console.log(err);
      } else {
         res.send(rows);
      }
   });
});

router.post("/", function (req, res, next) {
  // console.log(req.body)
  const name = req.body.name;
  const insert = "INSERT INTO users (name) VALUES (?)";
   db.run(insert, [name], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Ошибка при сохранении пользователя');
    }
    const newUser = {
      id: this.lastID,
      name: req.body.name,
    };
    res.status(201).json(newUser);
   });
});

router.get('/:id', function(req, res, next) {
    const sql = "SELECT * FROM users WHERE id = ?"
    const params = [req.params.id];
    
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(500).send({ error: err.message });
        return;
      }
      if (!row) {
          res.status(404).send({ message: 'User not found' });
        } else {
          res.send(row);
        }
    })
});

module.exports = router;
