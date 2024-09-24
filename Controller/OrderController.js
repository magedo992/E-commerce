const OrderModel=require('../Model/OrderModel');
const {asyncWarpper }=require('../middelware/asyncWapper');
const CartModel=require('../Model/CartModel');
const status = require('../utils/OrderStatus');
const product = require('../Model/ProductModel');
const {ErrorHandler}=require('../utils/ErrorHandler')



exports.createOrder=asyncWarpper( async(req,res,next)=>{
    const userId=req.user._id;

    const Cart=await CartModel.findOne({user:userId}).populate('items.product'); 

 
   
if(!Cart || Cart.items.length===0)
{
    
    return next(new ErrorHandler('Cart is empty or not found',400))
    
}


let totalAmount=0;
const orderItems= Cart.items.map(item=>{
    const itemPrice=item.product.price
    totalAmount+=item.product.price*item.quantity
    return {
        product:item.product._id,
        quantity:item.quantity,
        price:itemPrice
    }
})



const order=await OrderModel.create({
    user:userId,
    items:orderItems,
    totalAmount:totalAmount,
    status:status.PENDING
    
    
})
Cart.items=[];
await Cart.save()

res.status(200).json({
    'status':'success',
    'data':order
})
})


exports.updateOrder=asyncWarpper(async (req,res,next)=>{
    const OrderId=req.params.orderId;
    const {OrderStauts}=req.body;
    const Order=await OrderModel.findById(OrderId);

    if (!Object.values(status).includes(OrderStauts)) {
        return next(new ErrorHandler('Invalid order status',400));
    }
    if(!Order)
    {
        return next(new ErrorHandler('Order not found',404));
    }
    
     Order.status=OrderStauts;
     await Order.save();
     res.status(200).json({
        'status':'success',
        'data':Order
     })
    

})
exports.getOrders=asyncWarpper(async (req,res,next)=>{
    const Order=await OrderModel.find({},{'createdAt':0,'updatedAt':0,'__v':0});
    
    
    if(Order.length===0)    
    {
        return next( new ErrorHandler('not found Orders',404));
    }

    res.status(200).json({
        'status':'success',
        'data':Order
    });

})
exports.getOrder =asyncWarpper(async (req, res, next) => {
    const orderId = req.params.orderId;
    const order = await OrderModel.findById(orderId).populate('items.product');

    if (!order) {
        return next(new ErrorHandler('Order not found ',404))
    }

    res.status(200).json({
        status: 'success',
        data: order
    });
});


exports.cancelOrder = asyncWarpper(async (req, res, next) => {
    const orderId = req.params.orderId;

    const order = await OrderModel.findById(orderId);

    if (!order) {
        return next(new ErrorHandler('Order not found ',404))
    }

  
    if (!['PENDING', 'PROCESSING'].includes(order.status)) {
        return next(new ErrorHandler('Order cannot be cancelled in its current state',400));
    }

    order.status = status.CANCELLED;
    await order.save();

    
    res.status(200).json({
        status: 'success',
        data: order
    });
});
exports.deleteOrder = asyncWarpper(async (req, res, next) => {
    const orderId = req.params.orderId;
    const order = await OrderModel.findByIdAndDelete(orderId);

    if (!order) {
        return  next( new ErrorHandler('Order not found',404));
        
    }
    if (!['PENDING', 'PROCESSING'].includes(order.status)) {
        return next(new ErrorHandler('Order cannot be deleted in its current state',400));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});