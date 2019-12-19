const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('admin app');
});

router.get('/products', (_, res) => {
    models.Products.findAll({}).then(products => {
        // DB에서 받은 products를 products변수명으로 내보냄
        res.render('admin/products.html', {products});
    });
});

router.get('/products/detail/:id', (req, res) => {
    models.Products.findByPk(req.params.id).then(product => {
        res.render('admin/detail.html', {product});
    });
});

router.get('/products/edit/:id', (req, res) => {
    models.Products.findByPk(req.params.id).then(product => {
        res.render('admin/form.html', {product});
    });
});

router.post('/products/edit/:id', (req, res) => {
    const {name, price, description} = req.body;
    const {id} = req.params;
    models.Products.update({name, price, description}, {where: {id}}
    ).then(() => {
        res.redirect(`/admin/products/detail/${id}`);
    });

});

router.get('/products/delete/:id', (req, res) => {
    const {id} = req.params;
    models.Products.destroy({
        where: {
            id
        }
    }).then(() => {
        res.redirect('/admin/products');
    });
});

router.get('/products/write', (req, res) => {
    res.render('admin/form.html');
});

router.post('/products/write', (req, res) => {
    const {name, price, description} = req.body;
    models.Products.create({name, price, description}).then(() => {
        res.redirect('/admin/products');
    });
});

module.exports = router;
