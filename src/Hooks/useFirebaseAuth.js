import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebaseInitializationAuth from "../Firebase/firebase.initialization";

firebaseInitializationAuth();

const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  const auth = getAuth();

  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider);
  };

  const signInWithEmail = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
      console.log(user);
    });
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      userLoading(false);
    });

    return () => unsubscribed;
  }, []);

  return {
    user,
    userLoading,
    authError,
    signInWithEmail,
    googleSignIn,
  };
};

export default useFirebaseAuth;
