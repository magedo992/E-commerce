const UserModel=require('../Model/UserModel');
const { asyncWarpper } = require('../middelware/asyncWapper');

const bcrypt=require('bcrypt');
const {gerateToken}=require('../utils/genrateToken');
const { post } = require('../Route/authRoute');
const user = require('../Model/UserModel');
const { ErrorHandler } = require('../utils/ErrorHandler');
const { sendEmail } = require('../utils/EmailSender');
const crypto=require('crypto');
const { cloudinary } = require('../middelware/uploadImage'); 
const streamifier = require('streamifier'); 



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
    const uploadFromBuffer = (fileBuffer) => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ folder: 'user' }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
            streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });
    };
    let result=null;
    if(req.file)
    {
    
    try {
        result = await uploadFromBuffer(req.file.buffer);
    } catch (error) {
        return res.status(500).json({
            'status': 'error',
            'message': 'Failed to upload image to Cloudinary',
            'error': error.message
        });
    }
    }
    user.Image=result?result.secure_url:null;
    user.imagePublicIds=result?result.public_id:null;

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

exports.updateUserData=asyncWarpper(async(req,res,next)=>{
    const userId=req.user._id;
    const {email,name}=req.body;
    const currentUser=await user.findById(userId);
    if(!currentUser)
    {
        return res.status(404).json({
        'status':'fail',
        'message':'user Not found'
        })

    }
    const uploadFromBuffer = (fileBuffer) => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ folder: 'Product' }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
            streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });
    };



    if (currentUser.imagePublicIds ) {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                return res.status(500).json({
                    message: 'Error deleting old image from Cloudinary',
                    error: error.message
                });
            }
        }
    
        if (req.file) {
       
          
            
            const result = await uploadFromBuffer(req.file.buffer);
          currentUser.Image= result.secure_url;
        currentUser.imagePublicIds =result.public_id ;
        
    }
    currentUser.email=email;
    currentUser.name=name;
    await currentUser.save();
    res.status(203).json({
        'status':'success',
        data:currentUser
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

exports.forgetPassword=asyncWarpper(async (req,res,next)=>{
    const {email}=req.body;
    let User=await user.findOne({email:email});
    console.log('a7aaaaa');
    
    if(!User)
    {
        return next(new ErrorHandler('User with this email does not exist.',404));

    }
    const token=crypto.randomBytes(20).toString('hex');
    User.resetPasswordToken =token;
    User.resetPasswordExpires=Date.now()+3600000 
    await User.save();

    const options={
        to:User.email,
        from:'passwordreset@demo.com',
        subject:'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:3000/api/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    
    }
    sendEmail(options);
    res.status(200).send('Recovery email sent.');

})

exports.reset=asyncWarpper(async (req,res,next)=>{
    
        const User = await user.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });
    
        if (!User) {
            return res.status(400).send('Password reset token is invalid or has expired.');
        }
    
        const { password } = req.body;
        User.password = bcrypt.hashSync(password, 10);
        User.resetPasswordToken = undefined;
        User.resetPasswordExpires = undefined;
    
        await User.save();
        res.status(200).send('Password has been reset.');
    
});