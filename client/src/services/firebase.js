import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCqJGn5WcDGyGY7Ya97YQTs22tIU4lf1qM",
    authDomain: "spotifyquiz-5b7ad.firebaseapp.com",
    projectId: "spotifyquiz-5b7ad",
    storageBucket: "spotifyquiz-5b7ad.appspot.com",
    messagingSenderId: "910056630156",
    appId: "1:910056630156:web:0d628927c8e5186481d8a9",
    measurementId: "G-9RV385FZ4L"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
export default firestore;