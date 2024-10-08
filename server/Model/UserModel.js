const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    mobile:{type:String,required:true},
    refreshToken:{type:String},
    resetPasswordToken: {type:String},
    resetPasswordExpires: {type:Date},
})
const UserModel=mongoose.model('User',UserSchema,'User');
module.exports=UserModel
