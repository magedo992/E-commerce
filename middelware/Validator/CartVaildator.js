

const CartVaildator=require('../../utils/Validator/CartValidator');


exports.AddTocart=(req,res,next)=>{
    CartVaildator.check(req.body,CartVaildator.AddToCart,next);
}


exports.updateCart=(req,res,next)=>{
    CartVaildator.check(req.body,CartVaildator.updateCart,next);
}

exports.deleteItem=(req,res,next)=>{

    CartVaildator.check(req.params,CartVaildator.DeleteItem,next);
}