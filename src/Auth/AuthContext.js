import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    pepper: localStorage.getItem("pepper"),
    token: localStorage.getItem("token"),
    server: localStorage.getItem("server"),
  });

  useEffect(() => {
    if (auth.pepper) {
      localStorage.setItem("pepper", auth.pepper);
    }
    if (auth.token) {
      localStorage.setItem("token", auth.token);
    }
    if (auth.server) {
      localStorage.setItem("server", auth.server);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
