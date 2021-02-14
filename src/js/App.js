import React from 'react';
import { ipcRenderer } from 'electron';

export default function App(){
    //debugger
    const title = "Hello World";
    const enhancedTitle = title + ' - React App!';

    const sendNotification = () => {
        ipcRenderer.send('notify', 'This is my custom message!');
    };

    return (
        <div>
            <h1>{enhancedTitle}</h1>
            <button onClick={sendNotification}>Send Notification</button>
        </div>
        
    )
}