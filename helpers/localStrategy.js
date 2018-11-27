let User = require('./users');
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;

module.exports = new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(username, password, done) {
    console.log(username);
    User.getUserByUsername(username).then((user) => {
        if (user.error) {
            return done(null, false);
        }
        User.comparePassword(password, user.users_password).then((isMatch) => {
            if (isMatch)
                return done(null, user);
            else
                return done(null, false);
        }).catch((err) => {
            return done(null, false);
        });
    }).catch((err) => {
        return done(null, false);
    });
});