const fs = require("fs")
const alertLogModel = require("./models/alertLogModel")

let filter1=[]

const alertLogData = async (alertIp)=>{
    alertIp.forEach(async (logObject) =>{
        let newAlert = new alertLogModel({
            pid:logObject.pid,
            hostIP:logObject.ip,
            date:logObject.date,
            method:logObject.method,
            path:logObject.path,
            status:logObject.status,
            alertLevel:logObject.alertLevel,
            alertDescription:logObject.alertDescription,
        })

        let data = await alertLogModel.find({ pid:logObject.pid })
        if(data && data.length>0){
         //console.log(data);
        }
        else{
            await newAlert.save()
        }
    })
}

const controller =async ()=>{
    let data = fs.readFileSync("./honeypot2Log/tomcatlogs/localhost_access_log.2023-04-16.txt","utf-8").split("\n")
    await data.forEach((log,index)=>{
        //console.log(index)
        const rawLog = log?.split(" ")
        let ip = rawLog[0];
        let date = rawLog[3]?.split("[")[1]
        let method = rawLog[5]?.split("\"")[1] // soru işaretleri console da hata vermemesi içindi. (undefined dönen değerler için)
        let path = rawLog[6]
        let status = rawLog[8]
        
        let filterObject={}
        filterObject.pid = index
        filterObject.ip  = ip
        filterObject.date = date
        filterObject.method = method
        filterObject.path = path
        filterObject.status = status

        
        filter1.push(filterObject)
    })
}

controller()

//console.log(typeof(filter1[0].path)); // burada data type ına bakıyoruz tüm datalar string!!!

const filter = async ()=>{
    let i=0
    let alertCounter = 0
    let beforeDate = []
    let beforeIp = ""
    let alertIp = []
    while(i<filter1.length){
        const splitDate = filter1[i].date?.split(":") // burada date'i tek tek ayırıyorum.
        // parseInt(splitDate[3] //integer'a çevirdik <-> parseInt(),parseFloat(),Number()

        if (filter1[i].ip === beforeIp && splitDate[0] === beforeDate[0] && splitDate[1] === beforeDate[1] && (parseInt(splitDate[2]) <= parseInt(beforeDate[2])+5) ){ //+5 5 dakika içinde !!
            alertCounter = alertCounter + 1
            if(alertCounter > 100){
                //console.log(" Tehlikeli Ip Adresi Bulundu !!!!")
                //const IplistCheck = alertIp.find(data => data.ip == filter1[i].ip)
                alertIp.push({pid:i+1,ip:filter1[i].ip,date:filter1[i].date,method:filter1[i].method,path:filter1[i].path,status:filter1[i].status,alertLevel:"Medium",alertDescription:"The attack may be a dictionary attack"})
                alertCounter = 0
            } 
        }
        
        if (filter1[i].path === "/manager/html/"){
                //console.log(" Tehlikeli Ip Adresi Bulundu !!!!")
                //const PathlistCheck = alertIp.find(data => data.alertDescription == "The Honeypot path is found!! The attacker is here")
                //const list1 = alertIp.find(data => data.alertDescription == "The attack this attack may be a dictionary attack")
                alertIp.push({pid:i+1,ip:filter1[i].ip,date:filter1[i].date,method:filter1[i].method,path:filter1[i].path,status:filter1[i].status,alertLevel:"High",alertDescription:"Attacker found the vulnerable files"})
        }
        if (filter1[i].path === "/manager/html/undeploy"){
            //console.log(" Tehlikeli Ip Adresi Bulundu !!!!")
            //const PathlistCheck = alertIp.find(data => data.alertDescription == "The Honeypot path is found!! The attacker is here")
            //const list1 = alertIp.find(data => data.alertDescription == "The attack this attack may be a dictionary attack")
            alertIp.push({pid:i+1,ip:filter1[i].ip,date:filter1[i].date,method:filter1[i].method,path:filter1[i].path,status:filter1[i].status,alertLevel:"Very High",alertDescription:"Attacker is in!!"})
    }


        beforeDate = splitDate
        beforeIp = filter1[i].ip
        i = i+1
    }
    
    // burdaki sıkıntı geçmiş ip adreslerini silmemiz lazım veya son 10 gün gibi şeylere bakmamız lazım
    
    //console.log(alertIp); //234 tane
    await alertLogData(alertIp)

}

fs.watchFile("./honeypot2Log/tomcatlogs/localhost_access_log.2023-04-16.txt", async (curr, prev)=> {        // file'da bir değişiklik olduğunda tetiklenir
    console.log("File was modified.");
    filter1=[]
    await controller()
    await filter()
  });
  

filter()

module.exports={controller,filter}


