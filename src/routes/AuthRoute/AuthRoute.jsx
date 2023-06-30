import React from "react";
import useAuth from "../../hooks/Auth/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();

  let location = useLocation();
  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center">
      <Loader></Loader>
    </div>;
  }
  if (user) {
    return children
  }
  else {
    return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
  }
};

export default AuthRoute;
