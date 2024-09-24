const jwt=require('jsonwebtoken');

exports.gerateToken=(payload)=>{
    const token =jwt.sign(payload,process.env.jwtSecret,{expiresIn:'30m'});
    return token
}