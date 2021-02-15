import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDmwnZ5MPFLSgpPCnMNvcgG9r06i9Nc8W0",
    authDomain: "haowei-electron-chat.firebaseapp.com",
    projectId: "haowei-electron-chat",
    storageBucket: "haowei-electron-chat.appspot.com",
    messagingSenderId: "160824752643",
    appId: "1:160824752643:web:96a8107d9c7a6c9eabac36",
    measurementId: "G-SBP7ZVHWT7"
};

export default firebase.initializeApp(config).firestore();