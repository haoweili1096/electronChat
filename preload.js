const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('e_notification', {
    notificationApi: {
        sendNotification(message){
            ipcRenderer.send('notify', message);
        }
    },
    appApi: {
        quitApp(){
            ipcRenderer.send('app-quit');
        }
    }  
})
