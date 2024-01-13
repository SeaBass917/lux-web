import { useContext, useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";

import { AuthContext } from "../Auth/AuthContext";
import { VideoCard, cardWidth, cardHeight, cardMargin } from "./VideoCard";
import { Grid } from "@mui/material";

function GridScrollSection({ title, metaDataList }) {
  const { auth, setAuth } = useContext(AuthContext);

  // Constants for the component
  const containerPadding = 32;

  const theme = useTheme();

  return (
    <div
      className="GridScrollSection"
      style={{
        padding: `0 ${containerPadding}px`,
      }}
    >
      <h1
        style={{
          color: theme.palette.text.primary,
        }}
      >
        {title}
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          overflow: "hidden",
        }}
      >
        {metaDataList.map((metaData, index) => {
          return (
            <VideoCard
              key={index}
              title={metaData.title}
              yearStart={metaData.yearStart}
              auth={auth}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GridScrollSection;
