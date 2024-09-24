const mongoose=require('mongoose');

const status=require('../utils/OrderStatus');


const orderSchema=new mongoose.Schema({
user:{type:mongoose.Schema.Types.ObjectId,
    requried:true,ref:'User'
},
items:[{
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',requried:true},
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }}],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
      },
      status: {type:String,
        enum:[status.PENDING,status.CONFIRMED,status.SHIPPED,status.DELIVERED,status.CANCELLED],
        defaulf:status.PENDING,
        
      },
      
      createdAt: { type: Date, default: Date.now }
    },{timestamps:true});
    
    
    
    module.exports = mongoose.model('Order', orderSchema);
