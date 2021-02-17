import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ChatUsersList from '../components/ChatUsersList';
import ViewTitle from '../components/shared/ViewTitle';
import ChatMessagesList from '../components/ChatMessagesList';
import { withBaseLayout } from '../layouts/Base';
import { subscribeToChat, subscribeToProfile } from '../actions/chats';

function Chat() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const activeChat = useSelector(({chats}) => chats.activeChats[id]);
    const joinedUsers = activeChat?.joinedUsers;

    useEffect(() => {
        const unsubFromChat = dispatch(subscribeToChat(id));
        return () => {
            unsubFromChat();
        }
    }, [])

    useEffect(() => {
        joinedUsers && subscribeToJoinedUsers(joinedUsers);
    }, [joinedUsers])

    const subscribeToJoinedUsers = (jUsers) => {
        jUsers.forEach(user => {
            dispatch(subscribeToProfile(user.uid))
        })
    }

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <ChatUsersList users={activeChat?.joinedUsers}/>
            </div>
            <div className="col-9 fh">
                <ViewTitle text={`Channel: ${activeChat?.name}`} />
                <ChatMessagesList />
            </div>
        </div>
    )
}

export default withBaseLayout(Chat, {canGoBack: true});