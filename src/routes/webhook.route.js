const express = require('express');

const { webhook, webhookConfigure } = require('../controllers/webhook.controller');

const router = express.Router();

router.post('/', webhook);
router.get('/webhookConfig', webhookConfigure);

module.exports = router;
