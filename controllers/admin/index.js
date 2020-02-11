const {Router} = require('express');
const router = Router();
const adminRequired = require('../../middleware/adminRequired');
const csrfProtection = require('../../middleware/csrf');
const upload = require('../../middleware/multer');

const paginate = require('express-paginate');
const ctrl = require('./admin.ctrl');

router.get('/', ctrl.index);
router.get('/products', paginate.middleware(3, 50), ctrl.getProducts);
router.get('/products/detail/:id', ctrl.getProduct);
router.get('/products/edit/:id', adminRequired, csrfProtection, ctrl.getEditProduct);
router.post('/products/detail/:id', adminRequired, csrfProtection, ctrl.editProduct);
router.post('/products/edit/:id', adminRequired, upload.single('thumbnail'), csrfProtection, ctrl.updateProduct);
router.get('/products/delete/:id', ctrl.removeProduct);
router.get('/products/write', adminRequired, csrfProtection, ctrl.getWriteProduct);
router.post('/products/write', adminRequired, upload.single('thumbnail'), csrfProtection, ctrl.writeProduct);
router.get('/products/delete/:product_id/:memo_id', ctrl.getProductMemo);
router.post('/products/ajax_summernote', adminRequired, upload.single('thumbnail'),ctrl.createImage);
router.get('/order', ctrl.get_order );
router.get('/order/edit/:id', ctrl.get_order_edit );
router.get('/statistics', ctrl.statistics );
router.post('/order/edit/:id', ctrl.post_order_edit );
module.exports = router;