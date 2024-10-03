const {verifay}=require('../middelware/verifayToken');
const OrderController=require('../Controller/OrderController');

const express=require('express');
const {isAllowed}=require('../middelware/isAllowed');
const {userType}=require('../utils/userType');
const router=express.Router();


router.post('/createOrder',verifay,OrderController.createOrder);
router.put('/updateOrder/:orderId',verifay,isAllowed(userType.ADMIN,userType.MANAGER),OrderController.updateOrder);
router.get('/:orderId',verifay,isAllowed(userType.ADMIN,userType.MANAGER),OrderController.getOrder);
router.get('/',verifay,isAllowed(userType.ADMIN,userType.MANAGER),OrderController.getOrders);
router.delete('/:orderId',verifay,isAllowed(userType.ADMIN,userType.MANAGER),OrderController.deleteOrder);

module.exports=router;