import React from "react";
import useAuth from "../../hooks/Auth/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Home from "../../components/Home/Home";

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  let location = useLocation();
  if (loading) {
    return (
      <span className="flex items-center justify-center h-screen w-screen">
        <svg
          className="animate-spin inline-block -ml-1 mr-3 h-8 w-8 text-black"
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
    );
  }
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
  }
  return children;
};

export default AuthRoute;