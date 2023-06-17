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
  const [updateName, setUpdateName] = useState(false)
  const [savedUserResult, setSavedUserResult] = useState({})
  const [sendResetMail, setSendResetMail] = useState(false)

  // create new user with email and password and update name and save to database
  const createNewUserWithEmail = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return result;
    }
    catch (error) {
      console.log(error.message)
      setErrorMessage(error.message)
    }
  }

  //sign in with email and password
  const signInWithEmail = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      console.log(user)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  // google sign in
  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider)

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
      console.log(user)
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
    sendResetMail, user, savedUserResult, errorMessage, updateName, loading, auth
  };
}


export default useFirebase;