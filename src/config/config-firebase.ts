import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAXbbv3ZfPTabfh8ebJrAXLt9OANj5tgto",
  authDomain: "hotels-nextjs.firebaseapp.com",
  projectId: "hotels-nextjs",
  storageBucket: "hotels-nextjs.appspot.com",
  messagingSenderId: "605333289149",
  appId: "1:605333289149:web:874a2e1c3b6f2b9690dfd4",
  measurementId: "G-RK96PT7JJ6",
};
export const firebaseApp = initializeApp(firebaseConfig);
