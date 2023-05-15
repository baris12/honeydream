const mongoose = require("mongoose")
const {Schema,Model} = mongoose

const xferlogSchema = new Schema({
    pid:String,
    day: Number,
    month: String,
    year: Number,
    time: String,
    transferTime: Number,
    hostIp: String,
    fileSize: Number,
    path: String,
    transferType: String, 
    direction: String,  
    accessMode: String, 
    username: String, 
    serviceName: String,  
    authenticationMethod: String,
    authenticatedUserId: String, 
    completionStatus: String,
    description:String,
    uploadedDate:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const xferlogModel = mongoose.model('xferlog_honeypot1',xferlogSchema)
module.exports = xferlogModel