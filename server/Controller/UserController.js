const EventModel=require('../Model/EventModel')
const multer=require('multer')
const path=require('path')
const addEvents=async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.body.displayedImages)
    }
    catch(err){
        res.status(500).json({success:false,message:"Internal server error"})
    }
}

module.exports={addEvents};