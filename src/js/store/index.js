import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import chatReducer from '../reducers/chats';
import authReducer from '../reducers/auth';
import settingsReducer from '../reducers/settings';
import appMiddleware from './middlewares/app';

export default function configureStore(){

    const middlewares = [
        thunkMiddleware,
        appMiddleware
    ];

    const mainReducer = combineReducers({
        chats: chatReducer,
        auth: authReducer,
        settings: settingsReducer
    })

    //intermediate reducer
    const rootReducer = (state, action) => {

        if(action.type === 'AUTH_LOGOUT_SUCCESS'){
            Object.keys(state).forEach(sk => { // state key
                if(state[sk].savable){
                    return;
                }
                state[sk] = undefined;
            })
        }

        return mainReducer(state, action);
    }

    const store = createStore(
        rootReducer, 
        applyMiddleware(...middlewares));

    return store;
}