const mongoose=require('mongoose');
const userType=require('../utils/userType.js')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        requried:true,
    },
    email:{
        type:String,
        required:true,
        unique: true 
    },
    Image:{
        type:String ,
        default:null
    },
    password:{
        type:String,
        requried:true
    },
    Role:{
        type:String,
        enum:[userType.userType.ADMIN,userType.userType.MANAGER,userType.userType.CUSTOMER],default:userType.userType.CUSTOMER
    },
   token: {
    type:String
    
    },
    resetPasswordExpires:{
        type:Date,
        default:undefined
    } ,
    resetPasswordToken:{
        type:String,
        default:undefined
    } ,
    imagePublicIds:String,
    createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

},{timestamps:true});


const user=mongoose.model('User',UserSchema);
module.exports=user;