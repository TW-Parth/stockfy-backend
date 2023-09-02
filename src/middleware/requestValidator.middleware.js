const Joi = require("joi");

function validateSchema(schema) {
  return async function (req, res, next) {
    const params = req.allParams();

    const valid = schema.validate(params);
    req.validatedParams = valid.value;

    if (valid.error) {
      return res.error(valid.error);
    }
    
    next();
  };
}

module.exports = { validateSchema };
