import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import StoreProvider from './store/StoreProvider';

import HomeView from './views/Home';
import ChatView from './views/Chat';
import WelcomeView from './views/Welcome';
import SettingsView from './views/Settings';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import LoadingView from './components/shared/LoadingView';

import { listenToAuthChanges } from './actions/auth';

function AuthRoute({children, ...rest}){
    const user = useSelector(({auth}) => auth.user);
    const onlyChild = React.Children.only(children);

    return (
        <Route 
            {...rest}
            render={props => 
                user ? React.cloneElement(onlyChild, {...rest, ...props}) : <Redirect to="/"/>
            }
        />
    )
}

function ChatApp() {
    const dispatch = useDispatch();
    const isChecking = useSelector(({auth}) => auth.isChecking);

    useEffect(() => {
        dispatch(listenToAuthChanges());
    }, [dispatch])

    if(isChecking){
        return <LoadingView />
    }

    return (
        <Router>
            
            <div className='content-wrapper'>
                <Switch>
                    <Route path="/" exact>
                        <WelcomeView />
                    </Route>
                    <AuthRoute path="/chat/:id">
                        <ChatView />
                    </AuthRoute>
                    <AuthRoute path="/settings">
                        <SettingsView />
                    </AuthRoute>
                    <AuthRoute path="/home">
                        <HomeView />
                    </AuthRoute>
                </Switch>
            </div>
        </Router>
    )
}



export default function App() {
    return (
        <StoreProvider>
            <ChatApp />
        </StoreProvider>
    )
}