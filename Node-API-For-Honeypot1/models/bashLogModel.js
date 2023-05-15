const mongoose = require("mongoose")
const {Schema} = mongoose

const alertLogSchema = new Schema({
    commandNumber:String,
    command:String,
    description:String,
    uploadedDate:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const bashLogModel = mongoose.model("alertbashLog_honeyPot1",alertLogSchema)

module.exports = bashLogModel