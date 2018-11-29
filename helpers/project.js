const db = require('./db');
const bcrypt = require('bcryptjs');
const sql = require('./queries.js');

module.exports.createProject = (userId, name, description) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.general.newProject, [userId,name,description])
                .then(() => {
                    res({
                        message: "OK. Project created",
                        status: 200
                    });
                    obj.done();
                }).catch((error) => {
                    rej({
                        error: error,
                        msg: 'not Created',
                        status: 500
                    });
                    obj.done();
                });
        });
    });
};

module.exports.getListProject = (userId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any(sql.general.getListProject, [userId])
                .then((data) => {
                    res({
                        message: "Get list project sucefully",
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

module.exports.editProject = (projectId, name, description,userId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.general.editProject, [name,description,projectId,userId])
                .then(() => {
                    res({
                        message: "Update project sucefully",
                        status: 200,
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

module.exports.deleteProject = (projectId,userId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.general.deleteProject, [projectId,userId])
                .then(() => {
                    res({
                        message: "Delete project sucefully",
                        status: 200,
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

module.exports.setProjectStatus = (projectId,status) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.general.setProjectStatus, [projectId,status])
                .then(() => {
                    res({
                        message: "Update project sucefully",
                        status: 200,
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