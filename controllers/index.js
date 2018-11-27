const express = require('express');
let router = express.Router();

router.use('/session', require('./session'));
router.use('/register', require('./register'));
module.exports = router;