const { Router } = require('express');
const {isAuthenticated} = require('../../middleware/auth');
const router = Router();
const ctrl = require('./chat.ctrl');

router.get('/', isAuthenticated, ctrl.index);

module.exports = router;