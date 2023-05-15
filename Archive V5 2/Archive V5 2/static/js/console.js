const alertLogWeb = require("../../models/alertLogModel")
const webLog = require("../../models/webLogModel")

const mongoose = require("mongoose")


/*
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

initServer()
*/

// Function for convert string date to Date object
const convertDate = (dateString)=>{

    const dateParts = dateString.replace(/[/:\s]/g, " ").split(" ");
    const dateObj = new Date(`${dateParts[1]} ${dateParts[0]} ${dateParts[2]} ${dateParts[3]}:${dateParts[4]}:${dateParts[5]}`);
    return dateObj;
}


// Convert string date to Date object and update docs
const normalizeAlertLogWebDates = async() =>{

    try {
        
        const data = await alertLogWeb.find();
         

        data.forEach(async d =>{

            const newOne  = await alertLogWeb.findByIdAndUpdate(d._id, {
                uploadedDate: convertDate(d.date)
            }, { new: true})

            console.log(newOne)
        })


    } catch (error) {
        
    }

}

// Convert string date to Date object and update docs
const normalizeAllLogWebDates = async() =>{

    try {
        
        const data = await webLog.find();
         

        data.forEach(async d =>{

            
            const newOne  = await webLog.findByIdAndUpdate(d._id, {
                uploadedDate: convertDate(d.Date)
            }, { new: true})

            console.log(newOne)
        })


    } catch (error) {
        
    }

}




async function dangerUser(){
    try {
        
        const lastWeekDate = new Date((new Date()).getTime() - (7 * 24 * 60 * 60 * 1000));

        const dangerUserCount = await alertLogWeb.countDocuments();
        const lastWeekData = await alertLogWeb.countDocuments({
            uploadedDate: { $lte : lastWeekDate}
        });

        const change = ((dangerUserCount - lastWeekData) / lastWeekData) * 100
        
        return {
            dangerUserCount,
            change
        }

    } catch (error) {
 
        return null
 
    }



}



async function visitors(){
    try {
        
        const lastWeekDate = new Date((new Date()).getTime() - (7 * 24 * 60 * 60 * 1000));

        const dangerUserCount = await webLog.countDocuments();
        const lastWeekData = await webLog.countDocuments({
            uploadedDate: { $lte : lastWeekDate}
        });

        const change = ((dangerUserCount - lastWeekData) / lastWeekData) * 100
        
        return {
            dangerUserCount,
            change
        }

    } catch (error) {
 
        return null
 
    }



}


async function movement(){
    try {
        
        const movements = await webLog.find();

        return movement.map(data => data.uploadedDate);

    } catch (error) {
        return null
    }
}


async function latestProject(){
    try {
        
        const all = await alertLogWeb.find();

        return all

    } catch (error) {
        return null
    }
}

async function montlySales(){
    try {
        
        const movements = await alertLogWeb.find();

        return movement.map(data => data.uploadedDate);

    } catch (error) {
        return null
    }
}








