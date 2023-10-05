import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";
import Loader from "../Loader/Loader";
import { handlePostMethod } from "../../utilities/handlePostMethod";
const Login = () => {
  const navigate = useNavigate()
  let location = useLocation();

  let from = location.state?.from?.pathname || "/classrooms";

  const [loading, setLoading] = useState()
  const { signInWithGoogle, signInWithEmail, user, errorMessage } = useAuth()

  //login with email and password
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const email = e.target.email.value;
      const password = e.target.password.value;
      await signInWithEmail(email, password)
    } catch (error) {
      console.log(error)
    } finally {
      e.target.reset();
      setLoading(false)
    }
  }

  //google sign in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle()
      const data = {
        firebaseId: result.uid,
        name: result.displayName,
        email: result.email,
        password: '',
        photo: result.photoURL,
        address: '',
        created_at: new Date().toString()
      }
      // save user in mongodb 
      const url = "https://my-classroom-server.onrender.com/api/v1/users";
      await handlePostMethod(url, data)

    } catch (error) {
      console.log(error)
    }
  }
  //navigate user where he wanted to go without Login
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user])
  return (
    <div className=" flex flex-col justify-center items-center min-h-screen max-w-full bg-indigo-100" >
      <div className="w-11/12 mx-auto md:max-w-md lg:max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-5xl inline-block font bold bg-clip-text text-transparent bg-gradient-to-r
         from-sky-500 to-indigo-500">
            Welcome Back!
          </h1>
          <br />
          <h3 className="text-lg md:text-xl lg:text-2xl inline-block bg-clip-text text-transparent bg-gradient-to-r
         to-sky-500 from-indigo-500">Login</h3>
        </div>
        <form onSubmit={handleLogin} className=" flex flex-col items-center justify-center gap-4">
          <input
            required
            className="w-full p-2 border-2 rounded-lg outline-indigo-700"
            placeholder="Enter Email"
            type="email"
            name="email"
            id="email"
          />
          <input
            required
            className="w-full p-2 border-2 rounded-lg outline-indigo-700"
            placeholder="Enter Password"
            type="password"
            name="password"
            id="password"
          />
          <button
            type="submit"
            className="w-full font-bold rounded-lg shadow-xl
            bg-gradient-to-r from-indigo-500 to-sky-500 text-slate-100 px-4 uppercase py-2"
          >
            {loading ? (
              <span className="inline-block mx-1">
                <Loader></Loader>
              </span>
            ) : <span className="inline-block mr-2 ">Login</span>}
          </button>
        </form>
        <Link to={'/reset_password'}>
          <p className="text-xs hover:underline">Forgot password?</p>
        </Link>
        {errorMessage == 'Firebase: Error (auth/user-not-found).' && <span className="text-red-600">Email is not found.</span>}
        {errorMessage == 'Firebase: Error (auth/wrong-password).' && <span className="text-red-600">Incorrect password try again</span>}

        <div className="flex flex-row items-center gap-1 my-4">
          <span className="inline-block border-b border-slate-700 w-full"></span>
          <span className="uppercase ">or</span>
          <span className="inline-block border-b  border-slate-700 w-full"></span>
        </div>
        <button
          onClick={() => handleGoogleSignIn()}
          className="w-full font-bold rounded-lg shadow-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-slate-100 px-4 uppercase py-2">
          continue with google
        </button>
        <div>
          <p>
            New user? Please register{" "}
            <Link
              to="/register"
              className="text-indigo-700 hover:underline"
            >
              here
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
