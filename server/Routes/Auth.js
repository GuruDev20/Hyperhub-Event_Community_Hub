const express=require('express');
const auth=require('../Controller/AuthController');
const AuthRoutes=express.Router();
AuthRoutes.post('/register',auth.register);
AuthRoutes.post('/login',auth.login);
AuthRoutes.post('/logout',auth.logout);
AuthRoutes.post('/forgot-password',auth.forgotPassword);
AuthRoutes.post('/reset-password',auth.resetPassword);
AuthRoutes.post('/verify-otp',auth.verifyOtp);
AuthRoutes.post('/update-password',auth.updatePassword);

module.exports=AuthRoutes;