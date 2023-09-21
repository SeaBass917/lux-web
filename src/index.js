import React from "react";
import ReactDOM from "react-dom/client";
import "./font.css";
import "./index.css";
import TopNavBar from "./TopNavBar/TopNavBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TopNavBar />
  </React.StrictMode>
);
