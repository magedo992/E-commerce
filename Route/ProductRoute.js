const express=require('express');
const router=express.Router();
const ProductController=require('../Controller/ProductController');
const { upload, resizeImage } = require('../middelware/resizeImage'); 
const { cloudinary } = require('../middelware/uploadImage');
const isAuth=require('../middelware/verifayToken');
const {isAllowed}=require('../middelware/isAllowed');
const {userType}=require('../utils/userType');
const {GetSingleProduct,createProduct,updateProduct, getSingleProduct}=require('../middelware/Validator/ProductValidator');

router.post('/create',isAuth.verifay,isAllowed(userType.ADMIN,userType.MANAGER),upload.single('img'),
resizeImage({ width: 600, height: 600, quality: 70 }),createProduct,
ProductController.createProduct);

router.put('/update/:Id',isAuth.verifay,isAllowed(userType.ADMIN,userType.MANAGER),upload.single('img'),
resizeImage({ width: 600, height: 600, quality: 70 }),updateProduct,
ProductController.updateProduct);

router.get('/showAllProduct',ProductController.getAllProducts);
router.get('/:Id',isAuth.verifay,getSingleProduct,ProductController.getProduct);
router.delete('/delete/:Id',isAuth.verifay,isAllowed(userType.ADMIN,userType.MANAGER),getSingleProduct,ProductController.deleteProduct);

module.exports=router