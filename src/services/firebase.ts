// import firebase from "firebase/app";
// import 'firebase/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { history } from 'index';
import { setCookie } from 'utils/cookies';
import { SITE_COOKIES } from '../utils/cookies';

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

export const signOut = () => auth.signOut().then(async () => {
  await setCookie(SITE_COOKIES.ACCESSTOKEN, null, -1)
  await setCookie(SITE_COOKIES.EMAIL, null, -1)
  await setCookie(SITE_COOKIES.NAME, null, -1)

  if (window.location.pathname === '/caritempat/v2/') {
    history.go(0)
  } else {
    history.push('/')
  }
}).catch((err) => {

})