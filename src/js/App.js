import React from 'react';

export default function App(){
    //debugger
    const title = "Hello World";
    const enhancedTitle = title + ' - React App!';

    const sendNotification = () => {
        e_notification.sendNotification('My custom message');
    };

    return (
        <div>
            <h1>{enhancedTitle}</h1>
            <button onClick={sendNotification}>Send Notification</button>
        </div>
        
    )
}