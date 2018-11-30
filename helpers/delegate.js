const db = require('./db');
const bcrypt = require('bcryptjs');
const sql = require('./queries.js');

module.exports.giveProject = (slaveUser, projectId, user) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.admin.actions.projects.giveProject, [slaveUser, projectId, user])
                .then(() => {
                    res({
                        message: "you delegated your project!",
                        status: 200,
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