const express = require('express');
const router = express.Router();


const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);


let a = {items : [{
    "id": 1,
    "name": "name"
  },
    {
      "id": 2,
      "name": "Ирина"
    },
    {
      "id": 3,
      "name": "Денис"
    }]};
/* GET users listing. */
router.get('/', function(req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    });
  res.send(a);
});

router.post('/', function(req, res, next) {

  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [req.body]);

  let newUser = req.body;
  a.push(newUser);
  res.status(201).json(newUser);
});

router.get('/:id', function(req, res, next) {
  let id = parseInt(req.params.id);
  const user = a.items.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({})
  }else{
    res.json(user);
  }
})



module.exports = router;
