import { useTheme } from "@emotion/react";
import { getVideoCoverURL } from "../Server/ServerInterface";
import "./VideoCard.css";

function VideoCard({ title, yearStart, auth, width, height, margin }) {
  const theme = useTheme();

  return (
    <div
      className="VideoCard"
      style={{
        width: `${width}px`,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
        height: `${height}px`,
        marginRight: `${margin}px`,
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
      }}
    >
      <img
        src={getVideoCoverURL(auth, title)}
        alt={title}
        style={{
          height: "85%",
          width: "100%",
          marin: "auto",
          display: "block",
          objectFit: "cover",
          overflow: "hidden",
        }}
      />
      <div
        id="VideoCard__title"
        style={{
          height: "30%",
          width: "100%",
          margin: "auto",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "top",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <h2
            style={{
              margin: "20px 0 0 0",
              padding: "0",
              textAlign: "left",
              alignSelf: "flex-start",
              width: "100%",
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </h2>
          {yearStart && (
            <h2
              style={{
                margin: "20px 0 0 5px",
                padding: "0",
                textAlign: "left",
                alignSelf: "flex-start",
                width: "100%",
                color: theme.palette.text.disabled,
              }}
            >
              ({yearStart})
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
