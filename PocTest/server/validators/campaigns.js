const Joi = require("joi");
const ex = require("../lib/error");

const validateCampaign = (req, res, next) => {
    const validateCampaignSchema = Joi.object().keys({
        campaignId: Joi.string()
            .required()
            .max(50)
            .label('campaignId'),
        campaignName: Joi.string()
            .required()
            .max(50)
            .label('campaignName'),
        additionalInfo: Joi.string()
            .optional()
            .max(250)
            .label('additionalInfo'),
        campaignTypeId: Joi.number()
            .required()
            .label('campaignTypeId'),
        campaignCount: Joi.number()
            .optional()
            .valid(0)
            .label('campaignCount'),
        action: Joi.boolean()
            .optional()
            .label('action'),
        created_by_id: Joi.number()
            .optional()
            .max(10)
            .label('created_by_id'),
        approved_by_admin: Joi.boolean()
            .optional()
            .label('approved_by_admin'),
        is_delete: Joi.boolean()
            .optional()
            .label('is_delete'), 
        is_active: Joi.boolean()
            .optional()
            .label('is_active')
    })
    .required()
    .strict() // turn off typecasting
    .label('Body');

    Joi.validate(req.body, validateCampaignSchema, (err, value) => {
        if(err) {
            ex.raiseError(req, res, next, err.name, 400, err.message, null);
            // ex.raiseError(req, res, err.name, 400, err);
        } else {
            next();
        }
    });
}

const validateCampaignType = (req, res, next) => {
    const validateCampaignTypeSchema = Joi.object().keys({
        campaignTypeName: Joi.string()
            .required()
            .max(50)
            .label('campaignTypeName'),
        created_by_id: Joi.number()
            .optional()
            .max(10)
            .label('created_by_id'),
        approved_by_admin: Joi.boolean()
            .optional()
            .label('approved_by_admin'),
        is_delete: Joi.boolean()
            .optional()
            .label('is_delete'), 
        is_active: Joi.boolean()
            .optional()
            .label('is_active')
    })
    .required()
    .strict() // turn off typecasting
    .label('Body');

    Joi.validate(req.body, validateCampaignTypeSchema, (err, value) => {
        if(err) {
            ex.raiseError(req, res, next, err.name, 400, err.message, null);
            // ex.raiseError(req, res, err.name, 400, err);
        } else {
            next();
        }
    });
}

module.exports = {
    validateCampaign,
    validateCampaignType
}