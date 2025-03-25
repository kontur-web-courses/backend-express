var express = require('express');
var router = express.Router();


const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
let usersStorage = {
  items: [
    {
      id: 1,
      name: 'Julik'
    },
    {
      id: 2,
      name: 'renover'
    },
    {
      id: 3,
      name: 'meow'
    },
    {
      id: 4,
      name: 'Olega Rasin'
    },
    {
      id: 5,
      name: 'Dmitriy Kosolobik'
    }
  ]
};

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

router.post('/', function (req, res, next) {
  // const newUser = {
  //   id: usersStorage.items.length + 1,
  //   name: req.body.name
  // };
  //
  // usersStorage.items.push(newUser);
  const name = req.body.name;
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name]);

  res.status(201).json(name);
});

module.exports = router;
