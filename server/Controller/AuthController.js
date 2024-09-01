const UserModel = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser=require('cookie-parser')
const nodemailer=require('nodemailer');

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
        const refreshToken=jwt.sign({userId:user._id},process.env.REFRESH_SECRET,{expiresIn:'7d'})
        user.refreshToken=refreshToken;
        await user.save();
        res.cookie('accessToken',token,{
            httpOnly:false,
            secure:false,
            maxAge:3600000,
            sameSite:'lax'
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly:false,
            secure:false,
            maxAge:604800000,
            sameSite:'lax'
        });
        res.status(200).json({success:true,message:"Login successfully",user,token,refreshToken});
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

const refreshToken=async(req,res)=>{
    try{
        const refreshToken=req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(403).json({success:false,message:"Refresh token required"});
        }
        const payload=jwt.verify(refreshToken,process.env.REFRESH_SECRET);
        const user=await UserModel.findById(payload.userId);
        if(!user || user.refreshToken!==refreshToken){
            return res.status(403).json({ success:false,message:"Invalid refresh token"});
        }
        const newAccessToken=jwt.sign({userId:user._id},process.env.SECRET,{expiresIn:'1h'});
        res.cookie('accessToken',newAccessToken,{
            httpOnly:false,
            secure:false,
            maxAge:3600000,
            sameSite:'lax'
        });
        res.status(200).json({success:true,accessToken:newAccessToken});
    } 
    catch (error){
        res.status(500).json({success: false,message:"Internal server error"});
    }
};

const forgotPassword=async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await UserModel.findOne({email:email});
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        const token=jwt.sign({id:user._id},process.env.SECRET,{expiresIn:"1h"})
        var transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
              user:process.env.EMAIL_USER,
              pass:process.env.EMAIL_PASS
            }
        });  
        const resetUrl=`http://localhost:5173/reset-password/${user._id}/${token}`;
        var mailOptions={
            from:process.env.EMAIL_USER,
            to:email,
            subject:'Reset Password Link',
            html: `
                <h2>Reset your password</h2>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
            `
        };  
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            } 
            else{
                res.status(200).json({success:true,message:"Password reset link sent to your email"});
            }
        });
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}
const resetPassword=async(req,res)=>{
    try{
        const {id,token}=req.params;
        const {password}=req.body;
        const user=await UserModel.findById(id);
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        const validToken=await jwt.verify(token,process.env.SECRET);
        if(!validToken){
            return res.status(404).json({success:false,message:"Invalid token"});
        }
        const hashPassword=await bcrypt.hashSync(password,10);
        user.password=hashPassword;
        await user.save();
        res.status(200).json({success:true,message:"Password reset successfully"});
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}
const verifyOtp=async(req,res)=>{

}
const updatePassword=async(req,res)=>{

}
const logout=async(req,res)=>{
    try{
        const refreshToken=req.cookies.refreshToken;
        if(refreshToken){
            const user=await UserModel.findOne({refreshToken:refreshToken});
            if(user){
                user.refreshToken=null;
                await user.save();
            }
        }
        res.clearCookie('refreshToken',{path:'/'});
        res.clearCookie('accessToken',{path:'/'})
        res.status(200).json({message:"Logout successfully"});
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

const getUser=async(req,res)=>{
    try{
        // console.log(req.user);
        if(req.user){ 
            res.status(200).json({username:req.user.username});
        }
        else{
            res.status(404).json({message:"User not found"});
        }
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}
module.exports={register,login,forgotPassword,resetPassword,verifyOtp,updatePassword,logout,getUser,refreshToken}