const express=require('express');
const router=express.Router();
const ProductController=require('../Controller/ProductController');
const { upload, resizeImage } = require('../middelware/resizeImage'); 
const { cloudinary } = require('../middelware/uploadImage');
const isAuth=require('../middelware/verifayToken');
const {isAllowed}=require('../middelware/isAllowed');
const {userType}=require('../utils/userType')

router.post('/create',isAuth.verifay,isAllowed(userType.ADMIN,userType.MANAGER),upload.single('img'),
resizeImage({ width: 600, height: 600, quality: 70 }),
ProductController.createProduct);

router.put('/update/:Id',isAuth.verifay,isAllowed(userType.ADMIN,userType.MANAGER),upload.single('img'),
resizeImage({ width: 600, height: 600, quality: 70 }),
ProductController.updateProduct);

router.get('/showAllProduct',ProductController.getAllProducts);
router.delete('/delete/:Id',isAuth.verifay,isAllowed(userType.ADMIN,userType.MANAGER),ProductController.deleteProduct);

module.exports=router