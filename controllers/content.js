const express = require('express');
let upload = require('./../helpers/uploads');
let router = express.Router();
const content = require('../helpers/contents');
const util = require('../helpers/util');
const auth = require('./../middlewares/jwtAuth');

router.get('/getContent', auth, (req, res) => {
    content.getItemContent(req.query.item_id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        })
})

router.post('/upload/:itemId', auth, upload.single('file'), (req, res) => {
    util.getProjectId(req.params.itemId)
        .then((data) => {
            let dir = `./uploads/${data.project_id}/${req.params.itemId}/${req.file.filename}`;
            content.addItemContent(req.params.itemId, dir, req.body.contentDesc).then((data) => {
                res.send(data);
            }).catch((err) => { res.send(err) });
        })
        .catch((err) => { console.log(err) });

});

router.delete('/destroy/:contentId', auth, (req, res) => {
    util.getUrl(req.params.contentId).then((data) => {
        var path = data.item_content_url;
        content.deleteContent(req.params.contentId)
            .then((data) => {
                //util.deleteFile(path);
                res.send(data);
            }).catch((err) => {
                res.send(err);
            })
    }).catch((err) => {
        res.send(err);
    });
});

router.put('/update/:contentId', auth, (req, res) => {
    content.updateContent(req.body.contentDesc, req.params.contentId)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
        })
});

module.exports = router;