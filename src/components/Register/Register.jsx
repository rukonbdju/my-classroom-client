import React, { useState } from "react";
import { districts } from "../../utilities/districts";
import { Link, Navigate, useNavigate } from "react-router-dom";
import bg from "../../assets/bg/gradient-bg.png";
import useAuth from "../../hooks/Auth/useAuth";
const Register = () => {
  const [passwordConfirm, setPasswordConfirm] = useState(true);
  const { user, createNewUserWithEmail, loading,errorMessage } = useAuth();
  console.log(user);
  console.log(loading)
  const handleCreateUser =async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const school = event.target.school.value;
    const address = event.target.address.value;
    const district = event.target.district.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const password2 = event.target.password2.value;
    const formData = {
      name,
      school,
      address,
      district,
      email,
      password,
      password2,
    };
     createNewUserWithEmail(email,password,name)
    if (password !== password2) {
      setPasswordConfirm(false);
      return;
    }
    event.target.reset();
  };
  if(user){
    return <Navigate to={"/"}></Navigate>
  }

  return (
    <div className="bg-slate-700">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="py-24 bg-fixed bg-no-repeat bg-cover"
      >
        <h1 className="w-11/12 mx-auto text-2xl md:text-3xl lg:text-5xl text-center font-bold">
          Welcome To Classroom!
        </h1>
        <section className="w-11/12 mx-auto md:max-w-md lg:max-w-xl">
          <h3 className="text-2xl text-center my-5">Registration now</h3>
          <form
            onSubmit={handleCreateUser}
            className="max-w-xl mx-auto flex flex-col gap-5"
          >
            <input
              required
              className="border rounded-lg p-2 block"
              placeholder="Enter name"
              type="text"
              name="name"
            />
            <input
              required
              className="border rounded-lg p-2 block"
              placeholder="Enter Your School/College/University"
              type="text"
              name="school"
            />
            <input
              required
              className="border rounded-lg p-2 block"
              placeholder="Enter Your Address"
              type="text"
              name="address"
            />
            <select
              required
              className="border rounded-lg p-2 w-full"
              name="district"
            >
              <option value="">Select your district</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            <input
              required
              className="border rounded-lg p-2 block"
              placeholder="Enter Email"
              type="text"
              name="email"
            />
            <input
              required
              className="border rounded-lg p-2 block"
              placeholder="Enter New Password"
              minLength={6}
              type="password"
              name="password"
            />
            <div>
              <input
                required
                className="border w-full rounded-lg p-2 block"
                placeholder="Confirm Password"
                type="password"
                name="password2"
              />
              {passwordConfirm || (
                <span className="text-orange-700 bg-slate-400 rounded inline-block p-1 m-1">
                  Password did not match!
                </span>
              )}
            </div>

            <button
              type="submit"
              className="font-bold rounded-lg shadow-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-slate-100 px-4 uppercase py-2"
            >
             <span className="inline-block mr-2">Register</span>
              {loading && (
                <span className="inline-block mx-1"><svg className="animate-spin inline-block -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg></span>
              )}
            </button>
            {errorMessage && (
                <span className="text-orange-700 bg-slate-400 rounded inline-block p-1 m-1">
                  {errorMessage}
                </span>
              )}
          </form>
          <p className="mt-5">
            Already have an account? Please{" "}
            <Link
              className="font-bold text-blue-700 hover:underline"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Register;
