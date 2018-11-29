const multer = require('multer');
var fs = require('fs');
const content = require('./contents');
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        content.getProjectId(req.params.itemId)
            .then((data) => {
                let id = data.project_id;
                let dir = `./public/uploads/${req.user.users_id}/${id}/${req.params.itemId}`;

                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                cb(null, dir);
            })
            .catch((err) => { console.log(err) });
    },
    filename: function(req, file, cb) {
        cb(null, `${file.originalname}`)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        switch (file.mimetype) {
            case 'image/jpeg':
                cb(null, true)
                break;
            case 'image/jpg':
                cb(null, true)
                break;
            case 'image/png':
                cb(null, true)
                break;
            case 'image/gif':
                cb(null, true)
                break;
            default:
                return cb(new Error('Wrong file type'))
        }
    }
});

module.exports = upload;