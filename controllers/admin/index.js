const {Router} = require('express');
const router = Router();
const loginRequired = require('../../middleware/loginRequired');
const csrfProtection = require('../../middleware/csrf');
const upload = require('../../middleware/multer');

const paginate = require('express-paginate');
const ctrl = require('./admin.ctrl');

router.get('/', ctrl.index);
router.get('/products', paginate.middleware(3, 50), ctrl.getProducts);
router.get('/products/detail/:id', ctrl.getProduct);
router.get('/products/edit/:id', loginRequired, csrfProtection, ctrl.getEditProduct);
router.post('/products/detail/:id', loginRequired, csrfProtection, ctrl.editProduct);
router.post('/products/edit/:id', loginRequired, upload.single('thumbnail'), csrfProtection, ctrl.updateProduct);
router.get('/products/delete/:id', ctrl.removeProduct);
router.get('/products/write', loginRequired, csrfProtection, ctrl.getWriteProduct);
router.post('/products/write', loginRequired, upload.single('thumbnail'), csrfProtection, ctrl.writeProduct);
router.get('/products/delete/:product_id/:memo_id', ctrl.getProductMemo);
router.post('/products/ajax_summernote', loginRequired, upload.single('thumbnail'),ctrl.createImage);

module.exports = router;