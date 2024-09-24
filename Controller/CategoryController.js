const CategoryModel=require('../Model/CategoryModel');
const { findOne } = require('../Model/UserModel.js');
const {asyncWarpper}=require('../middelware/asyncWapper.js');
exports.CeateCategory=asyncWarpper(async (req,res,next)=>{
    const {name,description}=req.body;
    const Category=await CategoryModel.findOne({name:name});
    if(Category)
    {
        return res.status(400).json({
            'status':'error',
            'message':'category is already exit'
        });
       }
     const category=await CategoryModel.create({
        name:name,description:description
     });
     res.status(201).json({
        'status':'success',
        'data':category
     })  
});

exports.updateCategory=asyncWarpper(async (req,res,next)=>{
    const {name,description}=req.body;
    const category=await CategoryModel.findOne({_id:req.params.Id});
    if(!category)
    {
        return res.status(404).json({
            'status':'error',
            'message':'this category not exits'
        })
    }

    category.name=name?name:category.name;
    category.description=description?description:category.description;
    await category.save();


    res.status(200).json({
        'status':'success',
        'data':category
    })
});
exports.getAllCategory=asyncWarpper(async (req,res,next)=>{
    const cateogries=await CategoryModel.find({},{'__v':false});
        return res.status(200).json({
            'status':'success',
            data:cateogries
        })
    
});
exports.delete=asyncWarpper(async (req,res,next)=>{
    const category=await CategoryModel.findByIdAndDelete(req.params.Id);
    if(!category)
    {
        return res.status(404).json({
            'status':'fail',
            'message':'can not found this category'
        })

    }
   
    res.status(200).json({
        'status':'success',
        'message':'done'
    })
})