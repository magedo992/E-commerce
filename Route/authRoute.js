const express=require('express');
const router=express.Router();
const isAuth=require('../middelware/verifayToken');
const authController=require('../Controller/authController');
const allowed=require('../middelware/isAllowed');
const authValidator=require('../middelware/Validator/authValidator');
router.post('/signup',authValidator.validateSignupSchema,authController.signUp);
router.post('/login',authValidator.validateloginSchema,authController.logIn);

router.post('/logout',isAuth.verifay,authController.logout);

module.exports=router;