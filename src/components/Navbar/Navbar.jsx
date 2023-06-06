import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";

const Navbar = () => {
    const [focus,setFocus]=useState(false)
  const authInfo = useAuth();
  const { user, loading,emailLogOut } = authInfo;
  console.log(authInfo);
  console.log({ loading });

  return (
    <div className="shadow-md fixed top-0 z-50 bg-slate-50 w-full h-16">
      <div className="w-11/12 mx-auto flex flex-row items-center justify-between py-2">
        <div className="flex flex-row items-center gap-2">
          <span
            className="material-symbols-outlined"
          >
            menu
          </span>
          <h1 className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            MyClassroom
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <div className=" hidden md:flex lg:flex flex-row items-center gap-2">
            <Link to={"/"} className="font-bold hover:underline text-blue-700">
              Home
            </Link>
            <Link
              to={"/create"}
              className="font-bold hover:underline text-blue-700"
            >
              Create
            </Link>
            <Link
              to={"/join"}
              className="font-bold hover:underline text-blue-700"
            >
              Join
            </Link>
            {user?.uid && (
              <button
                onClick={() => emailLogOut()}
                className="w-full font-bold rounded-lg shadow-xl
                  bg-gradient-to-r from-violet-500 to-fuchsia-500 text-slate-100 px-4 uppercase py-2"
              >
                Logout
              </button>
            )}
          </div>

          <div className="flex relative flex-row items-center justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12">
            <span className="text-xl font-bold">
              {user?.displayName?.slice(0, 1)}
            </span>
              {/* <div className='absolute right-0 bottom-0 p-4 rounded'>
              <h2 className="text-2xl">{user?.displayName}</h2>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
