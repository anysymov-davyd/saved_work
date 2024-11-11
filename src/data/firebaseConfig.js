// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpAuz7WhnOgfeDtRi6lz2khj2VfzIiSL0",
  authDomain: "portfolio-webiste-65b77.firebaseapp.com",
  projectId: "portfolio-webiste-65b77",
  storageBucket: "portfolio-webiste-65b77.appspot.com",
  messagingSenderId: "578428846296",
  appId: "1:578428846296:web:f2c9209c6d3036ba4d97ad",
  measurementId: "G-Q40VXHMFKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig