const express = require('express');
const models = require('../models');
const router = express.Router();
// csrf 셋팅
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});

//이미지 저장되는 위치 설정
const path = require('path');
const uploadDir = path.join(__dirname, '../uploads'); // 루트의 uploads위치에 저장한다.
const fs = require('fs');


//multer 셋팅
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => { //이미지가 저장되는 도착지 지정
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => { // products-날짜.jpg(png) 저장
        callback(null, 'products-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});
const upload = multer({storage: storage});

router.get('/', (req, res) => {
    res.send('admin app');
});

router.get('/products', async (_, res) => {
    const products = await models.Products.findAll({});
    // DB에서 받은 products를 products변수명으로 내보냄
    res.render('admin/products.html', {products});
});

router.get('/products/detail/:id', async (req, res) => {
    try {
        const product = await models.Products.findOne({
            where: {
                id: req.params.id
            },
            include: [
                'Memo'
            ]
        });
        res.render('admin/detail.html', {product});
    } catch (e) {
        console.log(e);
    }

});

router.get('/products/edit/:id', csrfProtection, async (req, res) => {
    const product = await models.Products.findByPk(req.params.id);
    res.render('admin/form.html', {product, csrfToken: req.csrfToken()});
});

router.post('/products/detail/:id', async (req, res) => {

    try {
        const product = await models.Products.findByPk(req.params.id);
        // create + as에 적은 내용 ( Products.js association 에서 적은 내용 )
        await product.createMemo(req.body)
        res.redirect('/admin/products/detail/' + req.params.id);

    } catch (e) {
        console.log(e)
    }

});


router.post('/products/edit/:id', upload.single('thumbnail'), csrfProtection, async (req, res) => {

    try {
        // 이전에 저장되어있는 파일명을 받아오기 위함
        const product = await models.Products.findByPk(req.params.id);

        // 파일요청이면 파일명을 담고 아니면 이전 DB에서 가져온다
        req.body.thumbnail = (req.file) ? req.file.filename : product.thumbnail;

        await models.Products.update(
            req.body,
            {
                where: {id: req.params.id}
            }
        );
        res.redirect('/admin/products/detail/' + req.params.id);

    } catch (e) {

    }

});

router.post('/products/edit/:id', upload.single('thumbnail'), csrfProtection, async (req, res) => {

    try {
        // 이전에 저장되어있는 파일명을 받아오기 위함
        const product = await models.Products.findByPk(req.params.id);

        if (req.file && product.thumbnail) {  //요청중에 파일이 존재 할시 이전이미지 지운다.
            fs.unlinkSync(uploadDir + '/' + product.thumbnail);
        }

        // 파일요청이면 파일명을 담고 아니면 이전 DB에서 가져온다
        req.body.thumbnail = (req.file) ? req.file.filename : product.thumbnail;

        await models.Products.update(
            req.body,
            {
                where: {id: req.params.id}
            }
        );
        res.redirect('/admin/products/detail/' + req.params.id);

    } catch (e) {

    }

});

router.get('/products/delete/:id', async (req, res) => {
    const {id} = req.params;
    await models.Products.destroy({
        where: {
            id
        }
    });
    res.redirect('/admin/products');
});

router.get('/products/write', csrfProtection, (req, res) => {
    res.render('admin/form.html', {csrfToken: req.csrfToken()});
});


router.post('/products/write', upload.single('thumbnail'), csrfProtection, async (req, res) => {
    console.log(req.file);
    try {
        req.body.thumbnail = (req.file) ? req.file.filename : "";
        await models.Products.create(req.body);
        res.redirect('/admin/products');
w
    } catch (e) {

    }
});


router.get('/products/delete/:product_id/:memo_id', async (req, res) => {

    try {

        await models.ProductsMemo.destroy({
            where: {
                id: req.params.memo_id
            }
        });
        res.redirect('/admin/products/detail/' + req.params.product_id);

    } catch (e) {

    }

});

module.exports = router;
