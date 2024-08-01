const express=require('express')
const user=require('../Controller/UserController');
const {isUser}=require('../Middleware/verifyUser')
const UserRoutes=express.Router();

UserRoutes.post('/addEvents',isUser,user.addEvents);

module.exports=UserRoutes