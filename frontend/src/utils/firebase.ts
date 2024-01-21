import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8SFvBFzQBrn6CF4580efi9ZAnLdNMipc",
  authDomain: "cod-database-48516.firebaseapp.com",
  projectId: "cod-database-48516",
  storageBucket: "cod-database-48516.appspot.com",
  messagingSenderId: "65852686259",
  appId: "1:65852686259:web:c219737535d97262ebd5c6",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get a reference to the storage service
const storage = firebase.storage();

export { storage, firebase };
