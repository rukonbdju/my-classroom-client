import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../../../firebase.config";
import { useEffect, useState } from "react";

const useFirebase = () => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [savedUserResult, setSavedUserResult] = useState({})
  const [sendResetMail, setSendResetMail] = useState(false)
  // create new user with email and password and update name and save to database
  const createNewUserWithEmail = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return result;
    }catch (error) {
      setErrorMessage(error.message)
    }
  }

  //sign in with email and password
  const signInWithEmail = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  // google sign in
  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider)
      return user;
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  //log out
  const emailLogOut = async () => {
    try {
      await signOut(auth)
      setUser('')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
//update user profile
  const updateUserProfile = async (name) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name
      })
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  //sent mail for reset password
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      setSendResetMail(true)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  //delete user
  const deleteCurrentUser = async () => {
    try {
      const user = auth.currentUser;
      await deleteUser(user)
      setUser('')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  //get user at any time
  useEffect(() => {
    setLoading(true) 
      onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser('')
      }
      setLoading(false)
    });
  }, [])

  return {
    createNewUserWithEmail,
    signInWithEmail,
    emailLogOut,
    updateUserProfile,
    signInWithGoogle,
    resetPassword,
    deleteCurrentUser,
    sendResetMail, user, savedUserResult, errorMessage, loading, auth
  };
}


export default useFirebase;