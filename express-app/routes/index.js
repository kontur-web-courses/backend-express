const express = require('express');
const router = express.Router();

// Middleware для логирования запросов к /
router.use((req, res, next) => {
  console.log(`Request to / - Method: ${req.method}`);
  next();
});

// GET / (рендеринг HTML или JSON)
router.get('/', (req, res) => {
  if (req.accepts('json')) {
    res.json({ message: "Welcome to Express API!", version: "1.0" });
  } else {
    res.render('index', { title: 'Express' });
  }
});


module.exports = router;
