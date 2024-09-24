const express=require('express');
const router=express.Router();
const isAuth=require('../middelware/verifayToken');

const CartController=require('../Controller/CartController');
router.post('/addToCart',isAuth.verifay,CartController.addToCart);
router.get('/getCart',isAuth.verifay,CartController.getCart);
router.put('/updateCart',isAuth.verifay,CartController.updateCart);
router.delete('/deleteItem/:itemId',isAuth.verifay,CartController.deleteItem);
module.exports=router;