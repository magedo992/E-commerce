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

exports.resetPassword = joi.object({
  password: joi.string()
      .min(8)
      .required()
      .messages({
          'string.base': 'Password should be a string.',
          'string.min': 'Password must be at least 8 characters long.',
          'any.required': 'Password is required.'
      }),
  confirmPassword: joi.string()
      .min(8)
      .valid(joi.ref('password'))  
      .required()
      .messages({
          'string.base': 'Confirm Password should be a string.',
          'string.min': 'Confirm Password must be at least 8 characters long.',
          'any.required': 'Confirm Password is required.',
          'any.only': 'Confirm Password must match Password.'
      })
});
exports.updateUserData=joi.object({
  name:joi.string().min(1).required(),
  email:joi.string().email().required()
})


exports.chack = (obj, schema, next) => {
    const { error } = schema.validate(obj);
    if (error) {
      return next(new ErrorHandler(error.message, 401));
    }
    next();
  };