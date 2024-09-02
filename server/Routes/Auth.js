const express=require('express');
const auth=require('../Controller/AuthController');
const {isUser}=require('../Middleware/verifyUser')
const AuthRoutes=express.Router();

AuthRoutes.post('/register',auth.register);
AuthRoutes.post('/login',auth.login);
AuthRoutes.post('/refresh',auth.refreshToken);
AuthRoutes.post('/logout',auth.logout);
AuthRoutes.post('/forgot-password',auth.forgotPassword);
AuthRoutes.post('/reset-password/:id/:token',auth.resetPassword);
AuthRoutes.post('/update-password',auth.updatePassword);
AuthRoutes.get('/getUser',isUser,auth.getUser);
module.exports=AuthRoutes;