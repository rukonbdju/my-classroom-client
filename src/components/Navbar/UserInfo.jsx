import React from 'react';
import useAuth from '../../hooks/Auth/useAuth';
import { Link } from 'react-router-dom';

const UserInfo = () => {
    const {user,emailLogOut}=useAuth()
    return (
        <div>
            {user ? (
            <div className="relative group">
              <button

                className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} />
                ) : (
                  user.displayName?.slice(0, 1)
                )}
              </button>
              <div className="absolute hidden  group-focus-within:block right-0 bg-slate-300 p-2 rounded-md">
                <div className="pb-2 mb-4 border-b border-slate-700 flex flex-col items-center justify-center">
                  {user.photoURL ? (
                    <img src={user?.photoURL} />
                  ) : (
                    <div className="p-4 font-bold rounded-full w-10 h-10 bg-blue-600 flex items-center justify-center">{user?.displayName?.slice(0, 1)}</div>
                  )}
                  <h2 className="text-md font-bold">{user.displayName}</h2>
                  <h2 className=" text-sm bg-slate-200 rounded-full px-2">{user?.email}</h2>
                  <Link className="underline mt-2">Edit Profile</Link>
                </div>
                {user.uid && (
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
        </div>
    );
};

export default UserInfo;