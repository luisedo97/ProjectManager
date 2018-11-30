const db = require('./db');
const bcrypt = require('bcryptjs');
const sql = require('./queries.js');

module.exports.createItem = (projectId, name, description) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.general.newItem, [name, description, projectId])
                .then(() => {
                    res({
                        message: "OK. item created",
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

module.exports.getListItem = (projectId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any(sql.general.getListItem, [projectId])
                .then((data) => {
                    res({
                        message: "Get list item sucefully",
                        status: 200,
                        data: data
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

module.exports.editItem = (itemId, name, description) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.general.editItemData, [name, description, itemId])
                .then(() => {
                    res({
                        message: "Update item sucefully",
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

module.exports.deleteItem = (itemId, projectId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.general.deleteItem, [itemId, projectId])
                .then(() => {
                    res({
                        message: "Delete item succesfully",
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

module.exports.setItemStatus = (itemId, status) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.general.setItemStatus, [status, itemId])
                .then(() => {
                    res({
                        message: "Change item status sucefully",
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