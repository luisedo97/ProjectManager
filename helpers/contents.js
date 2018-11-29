const db = require('./db');
const bcrypt = require('bcryptjs');
const sql = require('./queries.js');

module.exports.getItemContent = (itemId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any(sql.general.getData, [itemId])
                .then((data) => {
                    res({
                        message: "Get data item sucefully",
                        status: 200,
                        data:data
                    });
                    obj.done();
                }).catch((error) => {
                    rej({
                        error: error,
                        msg: 'Error',
                        status: 500
                    });
                    obj.done();
                });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });;
    });
};