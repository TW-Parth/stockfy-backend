const jwt = require("jsonwebtoken");

function jwtToken({ email, userId }) {
  const token = jwt.sign(
    {
      email: email,
      userId: userId,
    },
    "somesupersecret",
    { expiresIn: "24h" }
  );

  return {
    token,
  };
}

module.exports = {
  jwtToken,
};
