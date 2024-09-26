const express=require('express');
const router=express.Router();
const isAuth=require('../middelware/verifayToken');
const {AddTocart}=require('../middelware/Validator/CartVaildator');

const CartController=require('../Controller/CartController');
const { updateCart,deleteItem } = require('../middelware/Validator/CartVaildator');

router.post('/addToCart',isAuth.verifay,AddTocart,CartController.addToCart);
router.get('/getCart',isAuth.verifay,CartController.getCart);
router.put('/updateCart',isAuth.verifay,updateCart,CartController.updateCart);
router.delete('/deleteItem/:itemId',isAuth.verifay,deleteItem,CartController.deleteItem);
module.exports=router;