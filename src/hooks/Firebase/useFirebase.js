import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { useEffect, useState } from "react";
import { handlePostMethod } from "../../utilities/handlePostMethod";

const useFirebase = () => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [updateName, setUpdateName] = useState(false)
  const [savedUserResult, setSavedUserResult] = useState({})
  const [sendResetMail, setSendResetMail] = useState(false)

  // create new user with email and password and update name and save to database
  const createNewUserWithEmail = (email, password, displayName, url) => {
    let saved;
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateUserProfile(displayName)
        const data = {
          firebaseId: result.user.uid,
          name: displayName,
          email: email,
          password: password,
          photo: '',
          cover_photo: '',
          phone: '',
          address: '',
          created_at: new Date().toString()
        }
        handlePostMethod(url, data)
          .then((result) => {
            setSavedUserResult(result)
          })
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
  }

  //sign in with email and password
  const signInWithEmail = (email, password) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) {

          setLoading(false)
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.log(error.message)
      });
    setLoading(false)
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        setUser(user)
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        setErrorMessage(errorMessage)

      })
    setLoading(false)
  }

  const emailLogOut = () => {
    setLoading(true)
    signOut(auth).then(() => {
      setUser('')
    }).catch((error) => {
      setErrorMessage(error.message)
    });
    setLoading(false)
  }

  const updateUserProfile = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      setUpdateName(true)
    }).catch((error) => {
      setErrorMessage(error.message)
    });
  }

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSendResetMail(true)
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage)
        setSendResetMail(false)
      });
  }




  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user)
      } else {
        setUser('')
      }
      setLoading(false)
    });
  }, [])

  return { createNewUserWithEmail, signInWithEmail, emailLogOut, updateUserProfile, signInWithGoogle, resetPassword, sendResetMail, user, savedUserResult, errorMessage, updateName, loading, auth };
}


export default useFirebase;