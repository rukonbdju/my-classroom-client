import React from "react";
import useAuth from "../../hooks/Auth/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Home from "../../components/Home/Home";
import Loader from "../../components/Loader/Loader";

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  let location = useLocation();
  if (loading) {
    return <Loader></Loader>;
  }
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
  }
  return children;
};

export default AuthRoute;
