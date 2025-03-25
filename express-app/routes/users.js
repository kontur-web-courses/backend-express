var express = require('express');
var router = express.Router();

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
    let user = req.body;
    const name = user.name;
    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [name]);
    res.send(user);
})

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
/*
db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text)`);
 */

module.exports = router;
