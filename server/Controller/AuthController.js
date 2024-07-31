const UserModel = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register=async(req,res)=>{
    try{
        const {username,email,password,mobile}=req.body;
        const existingUser=await UserModel.findOne({email:email})
        if(existingUser){
            return res.status(401).json({success:false,message:"User already exists"});
        }
        const hashPassword=await bcrypt.hashSync(password,10)
        const newUser=new UserModel({username,email,password:hashPassword,mobile});
        await newUser.save();
        res.status(200).json({success:true,message:"Registered User Successfully",newUser});
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email:email})
        if(!user){
            return res.status(404).json({success:false,message:"Invalid credentials"});
        }
        const validPassword=await bcrypt.compare(password,user.password);
        if(!validPassword){
            return res.status(404).json({success:false,message:"Invalid credentials"});
        }
        const token=jwt.sign({userId:user._id},process.env.SECRET,{expiresIn:'1h'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            maxAge:360000
        })
        res.status(200).json({success:true,message:"Login successfully",user,token})
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}
const forgotPassword=async(req,res)=>{

}
const resetPassword=async(req,res)=>{

}
const verifyOtp=async(req,res)=>{

}
const updatePassword=async(req,res)=>{

}
const logout=async(req,res)=>{
    try{
        res.clearCookie('token')
        res.status(200).json({message:"Logout successfully"});
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

module.exports={register,login,forgotPassword,resetPassword,verifyOtp,updatePassword,logout}