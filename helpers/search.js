const db = require('./db');
const sql = require('./queries.js');

module.exports.searchUser = (value) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any(sql.admin.actions.search.searchUsernames, [value])
                .then((data) => {
                    res({
                        message: "you got users",
                        status: 200,
                        data: data
                    });
                    obj.done();
                }).catch((error) => {
                    rej({
                        error: error,
                        msg: 'Error',
                        status: 403
                    });
                    obj.done();
                });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });;
    });
};

module.exports.searchProject = (value) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any(sql.admin.actions.search.searchProjects, [value])
                .then((data) => {
                    res({
                        message: "you got projects",
                        status: 200,
                        data: data
                    });
                    obj.done();
                }).catch((error) => {
                    rej({
                        error: error,
                        msg: 'Error',
                        status: 403
                    });
                    obj.done();
                });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });;
    });
};