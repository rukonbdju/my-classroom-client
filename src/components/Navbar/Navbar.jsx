import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";
import UserInfo from "./UserInfo";

const Navbar = () => {
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

          {<UserInfo></UserInfo>}
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
