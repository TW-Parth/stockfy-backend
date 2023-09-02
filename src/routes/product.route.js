const express = require('express');
const { importProducts } = require('../controllers/product.controller');
const { isAuth } = require('../middleware/is-auth.middleware');

const router = express.Router();

router.post('/import', isAuth, importProducts);

module.exports = router;
