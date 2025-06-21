// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //   apiKey: import.meta.env.VITE_apiKey,
  //   authDomain: import.meta.env.VITE_authDomain,
  //   projectId: import.meta.env.VITE_projectId,
  //   storageBucket: import.meta.env.VITE_storageBucket,
  //   messagingSenderId: import.meta.env.VITE_messagingSenderId,
  //   appId: import.meta.env.VITE_appId

  apiKey: "AIzaSyB4WeP954AZIMI-qcBxxkzD6iF2EzYhd2M",
   authDomain: "blog-a11cc.firebaseapp.com",
  projectId: "blog-a11cc",
  storageBucket: "blog-a11cc.firebasestorage.app",
  messagingSenderId: "272577182565",
  appId: "1:272577182565:web:9c0eb023474045b010ff8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
