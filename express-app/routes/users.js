var express = require('express');
var router = express.Router();

/* DataBase */
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
try {
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
    console.log("БД создано")
} catch {
    console.log("БД уже существует")
}


/* GET users listing. */
router.get('/', function (req, res, next) {
    db.all(
        "SELECT id, name FROM users",
        [],
        (err, rows) => {
            if (err) {
                console.log(`App Error: ${err}`);
                res.status(500).send("Database error");
            } else {
                console.log(`Ok! <${rows}>`);
                res.send(rows);
            }
        }
    );
});

router.post('/', function (req, res, next) {
    if (!req.body || !req.body.name) {
        return res.status(400).send("Name is required");
    }

    db.run(
        "INSERT INTO users (name) VALUES (?)",
        [req.body.name],
        function (err) {
            if (err) {
                console.log(`App Error: ${err}`);
                return res.status(500).send("Database error");
            }
            res.send({id: this.lastID, name: req.body.name});
        }
    );
});

module.exports = router;