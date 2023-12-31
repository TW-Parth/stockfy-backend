const Joi = require('joi');

const signupSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(2).max(30).required().trim().error(new Error('Invalid first Name')),
  lastName: Joi.string().alphanum().min(2).max(30).required().trim().error(new Error('Invalid last Name')),
  email: Joi.string().max(30).trim().required().email().error(new Error('Invalid Email')),
  password: Joi.string().min(8).required().trim().error(new Error('Invalid password')),
  gstNumber: Joi.string().max(15).trim().optional().error(new Error('Invalid GST Number')),
  eCommerceName: Joi.string().max(50).trim().optional().error(new Error('Invalid Ecommerce Name')),
  eCommerceWebsite: Joi.string().uri().trim().optional().error(new Error('Invalid E-commerce Website URL')),
  phoneNumber: Joi.string().max(15).trim().optional().error(new Error('Invalid Phone Number')),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().max(30).trim().required().email().error(new Error('Invalid email')),
  password: Joi.string().min(8).max(30).required().trim().error(new Error('Invalid password')),
});

const forgotPasswordSchema = Joi.object().keys({
  email: Joi.string().max(30).trim().required().email().error(new Error('Invalid email')),
});

const updateProfileSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(2).max(30).required().trim().error(new Error('Invalid first Name')),
  lastName: Joi.string().alphanum().min(2).max(30).required().trim().error(new Error('Invalid last Name')),
  phoneNumber: Joi.string().min(10).max(15).trim().optional().error(new Error('Invalid phone Number')),
  eCommerceName: Joi.string().max(50).trim().optional().error(new Error('Invalid eCommerce Name')),
  eCommerceWebsite: Joi.string().uri().trim().optional().error(new Error('Invalid eCommerce Website')),
});

const updatePasswordSchema = Joi.object().keys({
  oldPassword: Joi.string().min(8).required().trim().error(new Error('Invalid old password')),
  newPassword: Joi.string().min(8).required().trim().error(new Error('Invalid new password')),
});

module.exports = {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  updateProfileSchema,
  updatePasswordSchema,
};
