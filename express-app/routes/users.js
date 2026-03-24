const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

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
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
       console.log(err);
    } else {
      let user = null;
      let findUser = false;
    
      for (const us of rows) {
        if (us["id"] == req.params["id"]) {
          user = us;
          findUser = true;
          break
        }
      }
    
      if (!findUser)
        res.status(404)
      res.send(user);
    }
 });
  
});

router.post('/', function(req, res, next) {
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [req.body["name"]]);
  res.status(201).json(req.body);
})

module.exports = router;
