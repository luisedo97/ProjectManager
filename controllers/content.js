const express = require('express');
const multer = require('multer');
// const util = require('../helpers/util');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`)
       }
    })
let upload = multer({storage:storage});
let router = express.Router();

router.get('/getFile/:filename',(req,res)=>{ 
    res.download(`${__dirname}/../public/uploads/${req.params.filename}`);
});
router.post('/uploadSingFile',upload.single('file'),(req,res)=>{
    console.log(req.file);
    res.send({status:200});
});
router.post('/uploadMultFile',upload.array('files[]'),(req,res)=>{
    res.send({status:200});
});
module.exports = router;