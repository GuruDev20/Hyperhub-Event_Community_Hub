const express=require('express');
const user=require('../Controller/UserController');
const multer=require('multer');
const path=require('path');
const UserRoutes=express.Router();
const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'../client/src/Assets');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    },
});
const upload=multer({storage:storage});

UserRoutes.post('/addEvents',(req,res,next)=>{next()},upload.array('images',5),user.addEvents);
UserRoutes.get('/getEvents',user.getEvents);

module.exports=UserRoutes;