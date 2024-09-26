const joi=require('joi');

const {ErrorHandler}=require('../ErrorHandler');

exports.getCartSchema = joi.object({
    Id: joi.string().hex().length(24).required()
}).options({ abortEarly: false }); 
exports.createCartSchema = joi.object({
    name: joi.string().min(3).trim().required(),
    description:joi.string().min(4).trim()
}).options({ abortEarly: false }); 

exports.UpdateCartSchema = joi.object({
    Id: joi.string().hex().length(24).required(),
    name: joi.string().min(3).trim(),
    description:joi.string().min(4).trim()
}).options({ abortEarly: false }); 

exports.chack = (obj, schema, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        return next(new ErrorHandler(error.message, 401));
    }
    next()
}