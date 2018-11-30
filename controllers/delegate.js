const express = require('express');
let router = express.Router();
const auth = require('./../middlewares/jwtAuth');
const delegate = require('../helpers/delegate');

router.put('/give', auth, (req, res) => {
    if (req.user.type_users_id == 1) {
        delegate.giveProject(req.body.slaveUser, req.body.projectId, req.user.users_id)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.send(err);
            });
    } else {
        res.send({
            err: "forbbiden",
            status: 401
        })
    }
});


module.exports = router;