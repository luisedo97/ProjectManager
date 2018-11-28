const express = require('express');
let router = express.Router();
const Project = require('../helpers/project');
const auth = require('./../middlewares/jwtAuth');


router.post('/createProject', auth, (req, res) => {
    Project.createProject(req.user.users_id,
            req.body.project_name,
            req.body.project_des)
        .then((data) => {
            res.send(data);
            
        })
        .catch((err) => {
            res.send(err);
        })
});

router.get('/getListProject', auth, (req, res) => {
    Project.getListProject(req.user.users_id)
        .then((data) => {
            res.send(data);
            console.log(data);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.put('/editProject', auth, (req, res) => {
    Project.editProject(req.body.project_id,
            req.body.project_name,
            req.body.project_des,
            req.user.users_id)
        .then((data) => {
            res.send(data);
            console.log(data);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.put('/deleteProject', auth, (req, res) => {
    Project.editProject(req.body.project_id,
            req.user.users_id)
        .then((data) => {
            res.send(data);
            console.log(data);
        })
        .catch((err) => {
            res.send(err);
        })
});

module.exports = router;