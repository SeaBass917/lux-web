import { useEffect, useContext, useState } from "react";

import { AuthContext } from "../Auth/AuthContext";
import HorizontalScrollSection from "../HorizontalScrollSection/HorizontalScrollSection";
import { getVideoCollectionIndex } from "../Server/ServerInterface";
import TopNavBar from "../TopNavBar/TopNavBar";
import "./VideoHomepage.css";
import { AxiosError } from "axios";
import { ConstructionOutlined } from "@mui/icons-material";

function VideoHomepage() {
  const { auth, setAuth } = useContext(AuthContext);
  const [metaDataList, setMetaDataList] = useState([]);

  useEffect(() => {
    // If the user is not logged in, redirect them to the landing page
    // TODO: Check to see if the token is valid
    if (auth.token === null) {
      window.location.href = "/";
      return;
    }

    // Get the videos from the server
    getVideoCollectionIndex(auth.token, auth.server)
      .then((videoCollectionIndex) => {
        setMetaDataList(videoCollectionIndex);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          const status = err.response?.status;
          if (status === 401) {
            setAuth({
              token: null,
              server: auth.server,
              pepper: auth.pepper,
            });
            return;
          } else if (status === 403) {
            window.location.href = "/blacklist";
            return;
          }
        }
        console.error(err);
      });
  }, [auth]);

  return (
    <div className="VideoHomepage">
      <TopNavBar />
      <HorizontalScrollSection
        title="Recently Added"
        metaDataList={metaDataList
          .sort((a, b) => {
            return b.dateAdded - a.dateAdded;
          })
          .slice(0, 15)}
      ></HorizontalScrollSection>
    </div>
  );
}

export default VideoHomepage;
