
/*
const alertLogWeb = require("./models/alertLogModel")
const allLogWeb = require("./models/webLogModel")
const mongoose = require("mongoose")



const DB_URL ="mongodb+srv://fantakafa:123456Ankara@cluster0.4zz9kcx.mongodb.net/?retryWrites=true&w=majority"

const initServer = async ()=>{

    try {
        await mongoose.connect(DB_URL,{dbNAme:'honeyPot1',useNewUrlParser:true,useUnifiedTopology:true});
        console.log("DB connection is OK");
        await controller()

    } catch (error) {
        console.log("DB connection is FAILED!!!")
    }

}



let webAlertNumber
let webAllNumber



const controller = async ()=>{
    const alertWebData = await alertLogWeb.find()
    const allWebData = await allLogWeb.find()
    webAlertNumber = alertWebData.length
    webAllNumber = allWebData.length

    console.log("Tehlikeli ip Adres sayisi:" + webAlertNumber + "\ngelen tum trafik:"+webAllNumber )
    
}


module.exports = {initServer}

*/

