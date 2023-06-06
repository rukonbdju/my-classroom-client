import React, { createContext } from "react";
import useFirebase from "../../hooks/Firebase/useFirebase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const authInfo = useFirebase();
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
