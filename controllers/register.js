const express = require('express');
const auth = require('./../middlewares/isAuth')
let router = express.Router();
const sql = require('./../helpers/querys.json');
let bcrypt = require('bcryptjs');
const db = require('./../helpers/db');

router.post('/createUser', auth.isLogged, (req, res) => {
    db.connect().then((obj) => {
        obj.none(sql.session.insert, [req.body.username,
            bcrypt.hashSync(req.body.password, 10),
            req.body.name
        ]).then(() => {
            res.send({
                message: "OK",
                status: 200
            });
            obj.done();
        }).catch((error) => {
            console.log(error);
            res.send({
                error: error,
                msg: 'Not Created',
                status: 500
            });
            obj.done();
        });
    }).catch((error) => {
        console.log(error);
        res.send({
            error: error,
            msg: 'not Created',
            status: 500
        });
    });
});

module.exports = router;