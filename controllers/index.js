const express = require('express');
let router = express.Router();

router.use('/session', require('./session'));
router.use('/register', require('./register'));
router.use('/content', require('./content'));
router.use('/project', require('./projects'));
//router.use('/item', require('./items'));

module.exports = router;