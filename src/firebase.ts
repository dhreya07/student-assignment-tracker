import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAjF9M1hkGAgemdjjdqZe8J6u-6zcdZ72Y",
  authDomain: "student-assignment-track-6a36f.firebaseapp.com",
  projectId: "student-assignment-track-6a36f",
  storageBucket: "student-assignment-track-6a36f.firebasestorage.app",
  messagingSenderId: "117705121289",
  appId: "1:117705121289:web:2f18d4d68791b59a4ee2d8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);