const db = require('./db');
const bcrypt = require('bcryptjs');
const sql = require('./querys.json');

module.exports.getUserByUsername = (username) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.one(sql.session.get, [username]).then((data) => {
                res(data);
                obj.done();
            }).catch((error) => {
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });
    });
}

module.exports.comparePassword = (candidatePassword, hash) => {
    return new Promise((res, rej) => {
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
};