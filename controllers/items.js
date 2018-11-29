const express = require('express');
let router = express.Router();
const items = require('../helpers/items');
const auth = require('./../middlewares/jwtAuth');


router.post('/createItem', auth, (req, res) => {
    items.createItem(req.body.project_id,
            req.body.items_name,
            req.body.items_des)
        .then((data) => {
            res.send(data);
            
        })
        .catch((err) => {
            res.send(err);
        })
});

router.get('/getListItem', auth, (req, res) => {
    items.getListItem(req.query.project_id)
        .then((data) => {
            res.send(data);
            console.log(data);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.put('/editItem', auth, (req, res) => {
    if(req.body.status == null || undefined){
        items.editItem(req.body.items_id,
            req.body.items_name,
            req.body.items_des)
        .then((data) => {
            res.send(data);
            console.log(data);
        })
        .catch((err) => {
            res.send(err);
        })
    }else{
        items.setItemStatus(req.body.items_id,
            req.body.status)
        .then((data) => {
            res.send(data);
            console.log(data);
        })
        .catch((err) => {
            res.send(err);
        })
    }
    
});

router.delete('/deleteItem', auth, (req, res) => {
    items.editItem(req.body.items_id,
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