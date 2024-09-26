const Category=require('../Controller/CategoryController.js');

const express=require('express');
const isAuth=require('../middelware/verifayToken');
const {isAllowed}=require('../middelware/isAllowed.js');
const {userType}=require('../utils/userType');
const {validateCreate,
    validateUpdate,
    validateDelete,
    validateGetCat}=require('../middelware/Validator/CarwgoryValidator')
const router=express.Router();
router.post('/Create',isAuth.verifay,isAllowed(userType.ADMIN,userType.MANAGER),validateCreate,Category.CeateCategory)
router.put('/update/:Id',isAuth.verifay,isAllowed(userType.ADMIN,userType.MANAGER),validateUpdate,Category.updateCategory);
router.delete('/delete/:Id',isAuth.verifay,isAllowed(userType.ADMIN,userType.MANAGER),validateDelete,Category.delete);
router.get('/',isAuth.verifay,Category.getAllCategory);

module.exports=router;