const Joi = require('joi');

const contactUsSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(2).max(30).required().trim().error(new Error('Invalid first Name')),
  lastName: Joi.string().alphanum().min(2).max(30).required().trim().error(new Error('Invalid last Name')),
  email: Joi.string().max(30).trim().required().email().error(new Error('Invalid Email')),
  phoneNumber: Joi.string().max(15).trim().optional().error(new Error('Invalid Phone Number')), // Optional
  country: Joi.string().max(50).trim().optional().error(new Error('Invalid Country')), // Optional
  message: Joi.string().max(500).trim().required().error(new Error('Invalid Message')),
});

module.exports = {
  contactUsSchema,
};
