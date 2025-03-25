var express = require('express');
const req = require("express/lib/request");
const res = require("express/lib/response");
var router = express.Router();


const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');

let users = [];

router.post('/', (req, res) => {
    const name = req.body.name;
    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [name]);
  return res.status(200)});


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

module.exports = router;
