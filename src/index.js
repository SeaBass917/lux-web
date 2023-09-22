import React from "react";
import ReactDOM from "react-dom/client";
import "./font.css";
import "./index.css";
import TopNavBar from "./TopNavBar/TopNavBar";
import VideoHomepage from "./VideoHomepage/VideoHomepage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TopNavBar />
    <VideoHomepage />
  </React.StrictMode>
);
