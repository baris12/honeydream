const express = require("express")
const app = express()
const mongoose = require ("mongoose")
const {controller,filter} = require("./filter_process")
const {run,xferlogFilter} = require("./xferlog")
const {allTrafficController} = require("./file_process")
const {bashRun,bashLogFilter} = require("./bash_process")

const DB_URL ="mongodb+srv://fantakafa:123456Ankara@cluster0.4zz9kcx.mongodb.net/?retryWrites=true&w=majority"


const initServer = async ()=>{
    

    try {
        await mongoose.connect(DB_URL,{dbNAme:'honeyPot1',useNewUrlParser:true,useUnifiedTopology:true});
        //console.log(todoSchema.find());
        console.log("DB connection is OK");
        //await controller()
        //await filter()

    } catch (error) {
        console.log("DB connection is FAILED!!!")
    }

    app.listen(3000,()=>{
        console.log("Express server is up");
    })

}

//console.log(data);

// fs.watchFile("./log.txt", function(curr, prev) { // file'da bir değişiklik olduğunda tetiklenir
//     console.log("File was modified.");
//     data = fs.readFileSync("./log.txt","utf-8")
//     //console.log(data);
// });





initServer()