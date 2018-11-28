const express = require('express');
//let session = require('express-session');
const app = express();
const jwt = require('express-jwt');
const config = require('./helpers/config');
let passport = require('passport');
let strategies = require('./helpers/strategies');

app.use('/views', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(jwt({
    secret: config.secret
}).unless({
    path: ['/session/login', '/register/createUser', '/']
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./controllers'));
app.get('/', function(req, res) {
    res.redirect('views/index.html');
});
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({
            message: 'invalid token...',
            status: 401
        });
    }
});
passport.use(strategies.localStrategy);
passport.use(strategies.jwtStrategy);
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});
app.listen(config.port, function() {
    console.log('Example app listening on port 3001!');
});