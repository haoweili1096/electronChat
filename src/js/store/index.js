import { createStore } from 'redux';

export default function configureStore(){

    const store = createStore(() => {
        return {
            message: 'Hello World',
            data1: 'just some testing data',
            data2: 'just some testing data2',
        }
    });

    return store;
}