// main process
const { app, BrowserWindow, ipcMain, Notification } = require('electron');

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
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
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

ipcMain.on('notify', (event, message) => {
    new Notification({title: 'Notification', body: message}).show();
})