import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "./Auth/AuthContext";

import "./font.css";
import "./index.css";
import theme from "./theme";
import router from "./router";

// Create a context
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </AuthProvider>
);
