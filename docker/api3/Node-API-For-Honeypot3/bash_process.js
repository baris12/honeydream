const fs = require('fs');
const mongoose = require("mongoose")

let pushobject=[]

const run = ()=> {
    let logFile = fs.readFileSync('./bash_history.txt', 'utf-8').split("\n");
    logFile.forEach((log,index)=>{

    let bash_history={
    commandNumber: index,
    command: log
    }

    let myDescription = ""

    if (bash_history.command?.includes("important.txt")) {
        myDescription = myDescription + "The attacker found the hash file. It will take at least 30 minutes to decode this hash file. Urgent intervention is required. Block the offending user!!"
    }
    if (bash_history.command?.includes("./runme.sh")) {
        myDescription = myDescription + "The attacker may gain root privileges!! Be careful"
    }

    bash_history.description = myDescription
    
    pushobject.push(bash_history)
})}

const saveModel =()=> {
    // xferlogModel.save(pushobject, function(err) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('Objects saved!');
    //   }
    // }); 

    pushobject.forEach(data=>{ 
        console.log(data)
    })
}

run()
saveModel()