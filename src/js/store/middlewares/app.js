export default store => next => action => {
    switch(action.type){
        case 'AUTH_LOGOUT_SUCCESS': {
            const { messagesSubs } = store.getState().chats;
            if(messagesSubs){
                Object.keys(messagesSubs).forEach(messageSub => {
                    messagesSubs[messageSub]();
                })
            }
        }
        case 'SETTINGS_UPDATE': {
            const { setting, value } = action;
            const currentSettings = localStorage.getItem('app-settings');
            const parsedCurrentSettings = currentSettings ? JSON.parse(currentSettings) : {};
            
            const settings = {...parsedCurrentSettings, [setting]: value}
            const stringifiedSettings = JSON.stringify(settings);
            localStorage.setItem('app-settings', stringifiedSettings)
        }
    }

    next(action);
}