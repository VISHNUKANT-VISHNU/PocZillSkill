"use strict";

const Joi = require("joi");
const { max } = require("lodash");
const ex = require("../lib/error");

const validateUser = (req, res, next) => {

  const validateUserVal = Joi.object().keys({
    shopName: Joi.string()
    .required()
    .min(1)
    .options({ language: { any: { allowOnly: '' }, label: 'user_role_name' } }),
    shopAddr: Joi.string()
    .required()
    .options({ language: { any: { allowOnly: '' }, label: 'firstName' } }),
    mobileNo: Joi.string()
    .required()
    .max(10)
    .min(10)
    .options({ language: { any: { allowOnly: '' }, label: 'lastName' } }),
    state: Joi.string()
    .required()
    .options({ language: { any: { allowOnly: '' }, label: 'employee_id' } }),
    city: Joi.string()
    .required()
    .options({ language: { any: { allowOnly: '' }, label: 'password' } }),
    pincode: Joi.string()
    .required()
    .options({ language: { any: { allowOnly: '' }, label: 'user_role_id' } }),
    gstNo: Joi.string()
    .required()
    .optional()
    .options({ language: { any: { allowOnly: '' }, label: 'employee_id' } }),
    email: Joi.string()
    .required()
    .optional()
    .options({ language: { any: { allowOnly: '' }, label: 'employee_id' } }),
    otp: Joi.string()
    .required()
    .optional()
    .options({ language: { any: { allowOnly: '' }, label: 'employee_id' } }),
    fulllname: Joi.string()
    .required()
    .optional()
    .options({ language: { any: { allowOnly: '' }, label: 'employee_id' } }),
    referrer_link: Joi.string()
    .optional()
   
  })
  Joi.validate(req.params, validateUserVal, function (err, value) {
    if (err) {
      ex.raiseError(req, res, err.details[0].context.label, 400, err)
    } else {
      next()
    }
  })
}
const validateLogin = (req, res, next) => {
    const validatemasterAuditorVal = Joi.object().keys({
        mobileNo: Joi.string()
            .required()
            .alphanum()
            .min(10)
            .max(10)
            .options({
                language: { any: { allowOnly: "" }, label: "mobileNo" },
            }),
        OTP: Joi.number()
            .required()
            .options({ language: { any: { allowOnly: "" }, label: "OTP" } }),
    });
    Joi.validate(req.params, validatemasterAuditorVal, function (err, value) {
        if (err) {
            ex.raiseError(req, res, err.details[0].context.label, 400, err);
        } else {
            next();
        }
    });
};

module.exports = {
    validateUser,
    validateLogin,
};
