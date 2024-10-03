const WishListValidator=require('../../utils/Validator/WishListValidator');

exports.inputValidation=(req,res,next)=>{
    WishListValidator.check(req.body,WishListValidator.inputValidation,next);
}