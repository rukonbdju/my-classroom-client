import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";

const Navbar = () => {
  const authInfo = useAuth();
  const { user, loading, emailLogOut } = authInfo;
  return (
    <div className="shadow-md fixed top-0 z-50 bg-slate-50 w-full h-16 flex items-center">
      <div className="w-11/12 mx-auto flex flex-row items-center justify-between py-2">
        <h1 className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          MyClassroom
        </h1>
        <div className="flex flex-row items-center justify-center gap-2">
          <div className=" hidden md:hidden lg:flex flex-row items-center gap-6">
            <Link
              to={"/classroom"}
              className="font-bold hover:underline text-blue-700"
            >
              Classroom
            </Link>
            <Link
              to={"/classroom/create"}
              className="font-bold hover:underline text-blue-700"
            >
              Create
            </Link>
            <Link
              to={"/classroom/join"}
              className="font-bold hover:underline text-blue-700"
            >
              Join
            </Link>
          </div>

          {user ? (
            <div className="relative group">
              <button

                className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12"
              >
                {user?.photoURL ? (
                  <img src="user?.photoURL" />
                ) : (
                  user?.displayName?.slice(0, 1)
                )}
              </button>
              <div className="absolute hidden  group-focus-within:block right-0 bg-slate-300 p-2 rounded-md">
                <div className="pb-2 mb-4 border-b border-slate-700 flex flex-col items-center justify-center">
                  {user?.photoURL ? (
                    <img src="user?.photoURL" />
                  ) : (
                    <div className="p-4 font-bold rounded-full w-10 h-10 bg-blue-600 flex items-center justify-center">{user?.displayName?.slice(0, 1)}</div>
                  )}
                  <h2 className="text-md font-bold">{user?.displayName}</h2>
                  <h2 className=" text-sm bg-slate-200 rounded-full px-2">{user?.email}</h2>
                  <Link className="underline mt-2">Edit Profile</Link>
                </div>
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
            </div>
          ) : (
            <Link to={"/login"}>
              <button
                className="w-full font-bold rounded-lg shadow-xl
                  bg-gradient-to-r from-violet-500 to-fuchsia-500 text-slate-100 px-4 uppercase py-2"
              >
                Login
              </button>
            </Link>
          )}
          <div className="block mg:hidden lg:hidden relative group ">
            <button className="flex flex-row items-center justify-center" >
              <span className="material-symbols-outlined cursor-pointer">
                menu
              </span>
            </button>
            {
              <div className="absolute right-0 hidden group-focus-within:block mt-4 py-2 pr-6 pl-2 rounded-md bg-slate-300">
                <div className="flex flex-col gap-2">
                  <Link
                    to={"/classroom"}
                    className="font-bold hover:text-blue-700"
                  >
                    Classroom
                  </Link>
                  <Link
                    to={"/classroom/create"}
                    className="font-bold hover:text-blue-700"
                  >
                    Create
                  </Link>
                  <Link
                    to={"/classroom/join"}
                    className="font-bold hover:text-blue-700"
                  >
                    Join
                  </Link>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
