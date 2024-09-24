const joi=require('joi');

const {ErrorHandler}=require('../ErrorHandler');

exports.getCartSchema = Joi.object({
    id: joi.string().hex().length(24).required()
}).options({ abortEarly: false }); 
exports.createCartSchema = joi.object({
    name: joi.string().min(3).trim().required()
}).options({ abortEarly: false }); 

exports.UpdateCartSchema = Joi.object({
    id: joi.string().hex().length(24).required(),
    name: joi.string().min(3).trim()
}).options({ abortEarly: false }); 

exports.chack = (obj, schema, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        return next(new ErrorHandler(error.message, 401));
    }
    next()
}