const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

const express = require('express');
const router = express.Router();

let users = [
    {id: 1, name: 'Аня'},
    {id: 2, name: 'Настя'},
    {id: 3, name: 'Тима'}
];

router.get('/', function (req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'DB error' });
        }
        res.send({
            items: rows
        });
    });
})

router.get('/:id', function (req, res, next) {
    const id = req.params.id;

    db.get("SELECT id, name FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
            console.log(err);
        }

        if (!row) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send(row);
    });
});

router.post('/', function (req, res, next) {
    const { name } = req.body;
    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [name]);
    res.status(201).send();
})

module.exports = router;