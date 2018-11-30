const express = require('express');
let upload = require('./../helpers/uploads');
const config = require('./../helpers/config');
let router = express.Router();
const content = require('../helpers/contents');

/*router.get('/getFile/:filename', (req, res) => {
    res.download(config.uploads + `/${req.params.filename}`);
});*/

router.get('/getContent',(req,res)=>{
    content.getItemContent(req.query.item_id)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send(err);
    })
})

router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send({ status: 200 });
});

module.exports = router;