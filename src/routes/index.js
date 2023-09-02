const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');

router.get('/ping', function (req, res) {
  res.ok({ message: 'HEALTH IS GOOD' });
});

router.use('/auth', authRouter);

module.exports = router;
