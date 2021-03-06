// main process
const { app, BrowserWindow, ipcMain, Notification, Menu, Tray } = require('electron');

//only use electron-reload in development environment
const path = require('path');
const isDev = !app.isPackaged;

const dockIcon = path.join(__dirname, 'assets', 'images', 'react_app_logo.png');
const trayIcon = path.join(__dirname, 'assets', 'images', 'react_icon.png');

function createSplashWindow(){
    const win = new BrowserWindow({
        width: 400,
        height: 200,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        }
    })

    win.loadFile('splash.html');
    return win;
}

function createWindow(){
    // browser window run by renderer process
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "#6e707e", 
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html');
    isDev && win.webContents.openDevTools();
    return win;
}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

if(process.platform === 'darwin'){
    app.dock.setIcon(dockIcon);
}

let tray = null;
app.whenReady()
    .then(() => {
        const template = require('./utils/Menu').createTemplate(app);
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

        tray = new Tray(trayIcon);
        tray.setContextMenu(menu);

        const mainApp = createWindow();
        mainApp.once('ready-to-show', () => {
            mainApp.show();
        })
        // const mainApp = createWindow();
        // const splash = createSplashWindow();
        
        // mainApp.once('ready-to-show', () => {
        //     setTimeout(() => {
        //         splash.destroy();
        //         mainApp.show();
        //     }, 2000)
        // })
    });

ipcMain.on('notify', (event, message) => {
    new Notification({title: 'Notification', body: message}).show();
})

ipcMain.on('app-quit', () => {
    app.quit();
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('active', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
})