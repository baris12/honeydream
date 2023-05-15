const path = require ("path")
const url = require("url")
const {app,BrowserWindow,Menu} = require("electron")

// load functions
//require("./static/js/console");

let win
const mongoose = require("mongoose")




/*
app.on('web-contents-created', (event, contents) => {
    contents.on('will-attach-webview', (event, webPreferences, params) => {
      // Strip away preload scripts and disable nodeIntegration
      delete webPreferences.preload;
      webPreferences.nodeIntegration = false;
  
      // Set a content security policy
      webPreferences.contentSecurityPolicy = `
        default-src 'none';
        script-src 'self';
        style-src 'self';
        img-src 'self';
        font-src 'self';
        connect-src 'self';
        media-src 'self';
        object-src 'self';
      `;
    });
  });

  */

app.on("ready",()=>{
        
    const mainWindow = new BrowserWindow({
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: true,
          enableRemoteModule: true,
          preload: path.join(path.join(__dirname,"/static/js/preload.js")) ,
          contentSecurityPolicy: "default-src 'self'; script-src 'self';"
        
        }
      });
    
    mainWindow.loadFile(path.join(__dirname,"/static/index.html"));
    
        
    mainWindow.on('close',()=>{
            app.quit()
    })
    
    
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)
    
})




const mainMenuTemplate = [
    {
        label:"File",
        submenu:[
            {
                label:"Add new TODO",
                click:()=>{
                    createWindow()
                }
            },
            {
                label:"Delete All"
            },
            {
                label:"Exit",
                role:"Quit", //tıklandığında çıkış yapılması için
                accelerator: "Ctrl+Q"
            }
        ]
    },

]

if(process.env.NODE_ENV !== "production"){
    mainMenuTemplate.push(
        {
            label:"Dev Tools",
            submenu:[
                {
                    label:"Open Dev Window",
                    click:(item,focusedWindow)=>{
                        focusedWindow.toggleDevTools()
                    }   
                },
                {
                    label:"Refresh",
                    role:"Reload",
                    accelerator:"Ctrl+R"
                }
            ]
        }
    )
}



/*
const createWindow = ()=>{
    addNewWindow = new BrowserWindow({width: 300,height: 230, //const olarak tanımlarsak null ' a eşitleyemiyoruz ama ileride işe yarayabilir
        webPreferences: {
            nodeIntegration: true, 
            contextIsolation: false,
            enableRemoteModule: true
        },
        title:"New window",
        frame:false  //pencere kenarlarını yok eder 
    })

    addNewWindow.loadURL(
        url.format({
            pathname: path.join(__dirname,"./modal.html"),
            protocol:"file",
            slashes: true,
        })
    )

    addNewWindow.on("close",()=>{
        addNewWindow = null
    })


}


*/

