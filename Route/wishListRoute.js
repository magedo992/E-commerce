const express=require('express');
const router=express.Router();
const wishListConroller=require('../Controller/WishListController');
const {verifay}=require('../middelware/verifayToken');
const WishValidator=require('../middelware/Validator/WishListValidator');

router.post('/AddToWishList',verifay,WishValidator.inputValidation,wishListConroller.AddTowishList);
router.get('/GetWishList',verifay,wishListConroller.GetWishList);
router.delete('/DeleteProduct',verifay,WishValidator.inputValidation,wishListConroller.DeleteProductFromWishList);
module.exports=router