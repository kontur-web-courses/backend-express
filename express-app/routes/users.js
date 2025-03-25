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
router.get("/", function (req, res, next) {
  // for (const id of Object.keys(req.query)) {
  //   users.push({
  //     id: id,
  //     user: req.query[id],
  //   });
  // }
  res.send({ users });
});

router.post("/", function(req, res) {
  try {
    const userData = req.body;

    if (!userData.id || !userData.name) {
      return res.status(400).json({ error: 'Missing required fields: id, name' });
    }

    if (users[userData.id]) {
      return res.status(409).json({ error: 'User with this id already exists' });
    }

    users[userData.id] = {
      id: userData.id,
      name: userData.name
    };

    res.status(201).json(users[userData.id]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
