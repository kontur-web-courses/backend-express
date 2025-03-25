var express = require("express");
var router = express.Router();

let users = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Donald",
  },
  {
    id: 3,
    name: "Trump",
  },
];

/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.send(await getAll());
});

router.post("/", async function(req, res) {
  try {
    const userData = req.body;
    let info = (await getOne(userData.name));
    if (!userData.name) {
      return res.status(400).json({ error: 'Missing required fields: id, name' });
    }

    if (info !== null) {
      return res.status(409).json({ error: 'User with this name already exists' });
    }
    let name = userData.name;
    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [name]);

    res.status(201).json(await getOne(name));
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');

module.exports = router;

// Получение одного пользователя
async function getOne(name) {
  return await new Promise((resolve, reject) => {
    db.get(
        "SELECT id, name FROM users WHERE name = ?",
        [name],
        (err, row) => {
          if (err) reject(err);
          else resolve(row || null);
        }
    );
  });
}

// Получение всех пользователей
async function getAll() {
  return await new Promise((resolve, reject) => {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}