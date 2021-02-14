// main process
const {app, BrowserWindow} = require('electron');

function createWindow(){
    // browser window run by renderer process
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: "white", 
        webPreferences: {
            nodeIntegration: false
        }
    })

    win.loadFile('index.html');

}

app.whenReady().then(createWindow);