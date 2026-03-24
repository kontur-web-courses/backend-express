const express = require('express');

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);
const router = express.Router();


router.get('/', function (req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

router.post('/', function (req, res, next) {
    const newUser = { name: req.body.name };
    const insert = "INSERT INTO users (name) VALUES (@name)";
    db.run(insert, [req.body.name]);
    res.status(201).json(newUser);
});

router.get('/:id', function (req, res, next) {
    const id = Number(req.params.id);

    db.all("SELECT id, name FROM users WHERE id = @targetId", [id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
})

module.exports = router;
