import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { useEffect, useState } from "react";
import { handlePostMethod } from "../../utilities/handlePostMethod";

const useFirebase = () => {
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [updateName, setUpdateName] = useState(false)
  const createNewUserWithEmail = (email, password,displayName) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(user => {
        if (user) {
          updateUserProfile(displayName)       
        }
      })
      .catch(e => setErrorMessage(e.message))
    setLoading(false)
  }


  const signInWithEmail = (email, password, navigate) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if(user){
         
          setLoading(false)
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.log(error.message)
      });
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
  }, [auth])

  return { createNewUserWithEmail, signInWithEmail, emailLogOut, updateUserProfile, user, errorMessage, updateName, loading };
}


export default useFirebase;