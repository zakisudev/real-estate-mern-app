// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-real-estate-e04b2.firebaseapp.com',
  projectId: 'mern-real-estate-e04b2',
  storageBucket: 'mern-real-estate-e04b2.appspot.com',
  messagingSenderId: '244705494688',
  appId: '1:244705494688:web:feb5f85b24377e543aebc5',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
