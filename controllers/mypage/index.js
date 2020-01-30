const { Router } = require('express');
const router = Router();
const {isAuthenticated} = require('../../middleware/auth');
const ctrl = require('./mypage.ctrl');

router.get('/edit',isAuthenticated,  ctrl.getMyInfo);
router.post('/edit',isAuthenticated,  ctrl.edit);

module.exports = router;