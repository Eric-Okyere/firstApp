import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPHv9KlK7yIHTiQPYwmasAuKlSP5gcwPE",
  authDomain: "chat-app-1cf5e.firebaseapp.com",
  projectId: "chat-app-1cf5e",
  storageBucket: "chat-app-1cf5e.appspot.com",
  messagingSenderId: "1031816000928",
  appId: "1:1031816000928:web:e6a6840e74bb199853e0c5"
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

