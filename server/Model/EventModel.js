const mongoose = require('mongoose');
const EventSchema=new mongoose.Schema({
    eventTitle:{type:String,required:true},
    eventType:{type:String,required:true},
    eventDate:{type:String,required:true},
    eventLocation:{type:String,required:true},
    eventCost:{type:String,required:true},
    eventAge:{type:String,required:true},
    eventRatings:{type:String,required:true},
    images:{type:[String],required:true},
    eventDescription:{type:String,required:true},
    host:{type:String,required:true},
})

const EventModel=mongoose.model('Event',EventSchema,'Event');
module.exports=EventModel;