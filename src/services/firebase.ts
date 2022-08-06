// import firebase from "firebase/app";
// import 'firebase/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB0pXO3nSkQ7Nq1pS9V6DShwWyyGSxrqD4",
  authDomain: "caritempat-server.firebaseapp.com",
  projectId: "caritempat-server",
  storageBucket: "caritempat-server.appspot.com",
  messagingSenderId: "667777121295",
  appId: "1:667777121295:web:cc7f0623e17b982165777a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);