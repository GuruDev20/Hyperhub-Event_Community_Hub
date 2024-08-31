const EventModel=require('../Model/EventModel');
const addEvents=async(req,res)=>{
    try{
        const {eventTitle,eventType,eventDate,eventLocation,eventCost,eventAge,eventRatings,eventDescription,host}=req.body;
        const images=req.files?req.files.map((file)=>file.originalname):[];
        const newEvent=new EventModel({eventTitle,eventType,eventDate,eventLocation,eventCost,eventAge,eventRatings,images,eventDescription,host});
        await newEvent.save();
        res.status(200).json({status:200,message:'Event added successfully!'});
    }
    catch(err){
        res.status(500).json({success:false,message:'Internal server error'});
    }
};

const getEvents=async(req,res)=>{
    try{
        const events=await EventModel.find();
        res.status(200).json({status:200,events});
    }
    catch(err){
        res.status(500).json({success:false,message:'Internal server error'});
    }
}

module.exports={addEvents,getEvents};