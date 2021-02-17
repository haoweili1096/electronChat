import db from '../db/firestore';

export const fetchChats = () => {
    return db
        .collection('chats')
        .get()
        .then((snapshot) => {
            // if you are fetching collection then data are provided under snapshot.docs
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            return data;
        })
}

export const createChat = chat =>
    db
        .collection('chats')
        .add(chat)
        .then(docRef => docRef.id)
