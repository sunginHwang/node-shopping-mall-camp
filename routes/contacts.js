const express = require('express');
const models = require('../models');
const router = express.Router();


router.get('/', (_, res) => {
    models.Contacts.findAll({}).then(contacts => {
        res.render('contacts/contacts.html', {contacts});
    });
});

router.get('/detail/:id', (req, res) => {
    models.Contacts.findByPk(req.params.id).then(contact => {
        res.render('contacts/detail.html', {contact});
    });
});

router.get('/edit/:id', (req, res) => {
    models.Contacts.findByPk(req.params.id).then(contact => {
        res.render('contacts/form.html', {contact});
    });
});

router.post('/edit/:id', (req, res) => {
    const {name, price, description} = req.body;
    const {id} = req.params;
    models.Contacts.update({name, price, description}, {where: {id}}
    ).then(() => {
        res.redirect(`/contacts/detail/${id}`);
    });

});

router.get('/delete/:id', (req, res) => {
    const {id} = req.params;
    models.Contacts.destroy({
        where: {
            id
        }
    }).then(() => {
        res.redirect('/contacts');
    });
});

router.get('/write', (req, res) => {
    res.render('contacts/form.html');
});

router.post('/write', (req, res) => {
    const {name, price, description} = req.body;
    models.Contacts.create({name, price, description}).then(() => {
        res.redirect('/contacts');
    });
});

module.exports = router;
