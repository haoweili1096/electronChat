import React, { useEffect } from 'react';
import JoinedChatsList from '../components/JoinedChatsList';
import AvailableChatList from '../components/AvailableChatsList';
import ViewTitle from '../components/shared/ViewTitle';

import { useDispatch } from 'react-redux';
import { fetchChats } from '../actions/chats';

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchChats())
    }, [dispatch])

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <JoinedChatsList />
            </div>
            <div className="col-9 fh">
                <ViewTitle text="Choose your channel"/>
                <AvailableChatList />
            </div>
        </div>
    )
}