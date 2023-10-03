import React from "react";
import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";

const Navbar = () => {
  return (
    <div className="shadow-md backdrop-blur-sm  fixed top-0 z-50 bg-indigo-200 bg-opacity-60 w-full h-16 flex items-center">
      <div className="w-11/12 mx-auto flex flex-row items-center justify-between py-2">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r
         from-sky-500 to-indigo-500">
          <Link to={'/'}>MyClassroom</Link>
        </h1>
        <div className="flex flex-row items-center justify-center gap-2">
          <div className=" hidden md:hidden lg:flex flex-row items-center gap-6">
            <Link
              to={"/classrooms"}
              className="font-bold hover:underline text-indigo-500"
            >
              Classroom
            </Link>
            <Link
              to={"/classroom/create"}
              className="font-bold hover:underline text-indigo-500"
            >
              Create
            </Link>
            <Link
              to={"/classroom/join"}
              className="font-bold hover:underline text-indigo-500"
            >
              Join
            </Link>
          </div>

          {<UserInfo></UserInfo>}
          <div className="block mg:hidden lg:hidden group ">
            <button className="flex flex-row relative items-center justify-center" >
              <div className=" flex flex-col gap-2 cursor-pointer">
                <div className="h-1 bg-black w-8"></div>
                <div className="h-1 bg-black w-8"></div>
                <div className="h-1 bg-black w-8"></div>
              </div>
              <div className="absolute top-6 right-0 hidden group-focus-within:block mt-5 bg-slate-300">
                <div className="bg-indigo-700 p-2">
                  <Link
                    to={"/classroom"}
                    className="font-bold text-white hover:bg-indigo-950 block p-2 text-left pr-5"
                  >
                    Classroom
                  </Link>
                  <Link
                    to={"/classroom/create"}
                    className="font-bold text-white hover:bg-indigo-950 block p-2 text-left pr-5"
                  >
                    Create
                  </Link>
                  <Link
                    to={"/classroom/join"}
                    className="font-bold text-white hover:bg-indigo-950 block p-2 text-left pr-5"
                  >
                    Join
                  </Link>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
