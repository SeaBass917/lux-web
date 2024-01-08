import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./font.css";
import "./index.css";

import { AuthProvider } from "./Auth/AuthContext";
import LandingPage from "./LandingPage/LandingPage";

// Create a context
export const AuthContext = createContext();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <LandingPage />
  </AuthProvider>
);
