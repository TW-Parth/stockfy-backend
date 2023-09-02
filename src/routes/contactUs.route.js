const express = require('express');
const { contactUs, getAll } = require('../controllers/contactUs.controller');
const { validateSchema } = require('../middleware/requestValidator.middleware');
const { contactUsSchema } = require('../validators/contactUs.validator');

const router = express.Router();

router.post('/contactUs', validateSchema(contactUsSchema), contactUs);
router.get('/', getAll);

module.exports = router;
