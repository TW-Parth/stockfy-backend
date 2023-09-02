const express = require("express");
const {
  signup,
  login,
  getProfile,
  updateProfile,
  updatePassword,
  logout,
} = require("../controllers/auth.controller");
const { isAuth } = require("../middleware/is-auth.middleware");
const { validateSchema } = require("../middleware/requestValidator.middleware");
const { signupSchema, loginSchema } = require("../validators/auth.validator");

const router = express.Router();

router.post("/signup", validateSchema(signupSchema), signup);
router.post("/login", validateSchema(loginSchema), login);
router.get("/", isAuth, getProfile);
router.put("/me", isAuth, updateProfile);
router.put("/updatePass", isAuth, updatePassword);
router.post("/logout", isAuth, logout);

module.exports = router;
