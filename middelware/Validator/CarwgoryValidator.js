const cartegoryValidator=require('../../utils/Validator/CategoryValidator');

exports.validateCreate=(req,res,next)=>{
    cartegoryValidator.chack(req.body,cartegoryValidator.createCartSchema,next);
}
exports.validateGetCat=(req,res,next)=>{
    cartegoryValidator.chack(req.params,cartegoryValidator.getCartSchema,next);
}
exports.validateUpdate=(req,res,next)=>{
    cartegoryValidator.chack(req.params,cartegoryValidator.UpdateCartSchema,next);
}


exports.validateDelete=(req,res,next)=>{
    cartegoryValidator.chack({...req.params,...req.body},cartegoryValidator.getCartSchema,next);
}