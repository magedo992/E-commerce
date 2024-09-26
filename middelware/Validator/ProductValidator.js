const product = require('../../Model/ProductModel');
const ProductValidator=require('../../utils/Validator/ProductValidator');

exports.createProduct=(req,res,next)=>{
    ProductValidator.check(req.body,ProductValidator.createProduct,next);
}

exports.updateProduct=(req,res,next)=>{
    ProductValidator.check({...req.params,...req.body},ProductValidator.UpdateProduct,next);
}

exports.getSingleProduct=(req,res,next)=>{
    ProductValidator.check(req.params,ProductValidator.GetSingleProduct,next);
}