const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text)`);

var express = require('express');
var router = express.Router();

const insert = 'INSERT INTO users (name) VALUES (?)';

const users = {
    items: [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
    ],
    nextId: 4,
};

/* GET users listing. */
router.get('/', function (req, res, next) {
    db.all('SELECT id, name FROM users', [], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

router.post('/', function (req, res, next) {
    const name = req.body.name;
    db.run(insert, [name]);

    res.status(200).json({ message: 'User added' });
});

module.exports = router;
