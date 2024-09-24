const {verifay}=require('../middelware/verifayToken');
const OrderController=require('../Controller/OrderController');

const express=require('express');
const router=express.Router();


router.post('/createOrder',verifay,OrderController.createOrder);
router.put('/updateOrder/:orderId',verifay,OrderController.updateOrder);
router.get('/:orderId',verifay,OrderController.getOrder);
router.get('/',verifay,OrderController.getOrders);
router.delete('/:orderId',verifay,OrderController.deleteOrder);

module.exports=router;