import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging'; // Add this line for Firebase Messaging

const firebaseConfig = {
  apiKey: "AIzaSyDtMd0py_fOlUmxtVNxFnvCb387L4ekmm8",
  authDomain: "era-alert.firebaseapp.com",
  projectId: "era-alert",
  storageBucket: "era-alert.appspot.com",
  messagingSenderId: "881132105565",
  appId: "1:881132105565:web:2f42f51e358e97b5fe42b4",
  measurementId: "G-LPCRVGG0RR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const messaging = getMessaging(app); // Initialize Firebase Messaging service

export { db, auth, messaging };
