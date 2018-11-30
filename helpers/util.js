let rimraf = require('rimraf');
const db = require('./db');
const sql = require('./queries');

module.exports.destroyPath = (path) => {
    rimraf(path, () => { console.log('destroyed') });
}

module.exports.getUrl = (contentId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.one(sql.general.getUrl, [contentId]).then((data) => {
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
};

module.exports.getProjectId = (itemId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.one(sql.general.getProjectId, [itemId])
                .then((data) => {
                    res(data);
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

module.exports.deleteFile = (filepath) => {
    fs.rmdirSync(filepath);
};