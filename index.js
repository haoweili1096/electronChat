// main process
const {app, BrowserWindow} = require('electron');

//only use electron-reload in development environment
const path = require('path');
const isDev = !app.isPackaged;

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
    isDev && win.webContents.openDevTools();
}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

app.whenReady().then(createWindow);