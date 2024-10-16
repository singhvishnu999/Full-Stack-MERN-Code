const mongoose = require('mongoose')

const event = new mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    description:String,
    date:{
        type:Date,
        default:Date.now,
    },
    time:{
        default:new Date().getTime,
        type:String,
    },
    photo:String,
    Venue:String,
    organizer: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    participants:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}]

});

const Event = new mongoose.model('Event',event);

module.exports = Event;