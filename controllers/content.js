const express = require('express');
let upload = require('./../helpers/uploads');
const config = require('./../helpers/config');
let router = express.Router();

router.get('/getFile/:filename', (req, res) => {
    res.download(config.uploads + `/${req.params.filename}`);
});
router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send({ status: 200 });
});
module.exports = router;