import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ChatUsersList from '../components/ChatUsersList';
import ViewTitle from '../components/shared/ViewTitle';
import ChatMessagesList from '../components/ChatMessagesList';
import { withBaseLayout } from '../layouts/Base';
import { subscribeToChat } from '../actions/chats';

function Chat() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const activeChat = useSelector(({chats}) => chats.activeChats[id]);

    useEffect(() => {
        const unsubFromChat = dispatch(subscribeToChat(id));
        return () => {
            unsubFromChat();
        }
    }, [])

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