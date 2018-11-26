const express = require('express');
let session = require('express-session');
const app = express();
const config = require('./helpers/config');
let passport = require('passport');

app.use('/views', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'sessionsetup',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
    res.redirect('views/index.html');
});

app.listen(config.port, function() {
    console.log('Example app listening on port 3001!');
});