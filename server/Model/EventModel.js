const mongoose = require('mongoose');
const EventSchema=new mongoose.Schema({
    title:{type:String,required:true},
    type:{type:String,required:true},
    date:{type:String,required:true},
    location:{type:String,required:true},
    price:{type:String,required:true},
    age:{type:String,required:true},
    popular:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    host:{type:String,required:true},
})

const EventModel=mongoose.model('Event',EventSchema,'Event');
module.exports=EventModel;