import React from 'react';
import JoinedChatsList from '../components/JoinedChatsList';
import AvailableChatList from '../components/AvailableChatsList';
import ViewTitle from '../components/shared/ViewTitle';

export default function Home() {
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