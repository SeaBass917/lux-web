import { ThemeProvider } from "@mui/material";
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./font.css";
import "./index.css";
import theme from "./theme";

import { AuthProvider } from "./Auth/AuthContext";
import LandingPage from "./LandingPage/LandingPage";

// Create a context
export const AuthContext = createContext();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  </AuthProvider>
);
