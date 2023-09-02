const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const productRouter = require('./product.route');
const contactUsRouter = require('./contactUs.route');

router.get('/ping', function (req, res) {
  res.ok({ message: 'HEALTH IS GOOD' });
});

router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/contact', contactUsRouter);

module.exports = router;
