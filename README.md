// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl46lrkQejIIz24g1P7Qt2ktNbG0MML4o",
  authDomain: "avis-au-client.firebaseapp.com",
  databaseURL: "https://avis-au-client-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "avis-au-client",
  storageBucket: "avis-au-client.firebasestorage.app",
  messagingSenderId: "291367297087",
  appId: "1:291367297087:web:09beaf7794126fc79bd88a",
  measurementId: "G-WESSM7PQZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



Pour héberger votre site sur Firebase Hosting, vous devez disposer de la CLI Firebase (un outil de ligne de commande).

Exécutez la commande npm pour installer la CLI ou la mettre à jour.

npm install -g firebase-tools