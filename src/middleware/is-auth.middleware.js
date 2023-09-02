const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.error('Not authenticated.');
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecret');
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    if (error.message) {
      return res.error('Token expired.');
    }
    console.log('HI ----------');
    res.internalServerError();
  }
};

module.exports = {
  isAuth,
};
