import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Button, useTheme } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

import { AuthContext } from "../../Auth/AuthContext";
import { getVideoURL } from "../../Server/ServerInterface";
import TopNavBar from "../../TopNavBar/TopNavBar";
import {
  VideoEpisodeList,
  cleanEpisodeTitle,
} from "../VideoEpisodeList/VideoEpisodeList";
import "./VideoPlayerPage.css";

function VideoPlayerPage() {
  const { auth, setAuth } = useContext(AuthContext);
  const { seriesTitle, episodeTitle } = useParams();
  const [playing, setPlaying] = useState(true);
  const player = useRef();

  const theme = useTheme();

  return (
    <div className="VideoPlayerPage">
      <TopNavBar />
      <ReactPlayer
        url={getVideoURL(auth, seriesTitle, episodeTitle)}
        controls={true}
        playing={playing}
        width={"50%"}
        height={"auto"}
        volume={0.05}
        ref={player}
        style={{
          margin: "48px auto 0",
        }}
        config={{
          file: {
            attributes: {
              crossOrigin: "use-credentials",
              preload: "auto",
            },
            forceVideo: true,
            forceAudio: true,
          },
        }}
      />
      <div
        className="VideoPlayerPage__navButtonContainer"
        style={{
          margin: "16px 25% 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            justifyContent: "center",
          }}
          className="VideoInfoPage__watchingButton"
          variant="contained"
          color="primaryDark"
        >
          <ArrowBack />
          Previous
        </Button>
        <Button
          sx={{
            justifyContent: "center",
          }}
          className="VideoInfoPage__watchingButton"
          variant="contained"
          color="primaryDark"
        >
          Next
          <ArrowForward />
        </Button>
      </div>
      <div className="VideoPlayerPage__titleContainer">
        <div>
          <h3
            style={{
              color: theme.palette.primary.main,
              cursor: "pointer",
            }}
            onClick={() => {
              window.location.href = `/series/${seriesTitle}`;
            }}
          >
            {seriesTitle}
          </h3>
          <h2
            style={{
              margin: "0 0 32px",
            }}
          >
            {cleanEpisodeTitle(episodeTitle)}
          </h2>
        </div>
      </div>
      <VideoEpisodeList />
    </div>
  );
}

export default VideoPlayerPage;
