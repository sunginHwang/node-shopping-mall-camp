const { Router } = require('express');
const router = Router()

router.use('/', require('./home'));
router.use('/mypage', require('./mypage'));
router.use('/accounts', require('./accounts'));
router.use('/admin', require('./admin'));
router.use('/auth', require('./auth'));
router.use('/chat', require('./chat'));
router.use('/products',  require('./products'));

//router.use('/contacts', require('./contacts'));

module.exports = router;