// main process
const { app, BrowserWindow, ipcMain, Notification, Menu } = require('electron');

//only use electron-reload in development environment
const path = require('path');
const isDev = !app.isPackaged;

function createWindow(){
    // browser window run by renderer process
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: "#6e707e", 
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
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

app.whenReady()
    .then(() => {
        const template = require('./utils/Menu').createTemplate(app);
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
        createWindow();
    });

ipcMain.on('notify', (event, message) => {
    new Notification({title: 'Notification', body: message}).show();
})

ipcMain.on('app-quit', () => {
    app.quit();
})