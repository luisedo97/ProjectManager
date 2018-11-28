const express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
const User = require('./../helpers/users');


router.post('/createUser', (req, res) => {
    User.registerUser(req.body.username,
            bcrypt.hashSync(req.body.password, 10),
            req.body.name)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        })
});

module.exports = router;