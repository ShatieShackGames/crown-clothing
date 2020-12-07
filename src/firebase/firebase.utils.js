import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAuIf3FMG_1YVwWHxH9zwNnDm91xH_1nhs",
    authDomain: "crwn-db-66785.firebaseapp.com",
    projectId: "crwn-db-66785",
    storageBucket: "crwn-db-66785.appspot.com",
    messagingSenderId: "187858558643",
    appId: "1:187858558643:web:3eaf98eae4e12da58b5ac6",
    measurementId: "G-8PY5YSKCBD"
};

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;