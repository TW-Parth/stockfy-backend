const express = require('express');
const { statistics } = require('../controllers/dashboard.controller');
const { isAuth } = require('../middleware/is-auth.middleware');

const router = express.Router();

router.get('/statistics', isAuth, statistics);

module.exports = router;
