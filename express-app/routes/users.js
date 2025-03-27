const express = require('express');
const routeHandler = express.Router();
let userCounter = 1;
const sqlite = require('sqlite3').verbose();
const database = new sqlite.Database('mydb.db');
database.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP)`);

routeHandler.get('/', (request, response) => {
    database.all("SELECT id, name FROM users", [], (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        response.send(data);
    });
});

routeHandler.post('/', (req, res) => {
    const userName = req.body.name;
    const userEmail = req.body.email;
    
    if (!userName || !userEmail) {
        res.status(400).json({error: "ну чет ты не все ввел, братан"});
        return;
    }
    
    const createdUser = {
        id: userCounter++,
        name: userName,
        email: userEmail,
        createdAt: new Date()
    };
    
    const sqlInsert = "INSERT INTO users (name) VALUES (?)";
    database.run(sqlInsert, [userName]);
    res.status(200).json({createdUser});
});

module.exports = routeHandler;
