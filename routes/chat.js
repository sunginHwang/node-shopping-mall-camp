const {isAuthenticated} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
    res.render('chat/index.html');
});

module.exports = router;