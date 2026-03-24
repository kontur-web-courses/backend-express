const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

// const users = [{
//     "id": 1,
//     "name": "Илона"
// }, {
//     "id": 2,
//     "name": "Лёша"
// }];

/* GET users listing. */
router.get('/', function (req, res, next) {
    db.all("SELECT id, name FROM users",[], (err, rows) => {
      if (err) {
          return res.status(500).json({error : 'Ошибка на стороне бд'})
      }
      res.json({items: rows});
    });
});

router.post('/', function (req, res, next) {
    const {name} = req.body;
    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [name], function (err) {
        if (err) {
            return res.status(500)
        }
        const newUser = {
            id: this.lastID,
            name: name,
        }
        return res.status(201).json(newUser);
    });
})

router.get('/:id', function (req, res, next) {
    const userId = req.params.id;
    db.all("SELECT id, name FROM users WHERE id = ?", [userId], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({error: 'Ошибка базы данных'});
        }
        if (rows.length === 0) {
            return res.status(404).json({error: 'Нет такого пользователя'});
        }
        res.send(rows);
    });
})

module.exports = router;
