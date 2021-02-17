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

export const fetchChats = () => dispatch =>
    api
        .fetchChats()
        .then(chats => dispatch({
            type: 'CHATS_FETCH_SUCCESS',
            chats
        }))

export const createChat = (formData, userId) => dispatch => {
    const newChat = {...formData};
    const userRef = db.doc(`profiles/${userId}`);
    newChat.admin = userRef;
    newChat.joinedUsers = [userRef];

    return api
        .createChat(newChat)
        .then(_ => dispatch({type: 'CHATS_CREATE_SUCCESS'}))
}
    