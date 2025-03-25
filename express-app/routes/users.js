var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydb.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)`, (err) => {
    if (err) {
        console.error("Ошибка создания таблицы: ", err);
    } else {
        console.log("Таблица users успешно создана или уже существует");
    }
});

router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.error("Ошибка при получении пользователей: ", err);
      return next(err);
    } else {
      res.send(rows);
    }
  });
});

router.post('/users', function(req, res, next) {
  const user = req.body;
  const name = user.name; 
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name], function(err) {
    if (err) {
      console.error("Ошибка при добавлении пользователя: ", err);
      return next(err);
    }
    user.id = this.lastID;
    res.status(201).json({
      message: 'Пользователь успешно создан',
      user: user
    });
  });
});

module.exports = router;
