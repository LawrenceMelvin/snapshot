
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCMOm12VPxfPhGi7jRe7PUEa9_tmfx1aAw",
    authDomain: "snapchat-clone-12fef.firebaseapp.com",
    projectId: "snapchat-clone-12fef",
    storageBucket: "snapchat-clone-12fef.appspot.com",
    messagingSenderId: "177309242332",
    appId: "1:177309242332:web:224ec5bd1427a345acb519"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export {db, auth, storage, provider}