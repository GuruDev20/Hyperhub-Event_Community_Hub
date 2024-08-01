const EventModel=require('../Model/EventModel')
const jwt=require('jsonwebtoken');

const addEvents=async(req,res)=>{
    try{

    }
    catch(err){
        res.status(500).json({success:false,message:"Internal server error"})
    }
}

module.exports={addEvents};