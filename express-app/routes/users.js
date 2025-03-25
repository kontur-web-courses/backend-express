var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
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

  // for (const id of Object.keys(req.query)) {
  //   users.push({
  //     id: id,
  //     user: req.query[id],
  //   });
  // }
  res.send({ users });
});

module.exports = router;
