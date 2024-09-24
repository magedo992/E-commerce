const authValidator=require('../../utils/Validator/authValidate');

exports.validateloginSchema=(req,res,next)=>{
    authValidator.chack(req.body,authValidator.logIn,next);
}
exports.validateSignupSchema=(req,res,next)=>{
    authValidator.chack(req.body,authValidator.signup,next);
}