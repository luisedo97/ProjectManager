const express = require('express');
let upload = require('./../helpers/uploads');
let router = express.Router();
const content = require('../helpers/contents');
const auth = require('./../middlewares/jwtAuth');

router.get('/getContent', auth, (req, res) => {
    content.getItemContent(req.query.itemId)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        })
})

router.post('/upload/:itemId', auth, upload.single('file'), (req, res) => {
    content.getProjectId(req.params.itemId)
        .then((data) => {
            let id = data.project_id;
            let dir = `./public/uploads/${req.user.users_id}/${req.query.projectId}/${req.params.itemId}/${req.file.filename}`;
            content.addItemContent(req.params.itemId, dir, req.body.contentDesc).then((data) => {
                res.send(data);
            }).catch((err) => { res.send(err) });
        })
        .catch((err) => { console.log(err) });

});

router.delete('/destroy/:contentId', auth, (req, res) => {
    content.deleteContent(req.params.contentId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
});

router.put('/update/:contentId', auth, (req, res) => {
    content.updateContent(req.body.contentDesc, req.params.contentId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
});

module.exports = router;