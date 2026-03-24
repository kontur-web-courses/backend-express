const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);


/* GET users listing. */
router.get('/', function(req, res, next) {
    return db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

router.post('/', function(req, res, next) {
    const insert = "INSERT INTO users (name) VALUES (@name)";
    db.run(insert, [req.body.name]);
    return res.status(201).json({name : req.body.name});
})

router.get('/:id', function(req, res, next) {
    const userId = parseInt(req.params.id);
    return db.all("SELECT id, name FROM users WHERE id = @userId", [userId], (err, rows) => {
        if (rows.length === 0) {
            console.log(rows);
            res.status(404).send("Not Found");
        } else {
            res.send(rows);
        }
    });
});


module.exports = router;