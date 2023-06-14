import React, { useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import bg from "../../assets/bg/gradient-bg.png"
import useAuth from "../../hooks/Auth/useAuth";
const Login = () => {
  const navigate = useNavigate()
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const {signInWithGoogle, signInWithEmail, user, loading, errorMessage } = useAuth()
  const handleLogin = async (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    await signInWithEmail(email, password)
    if (user) {
      e.target.reset();
    }
  }
  useEffect(()=>{
    if (user) {
      navigate(from, { replace: true });
    }
  },[user])
  return (
    <div style={{ backgroundImage: `url(${bg})` }} className=" flex flex-col justify-center items-center min-h-screen max-w-full bg-cover" >
      <div className="w-11/12 mx-auto md:max-w-md lg:max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font bold">
            Welcome Back!
          </h1>
          <h3 className="text-lg md:text-xl lg:text-2xl">Login</h3>
        </div>
        <form onSubmit={handleLogin} className=" flex flex-col items-center justify-center gap-4">
          <input
            required
            className="w-full p-2 border-2 rounded-lg"
            placeholder="Enter Email"
            type="email"
            name="email"
            id="email"
          />
          <input
            required
            className="w-full p-2 border-2 rounded-lg"
            placeholder="Enter Password"
            type="password"
            name="password"
            id="password"
          />
          <button
            type="submit"
            className="w-full font-bold rounded-lg shadow-xl
             bg-gradient-to-r from-violet-500 to-fuchsia-500 text-slate-100 px-4 uppercase py-2"
          >

            {loading ? (
              <span className="inline-block mx-1"><svg className="animate-spin inline-block -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg></span>
            ) : <span className="inline-block mr-2">Login</span>}
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
          onClick={()=>signInWithGoogle()}
          className="w-full font-bold rounded-lg shadow-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-slate-100 px-4 uppercase py-2">
          continue with google
        </button>
        <div>
          <p>
            New user? Please register{" "}
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:underline"
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
