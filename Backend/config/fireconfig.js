import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyA1_w1UcaIoUGhHzHQdjbXoDJx9xsSCHyE",
    authDomain: "whatsappp-clone.firebaseapp.com",
    databaseURL: "https://whatsappp-clone.firebaseio.com",
    projectId: "whatsappp-clone",
    storageBucket: "whatsappp-clone.appspot.com",
    messagingSenderId: "611481162563",
    appId: "1:611481162563:web:59ac8a3a9352b5ad7415f6",
    measurementId: "G-RZFBHQRX4M"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;

