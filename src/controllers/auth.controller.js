const { UserModel } = require('../models/user.model');
const crypto = require('crypto');
const { hashString } = require('../helpers/crypto.helper');
const { jwtToken } = require('../helpers/jwtToken.helper');

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gstNumber, eCommerceName, eCommerceWebsite, phoneNumber } = req.validatedParams;

    const salt = crypto.randomBytes(16).toString('hex');
    const { hashStr } = hashString({ password, salt });

    const user = new UserModel({
      firstName,
      lastName,
      email,
      hashedPassword: hashStr,
      passwordSalt: salt,
      gstNumber,
      eCommerceName,
      eCommerceWebsite,
      phoneNumber,
    });

    const signupToken = jwtToken({ email });
    user.emailVerificationToken = signupToken.token;
    await user.save();

    const { token } = jwtToken({ email, userId: user.id });
    const userData = await UserModel.findById(user._id).select('-createdAt -updatedAt -isDeleted -emailVerificationToken -forgotPasswordToken -passwordSalt -hashedPassword');

    return res.ok({ data: { user: userData, token: token } });
  } catch (error) {
    console.log(error);
    res.internalServerError();
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.validatedParams;
    const user = await UserModel.findOne({ email: email, isDeleted: false });
    if (!user) {
      return res.error('Invalid email or password');
    }

    const salt = user.passwordSalt;
    const { hashStr } = hashString({ password, salt });
    const isVerified = hashStr === user.hashedPassword;
    if (!isVerified) {
      return res.error('Invalid email or password');
    }
    const { token } = jwtToken({ email: email, userId: user._id });

    const userData = await UserModel.findById(user._id).select('-createdAt -updatedAt -isDeleted -emailVerificationToken -forgotPasswordToken -passwordSalt -hashedPassword');
    return res.ok({
      data: {
        user: userData,
        token,
      },
    });
  } catch (error) {
    res.internalServerError();
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await UserModel.findById(userId).select('-createdAt -updatedAt -isDeleted -emailVerificationToken -forgotPasswordToken -passwordSalt -hashedPassword');
    if (!userData) {
      return res.error('Invalid user');
    }

    return res.ok({
      data: {
        user: userData,
      },
    });
  } catch (error) {
    console.log('--error::::', error);
    res.internalServerError();
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, telephone } = req.validatedParams;
    const userId = req.userId;

    console.log('userId from update profile :::::: >>>>>', userId);

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.error('Invalid user');
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.telephone = telephone;

    await user.save();

    return res.ok({
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.log('--error::::', error);
    res.internalServerError();
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { oldPassword, newPassword } = req.validatedParams;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.error('Invalid user');
    }

    const { hashStr } = hashString({
      password: oldPassword,
      salt: user.passwordSalt,
    });
    if (hashStr !== user.hashedPassword) {
      return res.error('Invalid old password');
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const { hashStr: newHashStr } = hashString({ password: newPassword, salt });
    user.hashedPassword = newHashStr;
    user.passwordSalt = salt;

    await user.save();

    return res.ok({
      data: {},
    });
  } catch (error) {
    res.internalServerError();
  }
};

const logout = async (req, res) => {
  try {
    if (!req.userId) {
      res.error('Not authenticated');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.error('Auth fail');
    }
    const newTokens = token;

    await UserModel.findByIdAndUpdate(req.userId, { tokens: newTokens });
    res.ok({ data: {} });
  } catch (error) {
    console.log(error);
    res.internalServerError();
  }
};

module.exports = {
  signup,
  login,
  getProfile,
  updateProfile,
  updatePassword,
  logout,
};
