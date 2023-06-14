import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bg from "../../assets/bg/gradient-bg.png";
import useAuth from "../../hooks/Auth/useAuth";

const Register = () => {
  const navigate = useNavigate()
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [fetchLoading, setFetchLoading] = useState(false);
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState(true);
  const { user, createNewUserWithEmail, errorMessage, savedUserResult } = useAuth();
  console.log(savedUserResult)

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
      const url = "http://localhost:3000/api/v1/users";
      await createNewUserWithEmail(email, password, name, url);
    } catch {
      (err) => console.log(err);
    } finally {
      event.target.reset();
      setFetchLoading(false);
    }
  };

  useEffect(()=>{
    if (user) {
      navigate(from, { replace: true });
    }
  },[user])
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
                <svg
                  className="animate-spin inline-block -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
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
