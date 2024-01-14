import { Button, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import "./VideoInfoPage.css";
import { useParams } from "react-router-dom";
import {
  getVideoCoverURL,
  getVideoEpisodesByTitle,
  getVideoMetaDataByTitle,
} from "../../Server/ServerInterface";
import { AxiosError } from "axios";
import { PlayArrow } from "@mui/icons-material";

function VideoInfoPage() {
  const { auth, setAuth } = useContext(AuthContext);
  const [metaData, setMetaData] = useState(null);
  const [episodeList, setEpisodeList] = useState(null);
  const { title } = useParams();
  const theme = useTheme();

  // Constants for the page
  const coverImgHeight = 600;
  const coverImgBlurRadius = 3;

  // Grab the metadata and the list of episodes from the server
  // once we have auth loaded.
  useEffect(() => {
    // If the user is not logged in, redirect them to the landing page
    if (auth.token === null) {
      window.location.href = "/";
      return;
    }

    getVideoMetaDataByTitle([title], auth.token, auth.server)
      .then((metaDataList) => {
        // If we reach this case, then the server sent bad data
        // on a 200 status code.
        if (metaDataList.length === 0) {
          window.location.href = "/server-error";
          return;
        }
        setMetaData(metaDataList[0]);
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

          // All other errors, just redirect to the server error page.
          console.error(err);
          window.location.href = "/server-error";
          return;
        }
      });

    getVideoEpisodesByTitle([title], auth.token, auth.server)
      .then((episodeLists) => {
        // If we reach this case, then the server sent bad data
        // on a 200 status code.
        if (episodeLists.length === 0) {
          window.location.href = "/server-error";
          return;
        }
        setEpisodeList(episodeLists[0]);
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

          // All other errors, just redirect to the server error page.
          console.error(err);
          window.location.href = "/server-error";
          return;
        }
      });
  }, [auth, title]);

  useEffect(() => {
    console.log(metaData);
  }, [metaData]);

  return (
    <div className="VideoInfoPage">
      <div
        className="VideoInfoPage__coverArt"
        style={{
          height: `${coverImgHeight}px`,
          background: `url("${getVideoCoverURL(auth, title)}")`,
          width: "100%",
          objectFit: "cover",
          backgroundColor: "rgba(255, 255, 255, .55)",
          filter: `blur(${coverImgBlurRadius}px)`,
          position: "absolute",
          zIndex: 0,
        }}
      ></div>
      <img
        src={getVideoCoverURL(auth, title)}
        alt={`Cover art depicting ${title}.`}
        style={{
          height: `${coverImgHeight + 2 * coverImgBlurRadius}px`,
          width: "50%",
          objectFit: "cover",
          position: "absolute",
          left: "25%",
          zIndex: 2,
        }}
      />
      <div
        style={{
          height: `${coverImgHeight + 2 * coverImgBlurRadius}px`,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          zIndex: 1,
          position: "relative",
        }}
      ></div>
      <div className="VideoInfoPage__header">
        <div>
          <div
            style={{
              display: "flex",
            }}
          >
            <h1
              style={{ color: theme.palette.text.primary, marginBottom: "0" }}
            >
              {title}
            </h1>
            <h2
              style={{
                color: theme.palette.text.disabled,
                marginBottom: "0",
                marginLeft: "8px",
                transform: "translateY(8px)",
              }}
            >
              ({(metaData && metaData.yearStart) || "...."})
            </h2>
          </div>
          <div>
            <h2 style={{ color: theme.palette.text.disabled, margin: "0" }}>
              {(metaData && metaData.studio) || "..."}
            </h2>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "222px",
            }}
          >
            <PlayArrow />
            Continue Watching
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{
              width: "222px",
            }}
          >
            <PlayArrow />
            Start From Beginning
          </Button>
        </div>
      </div>
      <div className="VideoInfoPage__description">
        <p
          style={{
            color: theme.palette.text.primary,
            fontSize: "20px",
            lineHeight: "1.5",
          }}
        >
          {(metaData && metaData.description) || "..."}
        </p>
      </div>
      <div className="VideoInfoPage__episodeSelection"></div>
    </div>
  );
}

export default VideoInfoPage;
