import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import chatReducer from '../reducers/chats';
import authReducer from '../reducers/auth';

export default function configureStore(){

    const middlewares = [
        thunkMiddleware
    ];

    const mainReducer = combineReducers({
        chats: chatReducer,
        auth: authReducer
    })

    //intermediate reducer
    const rootReducer = (state, action) => {

        if(action.type === 'AUTH_LOGOUT_SUCCESS'){
            state = undefined;
        }

        return mainReducer(state, action);
    }

    const store = createStore(
        rootReducer, 
        applyMiddleware(...middlewares));

    return store;
}