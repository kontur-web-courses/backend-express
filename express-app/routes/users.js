var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');

// Initialize database
db.run(`CREATE TABLE IF NOT EXISTS users
        (
            id
            INTEGER
            PRIMARY
            KEY
            AUTOINCREMENT,
            name
            text
        )`);

/* GET users listing. */
router.get('/', function (req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database error');
        } else {
            res.send(rows);
        }
    });
});

router.post('/', function (req, res, next) {
    const {name} = req.body;

    if (!name) {
        return res.status(400).send('Name is required');
    }

    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [name], function (err) {
        if (err) {
            console.log(err);
            res.status(500).send('Database error');
        } else {
            res.send({
                message: "User added successfully",
                id: this.lastID
            });
        }
    });
});

module.exports = router;