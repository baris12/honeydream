const mongoose = require("mongoose")
const {Schema} = mongoose

const alertLogSchema = new Schema({
    pid:String,
    hostIP:String,
    date:String,
    method:String,
    path:String,
    status:Number,
    alertLevel:String,
    alertDescription:String,
    uploadedDate:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const alertLogModel = mongoose.model("alertLog_honeyPot1",alertLogSchema)

module.exports = alertLogModel