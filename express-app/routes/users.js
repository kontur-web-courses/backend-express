var express = require('express');
var router = express.Router();

class UserItem {
  constructor(name) {
    // this.id = id;
    this.name = name;
  }
}

class UserHandler {
  constructor(items) {
    this.userItems = items;
    this.maxId = items.length;
  }

  addItem(name) {
    // this.maxId++;
    // const newItem = new UserItem(this.maxId, name);
    const newItem = new UserItem(name = name);
    this.userItems.push(newItem);
    return newItem;
  }
}


const testItems = new UserHandler([
  { "id": 1, "name": "name1" },
  { "id": 2, "name": "name2" },
  { "id": 3, "name": "name3" }
]);

/* GET users listing. */
router.get('/', function(req, res) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
  // res.json(testItems);
});

router.post('/', function(req, res) {
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [req.body.name]);
  const newUser = testItems.addItem(req.body.name);
  res.status(201).json('shoud be data from BD dxdx');
});

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text)`);
    
module.exports = router;