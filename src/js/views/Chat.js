import React, { useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ChatUsersList from '../components/ChatUsersList';
import ViewTitle from '../components/shared/ViewTitle';
import ChatMessagesList from '../components/ChatMessagesList';
import { withBaseLayout } from '../layouts/Base';
import LoadingView from '../components/shared/LoadingView';

import { subscribeToChat, subscribeToProfile } from '../actions/chats';

function Chat() {
    const { id } = useParams();
    const peopleWatchers = useRef({}); // preserve the values between renderers
    const dispatch = useDispatch();
    const activeChat = useSelector(({chats}) => chats.activeChats[id]);
    const joinedUsers = activeChat?.joinedUsers;

    useEffect(() => {
        const unsubFromChat = dispatch(subscribeToChat(id));
        return () => {
            unsubFromChat();
            unsubFromJoinedusers();
        }
    }, [])

    useEffect(() => {
        joinedUsers && subscribeToJoinedUsers(joinedUsers);
    }, [joinedUsers])

    const subscribeToJoinedUsers = useCallback((jUsers) => {
        jUsers.forEach(user => {
            if(!peopleWatchers.current[user.uid]){
                peopleWatchers.current[user.uid] = dispatch(subscribeToProfile(user.uid, id));
            }
        })
    }, [dispatch, id]) 

    const unsubFromJoinedusers = useCallback(() => {
        Object.keys(peopleWatchers.current)
            .forEach(id => peopleWatchers.current[id]())
    }, [peopleWatchers.current]) // the 2nd [] means when this function will be recreated. Here means when peopleWatchers.current changes, it will be recreated

    if(!activeChat?.id){
        return <LoadingView message="Loading Chat..."/>
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