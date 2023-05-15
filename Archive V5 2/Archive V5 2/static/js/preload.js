let alertLogWeb = require("../../models/alertLogModel")
let webLog = require("../../models/webLogModel")
const { ipcMain } = require('electron');
const mongoose = require("mongoose")
const axios = require("axios")
const users = require("../../models/users");


const DB_URL ="mongodb+srv://fantakafa:123456Ankara@cluster0.4zz9kcx.mongodb.net/?retryWrites=true&w=majority"

const initServer = async ()=>{

    try {
        await mongoose.connect(DB_URL,{dbNAme:'honeyPot1',useNewUrlParser:true,useUnifiedTopology:true});
        console.log("DB connection is OK");
        

    } catch (error) {
        console.log("DB connection is FAILED!!!")
    }

}

initServer()



let a1,a2,a3,w1,w2,w3;

const emptySchema = new mongoose.Schema({});

a1 = mongoose.model('alertlog_honeypot1', emptySchema);
a2 = mongoose.model('alertlog_honeypot2', emptySchema);
a3 = mongoose.model('alertlog_honeypot3', emptySchema);

w1 = mongoose.model('weblog_honeypot1', emptySchema);
w2 = mongoose.model('weblog_honeypot2', emptySchema);
w3 = mongoose.model('weblog_honeypot3', emptySchema);

alertLogWeb = a2
webLog = w2



// Swich honeypot version
function switchPod(version){
    // There is avalibale [1,2,3] versions

    switch (version) {
        case 1:
            alertLogWeb = a1
            webLog = w1
            
            break;
        case 2:
            alertLogWeb = a2
            webLog =w2
            break;
        
        case 3:
            alertLogWeb = a3
            webLog = w3
            break;
        default:
            break;
    }

}



// Function for convert string date to Date object
const convertDate = (dateString)=>{
    console.log(dateString)
    const dateParts = dateString.replace(/[/:\s]/g, " ").split(" ");
    const dateObj = new Date(`${dateParts[1]} ${dateParts[0]} ${dateParts[2]} ${dateParts[3]}:${dateParts[4]}:${dateParts[5]}`);
    return dateObj;
}


// Convert string date to Date object and update docs
const normalizeAlertLogWebDates = async() =>{

    try {
        
        const data = await alertLogWeb.find().lean();
         

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
        
        const data = await webLog.find().lean();
         

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
 
        return error
 
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
        
        const movements = await webLog.find().lean();

        return movements.map(data => data.uploadedDate);

        

    } catch (error) {
        return error
    }
}


async function latestProject(page = 1, pageSize = 10) {
  // Add pagination
  try {
    const data = await alertLogWeb
      .find()
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .sort({ uploadedDate: -1 });
    const totalDocument = await alertLogWeb.countDocuments();
    const pageCount = Math.floor(totalDocument / pageSize);

    return {
      data,
      pageCount,
      page,
      pageSize,
    };
  } catch (error) {
    return error;
  }
}

async function montlySales(){
    try {
        
        const movements = await alertLogWeb.find().lean();

        return movements.map(data => data.uploadedDate);

    } catch (error) {
        return null
    }
}


async function montlySales(){
    try {
        
        const movements = await alertLogWeb.find().lean();

        return movements.map(data => data.uploadedDate);

    } catch (error) {
        return null
    }
}



async function earnings(){
    try {

        const count = await alertLogWeb.countDocuments({
            alertLevel: "Very High"
        })
        
        return count
    } catch (error) {
        console.error(error)
    }
}

async function orders(){
    try {
        const count = await alertLogWeb.countDocuments({
            alertLevel:"High"
        })

        return count
    } catch (error) {
        console.error(error)
    }
}





// Locations cannot finds because of all ip are in private subnet
async function locations(){
    try {
        
        const ipv4 = await alertLogWeb.find().select("hostIP")

        
        data = []
        for (const ip of ipv4) {
            const response = await axios.get(`http://ip-api.com/json/${ip.hostIP}`,{timeout : '180000'});
            data.push(response.data);
            //console.log(response.data);
        }

        return data


    } catch (error) {
        console.error(error)
    }
}




async function pastaGraph(){
    try {
        
        const status = await alertLogWeb.find().select("status").lean()
        console.log("Hey pasta:",status)
        data = {}
        data["401"] = status.filter(data =>data.status === 401).length
        data["200"] = status.filter(data =>data.status === 200).length
        data["404"] = status.filter(data =>data.status === 404).length
        data["405"] = status.filter(data =>data.status === 405).length


        return data

    } catch (error) {
        console.error(error)
    }
}


async function montlySales2(){
    const doc = mongoose.model("xferlog_honeypot1",emptySchema);

    const data = await doc.find().lean();

    return data

}

async function login(username, password){
    const user = await users.findOne({
        username,
        password
    })

    if(!user){
        return false;
    }

    return true;
}




const { contextBridge } = require('electron')


contextBridge.exposeInMainWorld('data', {
    switchPod,
    dangerUser,
    visitors,
    movement,
    latestProject,
    montlySales,
    montlySales2,
    earnings,
    orders,
    locations,
    pastaGraph,
    login
})