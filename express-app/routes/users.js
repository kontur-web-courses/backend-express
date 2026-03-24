const express = require('express');
const router = express.Router();

const users = {
    items: [
        {
            "id": 1,
            "name": "Пеганов Артём"
        },
        {
            "id": 2,
            "name": "Дедков Иван"
        }
    ]
}

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name text)`);

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

router.get('/:id', function(req, res, next) {
    db.all("SELECT id, name FROM users WHERE id=(?)", [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else if (rows.length === 0) {
            res.status(404).send('Not Found');
        } else {
            res.send(rows[0]);
        }
    });
})

router.post('/', function(req, res, next) {
    const newUser = req.body;
    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [newUser.name]);
    res.status(201).json(newUser);
});

module.exports = router;
