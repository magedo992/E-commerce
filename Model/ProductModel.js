const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({

 name: { type: String, required: true ,minlength:1,trim:true},
  description: { type: String,trim:true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId,required:true, ref:'Category' },
  stock: { type: Number, default: 0 ,min:0},
  images: [{ type: String }],
  imagePublicIds: [String],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const product=mongoose.model('Product',ProductSchema)

module.exports=product;