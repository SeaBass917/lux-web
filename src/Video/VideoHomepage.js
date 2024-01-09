import { useEffect, useContext } from "react";

import { AuthContext } from "../Auth/AuthContext";
import HorizontalScrollSection from "../HorizontalScrollSection/HorizontalScrollSection";
import TopNavBar from "../TopNavBar/TopNavBar";
import "./VideoHomepage.css";

function VideoHomepage() {
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    // If the user is not logged in, redirect them to the landing page
    // TODO: Check to see if the token is valid
    if (auth.token === null) {
      window.location.href = "/";
    }
  }, [auth]);

  return (
    <div className="VideoHomepage">
      <TopNavBar />
      <HorizontalScrollSection title="Recently Watched"></HorizontalScrollSection>
      <HorizontalScrollSection title="Recently Watched"></HorizontalScrollSection>
    </div>
  );
}

export default VideoHomepage;
