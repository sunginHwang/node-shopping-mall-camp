const express = require('express');
const ctrl = require('./contacts.ctrl');
const router = express.Router();


router.get('/', ctrl.getContacts);
router.get('/detail/:id', ctrl.getContact);
router.post('/detail/:id', ctrl.goWriteContactPage);
router.get('/edit/:id', ctrl.goEditContactPage);
router.post('/edit/:id', ctrl.modifyContact);
router.get('/delete/:id',ctrl.removeContact);
router.get('/write', ctrl.goWritePage);
router.post('/write', ctrl.createContact);
router.get('/delete/:contact_id/:memo_id',ctrl.removeContactMemo);

module.exports = router;