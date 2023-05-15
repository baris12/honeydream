const mongoose = require("mongoose")
const {Schema} = mongoose

const webLogSchema = new Schema({
    PID:String,
    HostIP:String,
    Date:String,
    Method:String,
    Path:String,
    Status:Number,
    Level:String,
    uploadedDate:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const allLogWeb = mongoose.model("webLog_honeyPot1",webLogSchema)

module.exports = allLogWeb