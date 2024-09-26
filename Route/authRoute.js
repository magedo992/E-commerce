const express=require('express');
const router=express.Router();
const isAuth=require('../middelware/verifayToken');
const authController=require('../Controller/authController');
const allowed=require('../middelware/isAllowed');
const authValidator=require('../middelware/Validator/authValidator');
const { upload, resizeImage } = require('../middelware/resizeImage'); 

router.post('/signup',upload.single('ProfileImg'),
resizeImage({ width: 400, height: 400, quality: 70 }),authValidator.validateSignupSchema,authController.signUp);
router.post('/login',authValidator.validateloginSchema,authController.logIn);
router.put('/UpdateProfile',isAuth.verifay,authController.updateUserData);
router.post('/resetPassword',authController.forgetPassword);
router.post('/reset/:token',authValidator.validateResetPasswordSchema,
    authController.reset);
router.post('/logout',isAuth.verifay,authController.logout);

module.exports=router;