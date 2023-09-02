const _ = require('lodash');
const { HTTP_STATUS, RES_SUCCESS_RESPONSE, RES_ERROR_RESPONSE } = require('../constants/message');

module.exports.extendReqMiddleware = function (req, res, next) {
  req.allParams = () => _.merge(req.params, req.query, req.body);
  res.ok = (resPayload = {}) => {
    if (typeof resPayload === 'string') {
      const response = {
        statusCode: HTTP_STATUS.SUCCESS,
        status: resPayload,
        data: {},
        message: resPayload,
      };

      return res.send(response);
    }

    const { message = 'SUCCESS', data = {} } = resPayload;
    const response = {
      statusCode: HTTP_STATUS.SUCCESS,
      status: message,
      message: message,
      data,
    };

    return res.status(HTTP_STATUS.SUCCESS).send(response);
  };

  res.error = (resPayload) => {
    if (typeof resPayload === 'string') {
      return res.status(HTTP_STATUS.CLIENT_ERROR).send({ statusCode: HTTP_STATUS.CLIENT_ERROR, status: resPayload, error: resPayload, message: resPayload, data: {} });
    }

    const { statusCode = 400, message = 'BAD_REQUEST', data = {} } = resPayload;

    return res.status(statusCode).send({ statusCode: HTTP_STATUS.CLIENT_ERROR, status: message, message, error: message, data });
  };

  res.internalServerError = (e) => {
    return res.status(500).send({ statusCode: HTTP_STATUS.SERVER_ERROR, status: 'SOME_ERROR_OCCURRED', message: 'Internal server error', error: 'SOME_ERROR_OCCURRED', data: {} });
  };

  res.unauthorized = (message = '') => {
    return res.status(401).send({
      statusCode: 401,
      status: 'UNAUTHORIZED',
      message: 'UNAUTHORIZED',
      data: {},
      error: 'UNAUTHORIZED',
    });
  };

  res.forbidden = () => {
    return res.status(403).send({
      statusCode: 403,
      status: 'FORBIDDEN',
      message: 'FORBIDDEN',
      data: {},
      error: 'FORBIDDEN',
    });
  };

  next();
};
