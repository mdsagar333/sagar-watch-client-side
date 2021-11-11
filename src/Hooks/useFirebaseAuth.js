import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithEmailAndPassword,
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

    return signInWithPopup(auth, googleProvider);
  };

  const createUserWithEmail = (email, password, name, history) => {
    setUserLoading(true);
    setAuthError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        updateProfile(auth.currentUser, { displayName: name })
          .then((res) => {
            console.log("update", res);
          })
          .catch((err) => {
            console.log(err);
            setAuthError(err.message);
          });
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        setAuthError(err.message);
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  const logInUserWithEmail = (email, password, location, history) => {
    const redirectURL = location?.state?.from?.pathname || "/";
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        history.replace(redirectURL);
      })
      .catch((err) => {
        setAuthError(err.message);
      });
  };
  const logout = () => {
    setUserLoading(true);
    signOut(auth)
      .then(() => {
        console.log("logout successful");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  useEffect(() => {
    setUserLoading(true);
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserLoading(false);
      } else {
        setUser(null);
        setUserLoading(false);
      }

      setUserLoading(false);
    });

    return () => unsubscribed;
  }, []);

  return {
    user,
    userLoading,
    authError,
    createUserWithEmail,
    googleSignIn,
    logout,
    logInUserWithEmail,
  };
};

export default useFirebaseAuth;
