const express = require('express');
const router = express.Router();
const webhookRouter = require('./webhook.route');
const authRouter = require('./auth.route');
const productRouter = require('./product.route');
const { required } = require('joi');

router.get('/ping', function (req, res) {
  res.ok({ message: 'HEALTH IS GOOD' });
});

router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/webhook', webhookRouter);

module.exports = router;
