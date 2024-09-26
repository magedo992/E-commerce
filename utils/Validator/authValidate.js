const joi=require('joi');
const {ErrorHandler}=require('../ErrorHandler');

exports.logIn=joi.object({
    email:joi.string().email().required().trim(),
    password:joi.string().min(8).max(60).required()
}).options({abortEarly:false});

exports.signup=joi.object({
    name:joi.string().min(1).required().trim(),
    email:joi.string().email().required().trim(),
    password:joi.string().min(8).max(60).required()
}).options({abortEarly:false});

exports.resetPassword=joi.object({
  password:joi.string().min(8).required(),
  confirmPassword:joi.string().min(8).equal('password').required()
})


exports.chack = (obj, schema, next) => {
    const { error } = schema.validate(obj);
    if (error) {
      return next(new ErrorHandler(error.message, 401));
    }
    next();
  };