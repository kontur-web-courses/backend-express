const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()


const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

/* GET users listing. */
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
    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [req.body.name], (err) => {
        if (err !== null) {
            res.status(400).json({error: "Error during user creation"});
        }
    });
    res.status(201);
});

router.get('/:id', function (req, res, next) {
    const id = parseInt(req.params.id, 10);
    db.all("SELECT id, name FROM users WHERE id = ?", [id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;
