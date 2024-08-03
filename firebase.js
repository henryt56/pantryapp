// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD6iiLgNQ6rKU3wWgimDYvVAsA-Mn438z0",
  authDomain: "hspantrtyapp.firebaseapp.com",
  projectId: "hspantrtyapp",
  storageBucket: "hspantrtyapp.appspot.com",
  messagingSenderId: "166043181004",
  appId: "1:166043181004:web:2c5a7d5d86717246f40769"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };