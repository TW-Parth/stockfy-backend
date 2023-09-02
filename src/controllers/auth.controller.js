const messages = require("../constants/messages.json");
const { UserModel } = require("../models/user.model");
const crypto = require("crypto");
const { hashString } = require("../helpers/crypto.helper");
const { jwtToken } = require("../helpers/jwtToken.helper");
const { USER_STATUS } = require("../constants/enums");
const { error } = require("console");

// const signup = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;
//     console.log(firstName, lastName, email, password);

//     const regUser = await UserModel.findOne({
//       email: email,
//       isDeleted: false,
//       userStatus: { $ne: USER_STATUS.BLOCKED },
//     });
//     if (regUser) {
//       return res.status(400).json({
//         statusCode: 400,
//         code: "FAIL",
//         message:
//           regUser.userStatus === USER_STATUS.PENDING_VERIFICATION
//             ? "Please Verify Your email address, check your mail"
//             : "user already exist, please login to continue",
//         data: {},
//       });
//     }
//     const salt = crypto.randomBytes(16).toString("hex");
//     const { hashStr } = hashString({ password, salt });
//     const user = new UserModel({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       hashedPassword: hashStr,
//       passwordSalt: salt,
//     });

//     const signupToken = jwtToken({ email: email });
//     user.emailVerificationToken = signupToken.token;
//     await user.save();
//     const { token } = jwtToken({ email: email, userId: user.id });
//     const userData = await UserModel.findById(user._id).select(
//       "-createdAt -updatedAt -isDeleted -emailVerificationToken -forgotPasswordToken -passwordSalt -hashedPassword"
//     );
//     return res.status(200).json({
//       statusCode: 200,
//       code: "SUCCESS",
//       message: messages.SUCCESS_MESSAGE,
//       data: {
//         user: userData,
//         token: token,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       statusCode: 500,
//       code: "FAIL",
//       message: messages.INTERNAL_SERVER_ERROR_MESSAGE,
//       error: error,
//       data: {},
//     });
//   }
// };

const signup = async (req, res) => {
  console.log("Entered -----> ");
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gstNumber,
      ecommerceName,
      ecommerceWebsite,
      phoneNumber,
    } = req.body;

    const salt = crypto.randomBytes(16).toString("hex");
    const { hashStr } = hashString({ password, salt });

    const user = new UserModel({
      firstName,
      lastName,
      email,
      hashedPassword: hashStr,
      passwordSalt: salt,
      gstNumber,
      ecommerceName,
      ecommerceWebsite,
      phoneNumber,
    });

    const signupToken = jwtToken({ email });
    user.emailVerificationToken = signupToken.token;
    await user.save();

    const { token } = jwtToken({ email, userId: user.id });
    const userData = await UserModel.findById(user._id).select(
      "-createdAt -updatedAt -isDeleted -emailVerificationToken -forgotPasswordToken -passwordSalt -hashedPassword"
    );

    return res.status(200).json({
      statusCode: 200,
      code: "SUCCESS",
      message: messages.SUCCESS_MESSAGE,
      data: {
        user: userData,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      code: "FAIL",
      message: messages.INTERNAL_SERVER_ERROR_MESSAGE,
      error: error,
      data: {},
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email, isDeleted: false });
    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        code: "FAIL",
        message: 'Invalid email or password"',
        data: {},
      });
    }

    const salt = user.passwordSalt;
    const { hashStr } = hashString({ password, salt });
    const isVerified = hashStr === user.hashedPassword;
    if (!isVerified) {
      return res.status(400).json({
        statusCode: 400,
        code: "FAIL",
        message: "Invalid email or password",
        data: {},
      });
    }
    const { token } = jwtToken({ email: email, userId: user._id });

    const userData = await UserModel.findById(user._id).select(
      "-createdAt -updatedAt -isDeleted -emailVerificationToken -forgotPasswordToken -passwordSalt -hashedPassword"
    );
    return res.status(200).json({
      statusCode: 200,
      code: "SUCCESS",
      message: messages.SUCCESS_MESSAGE,
      data: {
        user: userData,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      code: "FAIL",
      message: messages.INTERNAL_SERVER_ERROR_MESSAGE,
      error: error,
      data: {},
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("--userId:::", userId);
    const userData = await UserModel.findById(userId).select(
      "-createdAt -updatedAt -isDeleted -emailVerificationToken -forgotPasswordToken -passwordSalt -hashedPassword"
    );
    if (!userData) {
      return res.status(400).json({
        statusCode: 400,
        code: "FAIL",
        message: "Invalid user",
        data: {},
      });
    }

    return res.status(200).json({
      statusCode: 200,
      code: "SUCCESS",
      message: messages.SUCCESS_MESSAGE,
      data: {
        user: userData,
      },
    });
  } catch (error) {
    console.log("--error::::", error);
    res.status(500).json({
      statusCode: 500,
      code: "FAIL",
      message: messages.INTERNAL_SERVER_ERROR_MESSAGE,
      error: error,
      data: {},
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, telephone } = req.body;

    console.log("userId from update profile :::::: >>>>>", userId);

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        code: "FAIL",
        message: "Invalid user",
        data: {},
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.telephone = telephone;

    await user.save();

    return res.status(200).json({
      statusCode: 200,
      code: "SUCCESS",
      message: "Profile updated successfully",
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.log("--error::::", error);
    res.status(500).json({
      statusCode: 500,
      code: "FAIL",
      message: "Internal server error",
      error: error,
      data: {},
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { oldPassword, newPassword } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        code: "FAIL",
        message: "Invalid user",
        data: {},
      });
    }

    const { hashStr } = hashString({
      password: oldPassword,
      salt: user.passwordSalt,
    });
    if (hashStr !== user.hashedPassword) {
      return res.status(400).json({
        statusCode: 400,
        code: "FAIL",
        message: "Invalid old password",
        data: {},
      });
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const { hashStr: newHashStr } = hashString({ password: newPassword, salt });
    user.hashedPassword = newHashStr;
    user.passwordSalt = salt;

    await user.save();

    return res.status(200).json({
      statusCode: 200,
      code: "SUCCESS",
      message: "Password updated successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      code: "FAIL",
      message: "Internal server error",
      error: error,
      data: {},
    });
  }
};

const logout = async (req, res) => {
  try {
    if (!req.userId) {
      res.status(401).json({ success: false, message: "Not authenticated" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Auth fail" });
    }
    const newTokens = token;

    await UserModel.findByIdAndUpdate(req.userId, { tokens: newTokens });
    res.json({ success: true, message: "Log out success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
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
