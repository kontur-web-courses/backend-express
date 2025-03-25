const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: "хопесима" },
  { id: 2, name: "райан гослинг" },
  { id: 3, name: "мурад" }
];

// GET /users
router.get('/', (req, res) => {
  res.json({ items: users });
});

// POST /users
router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Имя обязательно" });
  }

  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);
  res.status(201).json(newUser); // 201 Created
});

module.exports = router;