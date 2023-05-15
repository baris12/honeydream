const fs = require('fs');
const bashLogModel = require("./models/bashLogModel")

let bashFilter=[]

const bashLogData = async (bashFilter)=>{
    bashFilter.forEach(async (logObject) =>{
        let newAlert = new bashLogModel({
          commandNumber:logObject.commandNumber,
          command:logObject.command,
          description:logObject.myDescription   
        })
  
        let data = await bashLogModel.find({ pid:logObject.pid })
        if(data && data.length>0){
          //console.log(data);
        }
        else{
            await newAlert.save()
        }
    })
  }

const bashRun = () =>{
    let logFile = fs.readFileSync('./honeypot1Log/bash_history.txt', 'utf-8').split("\n");
    logFile.forEach((log,index)=>{
        
        let bash_history={
        commandNumber:index,
        command: log
        }
        bashFilter.push(bash_history)
    })
}

const bashLogFilter = async ()=>{
    let i = 0

    while(i<bashFilter.length){
        let myDescription = ""
            
        if (bashFilter[i].command?.includes("important.txt")) {
            myDescription = myDescription + "The attacker found the hash file. It will take at least 30 minutes to decode this hash file. Urgent intervention is required. Block the offending user!!"
        }
        if (bashFilter[i].command?.includes("./runme.sh")) {
            myDescription = myDescription + "The attacker may gain root privileges!! Be careful"
        }
        if (bashFilter[i].command?.includes("'import pty;pty.spawn(\"/bin/bash\")'")) {
            myDescription = myDescription + "The attacker may have been root !!!!!!!"
        }

        bashFilter[i].myDescription = myDescription
        i = i+1
  }

    await bashLogData(bashFilter)
}




fs.watchFile("./honeypot1Log/bash_history.txt", async (curr, prev)=> {        // file'da bir değişiklik olduğunda tetiklenir
    console.log("bash_history File was modified.");
    bashFilter=[]
    await bashRun()
    await bashLogFilter()
});


bashRun()
bashLogFilter()


module.exports = {bashRun,bashLogFilter}