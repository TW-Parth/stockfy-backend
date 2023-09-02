const { Schema } = require('mongoose');
const { uuid } = require('uuid');
const { dbConnection } = require('../helpers/mongoose.helper');

const ContactUsModel = new Schema(
  {
    firstName: { type: String, default: '', trim: true },
    lastName: { type: String, default: '', trim: true },
    email: { type: String, default: '', trim: true },
    country: { type: String, default: '', trim: true },
    phoneNumber: { type: String, default: '', trim: true },
    message: { type: String, default: '', trim: true },
  },
  {
    timestamps: true,
  },
);

const UserModel = dbConnection.model('contactUs', contactUsSchema, 'contactUs');

module.exports = {
  ContactUsModel,
};
