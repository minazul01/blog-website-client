import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, use, useEffect, useState } from "react";
import auth from "./Firebase.auth";

export const context = createContext(null);

const NewProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
console.log('user here',user)

  // signUp user email and password
  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // signIn user email and password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // google provider
  const googleProvider = new GoogleAuthProvider();
  // Google signIn user
  const googleUser = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // LogOut  user
  const logOutUser = () => {
    return signOut(auth);
  };
  //    update Profile
  const updateProfile = (userName, image) => {
    return updateProfile(auth, user, {
      displayName: userName,
      photoURL: image,
    });
  };

//   OnChangence on auth user
useEffect(() => {
    const subscribe = (auth, (currentUser) => {
        setUser(currentUser);
        console.log(currentUser)
        setLoading(false);
    });
    return () => {
        subscribe();
    };
}, []);


  const authInfo = {
    loading,
    user,
    signUpUser,
    signInUser,
    googleUser,
    logOutUser,
    updateProfile,
  };
  return <context.Provider value={authInfo}>{children}</context.Provider>;
};

export default NewProvider;
