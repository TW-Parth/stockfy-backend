const express = require('express');
const { contactUs } = require('../controllers/contactUs.controller');
const { validateSchema } = require('../middleware/requestValidator.middleware');
const { contactUsSchema } = require('../validators/auth.validator');

const router = express.Router();

router.post('/contactUs', validateSchema(contactUsSchema), contactUs);

module.exports = router;
