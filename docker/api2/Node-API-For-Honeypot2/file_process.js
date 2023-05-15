const fs = require("fs")
const webLog = require("./models/webLog")

let lastIndex = 0
const listData = async (ip,date,method,path,status,index)=>{
    let newWebLog = new webLog({
        PID:index,
        HostIP:ip,
        Date:date,
        Method:method,
        Path:path,
        Status:status
    })
    if(ip !== null && ip !== " " ){
       const data = await webLog.find({ PID:index })
       if(data.length >0){
        return 0;
       }
       else{
         await newWebLog.save()
       }
       //console.log(data)
       lastIndex = index
    }

}

const allTrafficController = ()=>{
        let data = fs.readFileSync("./honeypot2Log/tomcatlogs/localhost_access_log.2023-04-16.txt","utf-8").split("\n")
        data.forEach((log,index)=>{
            //console.log(index)
            const rawLog = log?.split(" ")
            let ip = rawLog[0];
            let date = rawLog[3]?.split("[")[1]
            let method = rawLog[5]?.split("\"")[1] // soru işaretleri console da hata vermemesi içindi. (undefined dönen değerler için)
            let path = rawLog[6]
            let status = rawLog[8]

            //const log1 = logArr[3].split("[") mesela bu date'i veriyor
            //console.log(rawLog-1[3])
            listData(ip,date,method,path,status,index+1)
            
        })
        
}

fs.watchFile("./honeypot2Log/tomcatlogs/localhost_access_log.2023-04-16.txt", (curr, prev)=> {        // file'da bir değişiklik olduğunda tetiklenir
  console.log("File was modified.");
  allTrafficController()
     //console.log(data);
});



module.exports = {allTrafficController}
