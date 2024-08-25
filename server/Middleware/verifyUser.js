const jwt=require('jsonwebtoken')
const UserModel=require('../Model/UserModel')
const cookieParser=require('cookie-parser')
const isUser=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:"'UnAuthorized:No Token Provided'"})
        }
        const decodedToken=jwt.verify(token,process.env.SECRET)
        const user=await UserModel.findById(decodedToken.userId)
        if(!user){
            return res.status(401).json({message:"User not found"})   
        }
        req.user=user;
        next();
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

module.exports={isUser}