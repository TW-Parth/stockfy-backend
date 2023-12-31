const { Schema } = require('mongoose');
const { uuid } = require('uuid');
const { USER_ROLES, USER_STATUS } = require('../constants/enums');
const { dbConnection } = require('../helpers/mongoose.helper');

const userSchema = new Schema(
  {
    id: { type: String, default: uuid },
    firstName: { type: String, default: '', trim: true },
    lastName: { type: String, default: '', trim: true },
    email: { type: String, default: '', trim: true },
    hashedPassword: { type: String, default: '', trim: true },
    passwordSalt: { type: String, default: '', trim: true },
    isEmailVerified: { type: Boolean, default: false },
    forgotPasswordToken: { type: String, default: '', trim: true },
    emailVerificationToken: { type: String, default: '', trim: true },
    isDeleted: { type: Boolean, default: false },
    userRole: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    userStatus: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    avatarId: { type: String, default: '', trim: true },
    gstNumber: { type: String, default: '', trim: true },
    eCommerceName: { type: String, default: '', trim: true },
    eCommerceWebsite: { type: String, default: '', trim: true },
    phoneNumber: { type: String, default: '', trim: true },
  },
  {
    timestamps: true,
  },
);

const UserModel = dbConnection.model('users', userSchema, 'users');

module.exports = {
  UserModel,
};
