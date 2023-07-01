import React from 'react';
import useAuth from '../../hooks/Auth/useAuth';
import { Link } from 'react-router-dom';

const UserInfo = () => {
  const { user, emailLogOut } = useAuth()
  console.log(user)
  return (
    <div>
      {user ? (
        <div className="relative group">
          <button

            className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12"
          >
            {user.photoURL ? (
              <img className='rounded-full' src={user.photoURL} />
            ) : (
              user.displayName?.slice(0, 1)
            )}
          </button>
          <div className="absolute hidden  group-focus-within:block right-0 bg-slate-200">
            <div className="p-2 flex flex-col items-center justify-center">
              {user.photoURL ? (
                <img className='rounded-full' src={user?.photoURL} />
              ) : (
                <div className="p-4 font-bold rounded-full w-10 h-10 bg-blue-600 text-slate-50 flex items-center justify-center">{user?.displayName?.slice(0, 1)}</div>
              )}
              <h2 className="text-md font-bold">{user.displayName}</h2>
              <h2 className="text-sm">{user?.email}</h2>
            </div>
            <hr />
            <Link className="block text-center hover:bg-slate-700 py-1 hover:text-slate-50">Update Profile</Link>
            <hr />
            <Link className="block text-center hover:bg-slate-700 py-1 hover:text-slate-50">Activity</Link>
            <hr />
            <div onClick={() => emailLogOut()} className='text-center cursor-pointer py-1 hover:bg-slate-700 hover:text-slate-50'>
              <button>Logout</button>
            </div>
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