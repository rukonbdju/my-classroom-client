import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bg from "../../assets/bg/gradient-bg.png";
import useAuth from "../../hooks/Auth/useAuth";
import Loader from "../Loader/Loader";
import { handlePostMethod } from "../../utilities/handlePostMethod";

const Register = () => {
  const navigate = useNavigate()
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [fetchLoading, setFetchLoading] = useState(false);
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState(true);
  const [savedUserResult,setSavedUserResult]=useState({})
  const { user, createNewUserWithEmail, errorMessage, updateUserProfile,deleteCurrentUser } = useAuth();
  console.log(user)

  //check confirmed password
  const handleConfirmPassword = (e) => {
    const password2 = e.target.value;
    if (password2.length > 5) {
      if (password != password2) {
        setPasswordConfirm(false)
      }
    }
    else {
      setPasswordConfirm(true)
    }
  }

  //handle create user in firebase, update name and save user info in mongoDB database
  const handleCreateUser = async (event) => {
    event.preventDefault();
    setFetchLoading(true);
    try {
      const name = event.target.name.value;
      const email = event.target.email.value;
      const password = event.target.password.value;
      const password2 = event.target.password2.value;
      if (password != password2) {
        return
      }
      //create new user
      const {user}=await createNewUserWithEmail(email, password);
      //update user name
      await updateUserProfile(name)
      if(user.displayName){
        const data = {
          firebaseId: user.uid,
          name: user.displayName,
          email: user.email,
          password: password,
          photo: '',
          cover_photo: '',
          phone: '',
          address: '',
          created_at: new Date().toString()
        }
        // save user in mongodb 
        const url = "http://localhost:3000/api/v1/users";
        const addUserToDB= await handlePostMethod(url, data)
        setSavedUserResult(addUserToDB)
      }     
    } catch(error) {
      console.log(error)
    } finally {
      event.target.reset();
      setFetchLoading(false)
    }
  };

  useEffect(()=>{
    if (savedUserResult.acknowledged||user.displayName) {
      console.log(savedUserResult)
      navigate(from, { replace: true });
    }
  },[savedUserResult,user.displayName])
  return (
    <div style={{ backgroundImage: `url(${bg})` }} className=" flex flex-col items-center justify-center min-h-screen max-w-full bg-no-repeat bg-cover">
      <div
        className="w-11/12 mx-auto md:max-w-md lg:max-w-xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font bold">
            Welcome To Classroom!
          </h1>
          <h3 className="text-lg md:text-xl lg:text-2xl">Registration now</h3>
        </div>

        <form
          onSubmit={handleCreateUser}
          className=" mx-auto flex flex-col gap-5"
        >
          <input
            required
            className="border rounded-lg p-2 block"
            type="text"
            placeholder="Enter name"
            name="name"
          />
          <input
            required
            className="border rounded-lg p-2 block"
            placeholder="Enter Email"
            type="email"
            name="email"
          />
          <input
            required
            className="border rounded-lg p-2 block"
            placeholder="Enter New Password"
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
          <div>
            <input
              required
              style={{ outlineColor: `${passwordConfirm ? 'black' : 'red'}` }}
              className="border w-full rounded-lg p-2 block"
              placeholder="Confirm Password"
              onChange={(e) => handleConfirmPassword(e)}
              type="password"
              name="password2"
            />
            {passwordConfirm || (
              <span className="text-orange-700 inline-block m-1">
                Password did not match!
              </span>
            )}
          </div>

          <button
            type="submit"
            className="font-bold rounded-lg shadow-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-slate-100 px-4 uppercase py-2"
          >
            {fetchLoading ? (
              <span className="inline-block mx-1">
                <Loader></Loader>
              </span>
            ) : (
              <span className="inline-block mr-2">Register</span>
            )}
          </button>
          {errorMessage == 'Firebase: Error (auth/email-already-in-use).' && (
            <span className="text-orange-700 inline-block m-1">
              This email already have an account.
            </span>
          )}
        </form>
        <div className="flex flex-row items-center gap-1 my-4">
          <span className="inline-block border-b border-slate-700 w-full"></span>
          <span className="uppercase ">or</span>
          <span className="inline-block border-b  border-slate-700 w-full"></span>
        </div>
        <button
          className="w-full font-bold rounded-lg shadow-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-slate-100 px-4 uppercase py-2">
          continue with google
        </button>
        <p className="mt-5">
          Already have an account? Please{" "}
          <Link
            className="font-bold text-blue-700 hover:underline"
            to={"/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
