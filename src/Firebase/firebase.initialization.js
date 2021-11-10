import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const firebaseInitializationAuth = () => {
  initializeApp(firebaseConfig);
};

export default firebaseInitializationAuth;
