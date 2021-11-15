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
  const [authErrorLogin, setAuthErrorLogin] = useState("");
  const [authErrorRegister, setAuthErrorRegister] = useState("");
  const [admin, setAdmin] = useState(false);

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
            setAuthErrorRegister(err.message);
          });

        // redirecting to home page
        history.replace("/");
      })
      .catch((err) => {
        setAuthError(err.message);
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  const logInUserWithEmail = (email, password, location, history) => {
    setUserLoading(true);
    setAuthError("");
    const redirectURL = location?.state?.from?.pathname || "/";
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        history.replace(redirectURL);
        setUserLoading(false);
      })
      .catch((err) => {
        setAuthError(err.message);
        setUserLoading(false);
      });
  };
  const logout = () => {
    setUserLoading(true);
    signOut(auth)
      .then(() => {
        console.log("logout successful");
      })
      .catch((err) => {})
      .finally(() => {
        setUserLoading(false);
      });
  };

  const dashBoardLogOut = () => {
    setUserLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    setUserLoading(true);
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAdmin(user);
        setUserLoading(false);
      } else {
        setUser(null);
        setAdmin(null);
        setUserLoading(false);
      }
    });

    return () => unsubscribed;
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://127.0.0.1:5000/users/admin/${user.uid}`)
        .then((res) => res.json())
        .then((data) => setAdmin(data.isAdmin));
    }
  }, [user?.uid]);

  return {
    user,
    userLoading,
    authError,
    createUserWithEmail,
    googleSignIn,
    logout,
    logInUserWithEmail,
    admin,
    dashBoardLogOut,
    authErrorRegister,
  };
};

export default useFirebaseAuth;
