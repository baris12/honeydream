const fs = require('fs');
const xferlogModel = require("./models/xferlogModel")


let pushobject=[]

const alertxferlogData = async (pushobject)=>{
  pushobject.forEach(async (logObject) =>{
      let newAlert = new xferlogModel({
        pid:logObject.pid,
        day: logObject.day,
        month: logObject.month,
        year:logObject.year,
        time: logObject.time,
        transferTime: logObject.transferTime,
        hostIp: logObject.hostIp,
        fileSize: logObject.fileSize,
        path: logObject.path,
        transferType: logObject.transferType, 
        direction: logObject.direction,  
        accessMode: logObject.accessMode, 
        username: logObject.username, 
        serviceName: logObject.serviceName,  
        authenticationMethod: logObject.authenticationMethod,
        authenticatedUserId: logObject.authenticatedUserId, 
        completionStatus: logObject.completionStatus,
        description:logObject.description
      })

      let data = await xferlogModel.find({ pid:logObject.pid })
      if(data && data.length>0){
        //console.log(data);
      }
      else{
          await newAlert.save()
      }
  })
}

const run = async()=> {
    let logFile = fs.readFileSync('./honeypot1Log/xferlog', 'utf-8').split("\n");
    await logFile.forEach((log,index)=>{

    const rawLog = log.split(" ")
  
    let xferlog={
    pid:index,
    day: rawLog[2],
    month: rawLog[1],
    year:rawLog[4],
    time: rawLog[3],
    transferTime: rawLog[5],
    hostIp: rawLog[6],
    fileSize: rawLog[7],
    path: rawLog[8],
    transferType: rawLog[9], 
    direction: rawLog[11],  
    accessMode: rawLog[12], 
    username: rawLog[13], 
    serviceName: rawLog[14],  
    authenticationMethod: rawLog[15],
    authenticatedUserId: rawLog[16], 
    completionStatus: rawLog[17]
    }
    
    pushobject.push(xferlog)

  })
}


run()

const xferlogFilter = async ()=>{
    
    let i = 0
    while(i<pushobject.length){
      let myDescription = ""
      if (pushobject[i].fileSize > 5500) {
        myDescription = myDescription + " Large FTP File Transfer."
      }
      if (pushobject[i].path?.includes('.html') || pushobject[i].path?.includes('.php')) {
        myDescription = myDescription + " FTP File Transfer of Sensitive Data."
      }
      if(pushobject[i].username === "anonymous" || pushobject[i].username === ""){
        myDescription = myDescription + " Unknown user activity is detected"
      }
      if(pushobject[i].hostIp !== "192.168.1.1"){
        myDescription = myDescription + "Unauthorized IP is detected"
      }
      if(pushobject[i].direction === "i"){
        myDescription = myDescription + "Some File is INSERTED in FTP!! Name of the file is ----> " + pushobject[i].path + " <---- Be careful this event."
      }
      if(pushobject[i].direction === "o"){
        myDescription = myDescription + "Some File is RECEIVED from FTP!! Name of the file is ----> " + pushobject[i].path + " <---- Be careful this event."
      }
      if(pushobject[i].direction === "d"){
        myDescription = myDescription + "Some File is DELETED in FTP!! Name of the file is ----> " + pushobject[i].path + " <---- Be careful this event."
      }
      
    pushobject[i].description = myDescription
    i = i+1
  }

 await alertxferlogData(pushobject)
}

xferlogFilter()

fs.watchFile("./honeypot1Log/xferlog", async (curr, prev)=> {        // file'da bir değişiklik olduğunda tetiklenir
  console.log("FTP File was modified.");
  pushobject=[]
  await run()
  await xferlogFilter()
});


module.exports={run,xferlogFilter}