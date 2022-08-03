'use strict'

const _ = require('lodash')
const { logger } = require('../config/logger')

exports.raiseError = function (req, res, errorCode, httpStatus, message) {

  let errMsg = '';
  if(message instanceof Error) {
    errMsg = message.parent ? message.parent.message : message.message; // 'parent' will exist in sequalize errors
  } else {
    errMsg = message ? message : '';
  }

  req.responseObject = {
    status: false,
    data: {},
    err: {
      message: errMsg,
      code: errorCode
    }
  };

  const metaData = {
    httpStatus: httpStatus,
    httpMethod: req.method,
    httpEndpoint: req.url,
    userId: req.userid,
    payload: req.body,
    message: message,
    timestamp: req._startTime,
    backend: true
  };

  // A 4xx code indicates an error caused by the user, whereas 5xx codes tell the client that 
  // they did everything correctly and it's the server itself who caused the problem

  if(Math.floor( httpStatus/100 ) === 4) {
    logger.log({ level: 'warn', ...metaData }); // httpStatus = 4xx
  } else {
    logger.log({ level: 'error', ...metaData }); // httpStatus = 5xx
  }
  
  res.send(httpStatus, req.responseObject);
}
