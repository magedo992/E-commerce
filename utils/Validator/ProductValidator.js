const joi=require('joi');
const {ErrorHandler}=require('../ErrorHandler');

exports.createProduct=joi.object({
    name:joi.string().min(3).trim().required(),
    price:joi.number().min(1).required(),
    description:joi.string().min(2).trim(),
    category: joi.string().hex().length(24).required()
}).options({ abortEarly: false }); 

exports.UpdateProduct=joi.object({
    Id:joi.string().hex().length(24).required(),
    name:joi.string().min(3).trim().required(),
    price:joi.number().min(1).required(),
    description:joi.string().min(2).trim(),
    category: joi.string().hex().length(24).required().trim()
}).options({abortEarly:false});

exports.GetSingleProduct=joi.object({
    Id:joi.string().hex().length(24).required()
})





exports.check = (obj, schema, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        return next(new ErrorHandler(error.message, 401));
    }
    next()
}

