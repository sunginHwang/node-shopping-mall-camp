const express = require('express');
const router = express.Router();
const ctrl = require('./products.ctrl');

router.get('/:id', ctrl.getProducts);

module.exports = router;