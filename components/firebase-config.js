import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAS61Ts699Plk-ysZwpAWvoI6cDeKAW1eU",
    authDomain: "eldercare-app-61fdb.firebaseapp.com",
    projectId: "eldercare-app-61fdb",
    storageBucket: "eldercare-app-61fdb.appspot.com",
    messagingSenderId: "236203086426",
    appId: "1:236203086426:web:39f027549bc7a7fc14fe63",
    measurementId: "G-DM639ML379"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export default db;
  

