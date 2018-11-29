let rimraf = require('rimraf');

module.exports.destroyPath = (path) => {
    rimraf(path, () => { console.log('destroyed') });
}