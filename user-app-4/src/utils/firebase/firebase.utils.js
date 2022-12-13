import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEcUfiHDc2KJMNGzBI-5t5o441tLKP7j4",
  authDomain: "fancyhut-9e6c2.firebaseapp.com",
  databaseURL: "https://fancyhut-9e6c2-default-rtdb.firebaseio.com",
  projectId: "fancyhut-9e6c2",
  storageBucket: "fancyhut-9e6c2.appspot.com",
  messagingSenderId: "675526068820",
  appId: "1:675526068820:web:6d2a192d7b7a8007147bc1"
};

// const firebaseApp = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
const db = getFirestore(app);
export {db}
export const storage = getStorage(app);
