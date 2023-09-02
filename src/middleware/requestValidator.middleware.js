const Joi = require("joi");

function validateSchema(schema) {
  return async function (req, res, next) {
    const result = schema.validate(req.body);
    const { value, error } = result;

    if (error) {
      return res.status(400).json({
        statusCode: 400,
        code: "FAIL",
        message: error.message,
        data: {},
      });
    }
    req.body = value;
    next();
  };
}

module.exports = { validateSchema };
