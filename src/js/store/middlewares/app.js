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
    }

    next(action);
}