const express = require('express');
const router = express.Router();

// Временное хранилище в памяти
let users = [];
let idCounter = 1;

// GET /users
router.get('/', (req, res) => {
  res.json({ items: users });
});

// POST /users
router.post('/', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newUser = {
    id: idCounter++,
    name: name
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
