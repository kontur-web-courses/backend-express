const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);
db.run(`INSERT INTO users (name) VALUES ("Степан Григорьев"), ("Александр Левенских"); `)


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
	id = parseInt(req.params["id"]);
	db.all("SELECT id, name FROM users WHERE id = ?", [id], (err, rows) => {
		if (rows.length === 0 || err) {
			res.sendStatus(404);
		} else {
			res.send(rows);
		}
	})
});

router.post('/', function(req, res) {
	let name = req.body["name"];
	const insert = "INSERT INTO users (name) VALUES (?)";
	db.run(insert, [name]);
});

module.exports = router;
