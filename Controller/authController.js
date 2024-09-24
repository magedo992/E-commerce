const UserModel=require('../Model/UserModel');
const { asyncWarpper } = require('../middelware/asyncWapper');

const bcrypt=require('bcrypt');
const {gerateToken}=require('../utils/genrateToken');
const { post } = require('../Route/authRoute');


exports.signUp=asyncWarpper(async (req,res,next)=>{
    const {email,password,name}=req.body;

    const FindeUser=await UserModel.findOne({email:email});
    if(FindeUser)
    {
        return res.status(400).json({'status':'Error','message':'this user is already exist'});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await UserModel.create({
        email:email,password:hashedPassword,name:name
    });
    const token=gerateToken({id:user._id,email:user.email});
    

    user.token=token;
   await user.save();
    res.status(201).json({
      'status':"success",
      'message':"created success" ,
      'token':token
    })   
});
exports.logIn=asyncWarpper(async (req,res,next)=>{
const {email,password}=req.body;
const user=await UserModel.findOne({email:email});
if(!user){
    return res.status(404).json({
        'status':'fail',
        'message':'user not found'
    });
}
const hashedPassword=await bcrypt.compare(password,user.password);
if(!hashedPassword)
{
    return res.status(400).json({
        'status':'fail',
        'message':'email or password is invalid'
    })
}
   const token=await  gerateToken({id:user._id,email:user.email});
   user.token=token;
 await  user.save();
 
 res.status(200).json({
    'status':'success',
    'message':'login success',
    'token':token
 })
})


exports.logout=asyncWarpper(async (req,res,next)=>{
    const user=await UserModel.findOne({_id:req.user});
    if(user)
    {
        user.token=undefined;
      await  user.save()
      req.user=undefined
        res.status(200).json({
            'status':'success',
            'message':'logout success'
        })
    }
    else{
        res.status(404).json({
            'status': 'error',
            'message': 'User not found'
        });
    }
next();

})