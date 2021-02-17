import * as api from '../api/chats';
import db from '../db/firestore';

// export function fetchChats(){
//     return async function(dispatch){
//         const chats = await api.fetchChats()
//         dispatch({
//             type: 'CHATS_FETCH_SUCCESS',
//             chats
//         })

//         return chats;
//     }
// }

export const fetchChats = () => async (dispatch, getState) => {
    const { user } = getState().auth;
    dispatch({type: 'CHATS_FETCH_INIT'});
    const chats = await api.fetchChats();

    chats.forEach(chat => chat.joinedUsers = chat.joinedUsers.map(user => user.id));

    const sortedChats = chats.reduce((accuChats, chat) => {
        accuChats[chat.joinedUsers.includes(user.uid) ? 'joined' : 'available'].push(chat);
        return accuChats;
    }, {joined: [], available: []})
    
    dispatch({
        type: 'CHATS_FETCH_SUCCESS',
        ...sortedChats
    })
    
    return sortedChats;
}
    
export const createChat = (formData, userId) => async dispatch => {
    const newChat = {...formData};
    newChat.admin = db.doc(`profiles/${userId}`);
    
    const chatId = await api.createChat(newChat);
    dispatch({type: 'CHATS_CREATE_SUCCESS'});
    await api.joinChat(userId, chatId); // the admin join in the chat
    dispatch({type: 'CHATS_JOIN_SUCCESS', chat: {...newChat, id: chatId}});
    return chatId;

}

export const joinChat = (chat, uid) => dispatch =>
    api.joinChat(uid, chat.id)
        .then(_ => {
            dispatch({type: 'CHATS_JOIN_SUCCESS', chat});
        })

export const subscribeToChat = chatId => dispatch => 
    api
        .subscribeToChat(chatId, (chat) => {
            debugger
            dispatch({type: 'CHATS_SET_ACTIVE_CHAT', chat})
        })