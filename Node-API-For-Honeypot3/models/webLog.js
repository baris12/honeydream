const mongoose = require("mongoose")
const {Schema} = mongoose

const webLogSchema = new Schema({
    PID:String,
    HostIP:String,
    Date:String,
    Method:String,
    Path:String,
    Status:Number,
    uploadedDate:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const webLog = mongoose.model("webLog_honeyPot3",webLogSchema)

module.exports = webLog