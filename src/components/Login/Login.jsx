import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import bg from "../../assets/bg/gradient-bg.png"
import useAuth from "../../hooks/Auth/useAuth";
const Login = () => {
  const navigate= useNavigate()
    const {signInWithEmail,user,loading, errorMessage}=useAuth()
    const handleLogin=async(e)=>{
      e.preventDefault()
      const email=e.target.email.value;
      const password=e.target.password.value;
      await signInWithEmail(email,password) 
      e.target.reset();
    }
    if(user){
      return<Navigate to={'/classroom'}></Navigate>
    }
  return (
    <div className=" bg-slate-700" >
      <div style={{backgroundImage:`url(${bg})`}} className="">
        <form onSubmit={handleLogin} className="h-screen flex flex-col items-center justify-center max-w-lg mx-auto gap-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl mb-12 font bold">
            Welcome Back!
          </h1>
          <input
          required
            className="w-full p-3 border-2 rounded-lg"
            placeholder="Enter Email"
            type="email"
            name="email"
            id="email"
          />
          <input
          required
            className="w-full p-3 border-2 rounded-lg"
            placeholder="Enter Password"
            type="password"
            name="password"
            id="password"
          />
          <button
            type="submit"
            className="w-full font-bold rounded-lg shadow-xl
             bg-gradient-to-r from-violet-500 to-fuchsia-500 text-slate-100 px-4 uppercase py-2 md:py-3 lg:py-3"
          >
            
              {loading ? (
                <span className="inline-block mx-1"><svg className="animate-spin inline-block -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg></span>
              ):<span className="inline-block mr-2">Login</span>}
          </button>
          {errorMessage && <span>{errorMessage}</span>}
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
        </form>
        
      </div>
    </div>
  );
};

export default Login;
