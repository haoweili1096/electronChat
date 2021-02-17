import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats } from '../actions/chats';

import JoinedChatsList from '../components/JoinedChatsList';
import AvailableChatList from '../components/AvailableChatsList';
import ViewTitle from '../components/shared/ViewTitle';
import { withBaseLayout } from '../layouts/Base';

function Home() {
    const dispatch = useDispatch();
    const joinedChats = useSelector(({chats}) => chats.joined);
    const availableChats = useSelector(({chats}) => chats.available);

    useEffect(() => {
        dispatch(fetchChats())
    }, [dispatch])

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <JoinedChatsList chats={joinedChats} />
            </div>
            <div className="col-9 fh">
                <ViewTitle text="Choose your channel">
                    <Link 
                        className="btn btn-outline-primary" 
                        to="/chatCreate">New</Link>
                </ViewTitle>
                <AvailableChatList chats={availableChats} />
            </div>
        </div>
    )
}

export default withBaseLayout(Home);