const jwt = require("jsonwebtoken");
const messages = require("../constants/messages.json");

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log("AUTH --------> ", authHeader);
  if (!authHeader) {
    return res.status(400).json({
      statusCode: 401,
      code: "FAIL",
      message: messages.NOT_AUTHENTICATED_MESSAGE,
      data: {},
    });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecret");
    console.log("Stringify ----------", JSON.stringify(decodedToken, null, 2));
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    if (error.message) {
      return res.status(400).json({
        statusCode: 401,
        code: "FAIL",
        message: messages.TOKEN_EXPIRED_MESSAGE,
        data: {},
      });
    }

    res.status(500).json({
      statusCode: 500,
      code: "FAIL",
      message: messages.INTERNAL_SERVER_ERROR_MESSAGE,
      data: {},
    });
  }
};

module.exports = {
  isAuth,
};
