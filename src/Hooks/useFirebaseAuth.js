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
      .then((userCredential) => {
        // saving to database
        const user = userCredential.user;

        // updating user name
        updateProfile(auth.currentUser, { displayName: name })
          .then(() => {
            console.log("profile update");
            fetch("http://127.0.0.1:5000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                userUID: user.uid,
                role: "user",
              }),
            });
          })
          .catch((err) => {
            console.log(err);
            setAuthError(err.message);
          });

        // redirecting to home page
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
