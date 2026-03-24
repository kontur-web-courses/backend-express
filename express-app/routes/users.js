const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send({
        items: [
            {
                "id": 1,
                "name": "Vladislav Ershov pidoras"
            },
            {
                "id": 2,
                "name": "Vinogradova Elizaveta"
            },
        ]
    });
});

module.exports = router;
