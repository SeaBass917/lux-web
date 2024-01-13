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
    } else {
      localStorage.removeItem("pepper");
    }
    if (auth.token) {
      localStorage.setItem("token", auth.token);
    } else {
      localStorage.removeItem("token");
    }
    if (auth.server) {
      localStorage.setItem("server", auth.server);
    } else {
      localStorage.removeItem("server");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
