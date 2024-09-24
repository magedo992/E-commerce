const cartModel=require('../Model/CartModel');
const user = require('../Model/UserModel');

const ProductModel=require('../Model/ProductModel');
const {asyncWarpper}=require('../middelware/asyncWapper');
const mongoose=require('mongoose');
const product = require('../Model/ProductModel');

exports.getCart=asyncWarpper(async (req,res,next)=>{
const cart =await cartModel.findOne({user:req.user._id}).populate('items.product');
if(!cart)
{
    return res.status(404).json({'status':'fail',
        'message':'Cart not found'
    });

}
res.status(200).json(cart);
});
exports.addToCart=asyncWarpper(async (req,res,next)=>{
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    if (!productId || !quantity ) {
        return res.status(400).json({
            message: 'Product ID and quantity are required and must be valid'
        });
    }
    const product=await ProductModel.findById(productId);
    if(!product)
    {
        return res.status(404).json({
            'status':'fail',
            'message':'can not found this product'
        });
    }
    //console.log(typeof(req.user._id.toString()));
    
    let Cart=await cartModel.findOne({user:req.user._id});
if(!Cart)
{
   
    
     Cart=  new cartModel({user:userId});
}


const itemIndex=  Cart.items.findIndex((item)=>item.product.toString()===productId);


    


    if(itemIndex>=0)
    {
       
        Cart.items[itemIndex].quantity+=quantity;
        
     
        
    }
    else {
       
        
     Cart.items.push({product:productId,quantity:quantity});
     
     
    }
   
    
    await Cart.save();
    res.status(200).json({ message: 'Item added to cart', Cart });

});

exports.updateCart=asyncWarpper(async (req,res,next)=>{
    const userId=req.user._id;
    const {itemId,quantity }=req.body;
    const Cart=await cartModel.findOne({user:userId}).populate('items.product');

    if(!Cart)
    {
        return res.status(404).json({
            'status':'error',
            'message':'cart not found'
        });
    }
    
    const itemIndex= Cart.items.findIndex(item=>item._id.equals(itemId));
    
    
    
    
    if(itemIndex>-1)
    {
        
           
        Cart.items[itemIndex].quantity=quantity;
        await Cart.save();
        res.status(200).json({
            'status':'success',
            'data':Cart
        })
       
    }
    else {
        res.status(404).json({
            'status':'fail',
            'message':'item not found in cart'
        })
    }
});

exports.deleteItem=asyncWarpper(async (req,res,next)=>{
    const userId=req.user._id;
    const {itemId}=req.params;
    let Cart=await cartModel.findOneAndUpdate({user:userId},{$pull:{items:{_id:itemId}}})
    .populate('items.product');

    if(!Cart)
    {
        return res.status(404).json({
            'status':'error',
            'message':'can not found'
        })
    }
    Cart.items=Cart.items.filter(item=>item._id.toString()!==itemId);
    
   await Cart.save();
   return res.status(200).json({
    'status':'success',
    'message':'Item removed from cart',
    numOfCartItems: Cart.items.length,
    'data':Cart
})

})