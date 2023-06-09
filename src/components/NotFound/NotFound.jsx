import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border rounded-md p-5 shadow-lg">
        <h1 className="text-2xl">This Page is not found.</h1>
        <Link to={"/classroom"}>
          <button
            className="block mt-4 w-full rounded-md shadow-xl bg-gradient-to-r from-violet-500 to-fuchsia-500
              text-slate-100 px-4 py-2 uppercase"
          >
            Back to Classroom
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
