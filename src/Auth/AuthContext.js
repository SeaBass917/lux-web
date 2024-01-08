import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    pepper: localStorage.getItem("pepper"),
    token: localStorage.getItem("token"),
    server: localStorage.getItem("server"),
  });

  useEffect(() => {
    localStorage.setItem("pepper", auth.pepper);
    localStorage.setItem("token", auth.token);
    localStorage.setItem("server", auth.server);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
