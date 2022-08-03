const Joi = require("joi");
const ex = require("../lib/error");

const validateExpnese = (req, res, next) => {
    if (req.body.id != null) delete req.body["id"];
    const validateExpneseVal = Joi.object().keys({
        name: Joi.string()
            .required()
            .options({ language: { any: { allowOnly: "" }, label: "name" } }),
        expenseDate: Joi.date()
            .optional()
            .options({ language: { any: { allowOnly: "" }, label: "date" } }),
        amount: Joi.number()
            .required()
            .options({ language: { any: { allowOnly: "" }, label: "amount" } }),
        desc: Joi.string()
            .optional()
            .options({ language: { any: { allowOnly: "" }, label: "desc" } }),
        userid: Joi.number()
            .required()
            .options({ language: { any: { allowOnly: "" }, label: "date" } }),
    });
    Joi.validate(req.body, validateExpneseVal, function (err, value) {
        if (err) {
            ex.raiseError(req, res, err.details[0].context.label, 400, err);
        } else {
            next();
        }
    });
};
module.exports = {
    validateExpnese,
};
