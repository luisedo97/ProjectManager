const db = require('./db');
const bcrypt = require('bcryptjs');
const sql = require('./queries.js');

module.exports.getItemContent = (itemId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any(sql.general.getData, [itemId])
                .then((data) => {
                    console.log(data);
                    res({
                        message: "Get data item succesfully",
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

module.exports.addItemContent = (itemId, contentUrl, contentDesc) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.general.addData, [itemId, contentUrl, contentDesc])
                .then(() => {
                    res({
                        message: "Item data succesfully created",
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

module.exports.deleteContent = (contentId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.general.deleteData, [contentId])
                .then(() => {
                    res({
                        msg: 'OK. Deleted',
                        status: 200
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

module.exports.updateContent = (itemDesc, contentId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.general.updateData, [itemDesc, contentId])
                .then(() => {
                    res({
                        msg: 'OK. Updated',
                        status: 200
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