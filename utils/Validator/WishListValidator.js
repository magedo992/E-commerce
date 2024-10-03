const joi=require('joi');

const {ErrorHandler}=require('../ErrorHandler');
exports.inputValidation=joi.object({
    productId:joi.string().hex().length(24).required()
})


exports.check = (obj, schema, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        return next(new ErrorHandler(error.message, 401));
    }
    next()
}
