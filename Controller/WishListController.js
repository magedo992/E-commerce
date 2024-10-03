const Wishlist=require('../Model/WishlistModel');
const {asyncWarpper}=require('../middelware/asyncWapper');
const {ErrorHandler}=require('../utils/ErrorHandler');
const mongoose=require('mongoose');

exports.AddTowishList = asyncWarpper(async (req, res, next) => {
    const userId = req.user._id;
    const { productId } = req.body;
  
    
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return next(new ErrorHandler('Invalid productId', 400));
    }
  
    
    let wishList = await Wishlist.findOne({ user: userId });
    if (!wishList) {
      wishList = await Wishlist.create({ user: userId, products: [] });
    }
  
   
    if (!wishList.products.includes(productId)) {
      wishList.products.push(productId);
      await wishList.save();
    }
    else {
        return res.status(400).json({
            status: 'fail',
            'message':'product already added'
          });
    }
  
    res.status(201).json({
      status: 'success',
      data: wishList
    });
  });

  exports.GetWishList=asyncWarpper(async (req,res,next)=>{
    const userId=req.user._id;
    const wishList=await Wishlist.findOne({user:userId}).populate('products');

    if(!wishList)
    {
        return res.status(404).json({
            'status':'fail',
            'message':'Wish List not found or Empty'
        })
    }

    return res.status(200).json({
        'status':'success',
        'data':wishList
    })
});
exports.DeleteProductFromWishList=asyncWarpper(async (req,res,next)=>{
const userid=req.user._id;

const {productId}=req.body;
const WishList = await Wishlist.findOneAndUpdate(
    { user: userid }, // Find the wishlist by user ID
    { $pull: { products: productId } }, // Remove the productId from the products array
    { new: true } // Return the updated document
);
if(!WishList)
{
    return res.status(404).json({
        'status':'fail',
        'message':'can not found wishList'
    })
}
return res.status(200).json({
    'status':'success',
    'data':WishList
})



})
