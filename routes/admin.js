const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('admin app');
});

router.get('/products', async (_, res) => {
    const products = await models.Products.findAll({});
    // DB에서 받은 products를 products변수명으로 내보냄
    res.render('admin/products.html', {products});
});

router.get('/products/detail/:id', async (req, res) => {
    const product = await models.Products.findByPk(req.params.id);
    res.render('admin/detail.html', {product});
});

router.get('/products/edit/:id', async (req, res) => {
    const product = await models.Products.findByPk(req.params.id);
    res.render('admin/form.html', {product});
});

router.post('/products/edit/:id', async (req, res) => {
    const {name, price, description} = req.body;
    const {id} = req.params;
    await models.Products.update({name, price, description}, {where: {id}})
    res.redirect(`/admin/products/detail/${id}`);


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

router.get('/products/write', (req, res) => {
    res.render('admin/form.html');
});

router.post('/products/write', async (req, res) => {
    const {name, price, description} = req.body;
    await models.Products.create({name, price, description});
    res.redirect('/admin/products');
});

module.exports = router;
