const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth')
let router = express.Router();


router.post('/login', auth.isLogged, function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            res.status(400).send({
                err: "mialma dios"
            })
            return next(err);
        }
        if (!user) {
            return res.status(401).send({
                err: info,
                data: "No es valido"
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).send({
                    err: 'Could not log in user'
                });
            }
            res.status(200).send({
                status: 'Login successful!'
            });
        });
    })(req, res, next);
});

router.get('/logout', auth.isAuth, function(req, res) {
    req.logout();
    res.status(200).send({
        status: 'Bye!'
    });
});

module.exports = router;