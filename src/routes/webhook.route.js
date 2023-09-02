const express = require('express');

const { validateSchema } = require('../middleware/requestValidator.middleware');
const { webhook, webhookConfigure } = require('../controllers/webhook.controller');

const router = express.Router();

router.post('/', validateSchema(), webhook);
router.get('/webhookConfig', webhookConfigure);

module.exports = router;
