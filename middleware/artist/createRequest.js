const joi = require("joi");

const schema = joi.object({
    name: joi.string()
        .min(3)
        .max(50)
        .required(),
    origin: joi.string()
        .max(50)
        .required(),
    status: joi.string()
        .valid('ACTIVE', 'INACTIVE').uppercase()
        .required()
});

module.exports = schema;