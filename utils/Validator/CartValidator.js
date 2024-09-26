const joi=require('joi');
const {ErrorHandler}=require('../ErrorHandler');
exports.AddToCart=joi.object({
    
    
    productId:joi.string().hex().length(24).required(),
    quantity:joi.number().strict().min(1).required()
}).options({abortEarly:false});


exports.updateCart=joi.object({
    itemId:joi.string().hex().length(24).required(),
    quantity:joi.number().strict().min(1)
})

exports.DeleteItem=joi.object({
    itemId:joi.string().hex().length(24).required()
})


exports.check = (obj, schema, next) => {
    if (!schema) {
        return next(new ErrorHandler('Validation schema is undefined', 300));
    }
    const { error } = schema.validate(obj);
    if (error) {
      return next(new ErrorHandler(error.message, 401));
    }
    next();
  };