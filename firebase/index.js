import { Firestore, getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9YNmHSXTz0T13iXBR-GVH8x_hmuYdzJk",
  authDomain: "meminder-5d629.firebaseapp.com",
  databaseURL: "https://meminder-5d629.firebaseio.com",
  projectId: "meminder-5d629",
  storageBucket: "meminder-5d629.appspot.com",
  messagingSenderId: "803547742905",
  appId: "1:803547742905:web:beb3ad8f25893cf132d168",
  measurementId: "G-W8ZWLR77WH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore();
export default  {db, app}
