const express = require('express');
const router = express.Router();
const isAuth = require('../middelware/verifayToken');
const authController = require('../Controller/authController');
const { isAllowed } = require('../middelware/isAllowed');
const authValidator = require('../middelware/Validator/authValidator');
const { upload, resizeImage } = require('../middelware/resizeImage'); 
const { userType } = require('../utils/userType');

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: User signup
 *     description: User creates a new account
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: number
 *               profileImg:
 *                 type: string
 *                 format: binary
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: User account created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: number
 *                 profileImg:
 *                   type: string
 *                 age:
 *                   type: number
 */
router.post('/signup', upload.single('ProfileImg'),
  resizeImage({ width: 400, height: 400, quality: 70 }), authValidator.validateSignupSchema, authController.signUp);


router.post('/login', authValidator.validateloginSchema, authController.logIn);

router.put('/UpdateProfile', isAuth.verifay, authValidator.validateUpdateDataSchema, authController.updateUserData);

router.post('/resetPassword', authController.forgetPassword);

router.get('/reset/:token', authController.showResetPasswordForm);

router.post('/reset/:token', authValidator.validateResetPasswordSchema, authController.reset);

router.get('/profile', isAuth.verifay, authController.Profile);

router.put('/changeRole', isAuth.verifay, isAllowed(userType.ADMIN), authController.changeRole);

router.post('/logout', isAuth.verifay, authController.logout);

module.exports = router;
