import { Button } from "@mui/material";
import { AuthContext } from "../Auth/AuthContext";
import "./HorizontalScrollSection.css";
import { useContext, useEffect, useRef, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import VideoCard from "../Video/VideoCard";
import { useTheme } from "@emotion/react";

function HorizontalScrollSection({ title, metaDataList }) {
  const scrollContainerRef = useRef(null);
  const [isLeftScrollButtonVisible, setIsLeftScrollButtonVisible] =
    useState(false);
  const [isRightScrollButtonVisible, setIsRightScrollButtonVisible] =
    useState(true);
  const { auth, setAuth } = useContext(AuthContext);

  // Constants for the component
  const containerPadding = 32;

  // Constants for the child cards
  const cardWidth = 400;
  const cardHeight = 300;
  const cardMargin = 16;

  /**
   * Scroll the container by a fixed amount.
   * If left is true, scroll left. Otherwise, scroll right.
   * Scrolling will be in increments of the card length,
   * we should not scroll and hit the middle of a card.
   */
  const scrollFixedDistance = (left = false) => {
    const factor = left ? -1 : 1;
    const posCurrent = scrollContainerRef.current.scrollLeft;
    const totalCardSpace = cardWidth + cardMargin;

    // Scroll up to the last card visible
    const scrollAmount =
      Math.floor(window.innerWidth / totalCardSpace) * totalCardSpace;

    // Adjust the scroll amount so that we don't scroll to the middle of a card
    const scrollAmountAdjusted =
      scrollAmount - factor * (posCurrent % totalCardSpace);

    // Jump to that scroll position
    scrollContainerRef.current.scrollTo({
      left: posCurrent + factor * scrollAmountAdjusted,
      behavior: "smooth",
    });
  };

  /**
   * Check both scroll buttons to see if they should be visible,
   * and set their visibility accordingly.
   */
  const setScrollButtonVisibility = () => {
    const { scrollLeft, scrollWidth, offsetWidth } = scrollContainerRef.current;
    setIsLeftScrollButtonVisible(scrollLeft > 0);
    setIsRightScrollButtonVisible(scrollLeft < scrollWidth - offsetWidth);
  };

  /**
   * Assign Event Listeners for handling the click and dragging of cards.
   */
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 1; //scroll-fast
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    scrollContainer.addEventListener("mousedown", handleMouseDown);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);
    scrollContainer.addEventListener("mouseup", handleMouseUp);
    scrollContainer.addEventListener("mousemove", handleMouseMove);

    return () => {
      scrollContainer.removeEventListener("mousedown", handleMouseDown);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      scrollContainer.removeEventListener("mouseup", handleMouseUp);
      scrollContainer.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const theme = useTheme();

  return (
    <div
      className="HorizontalScrollSection"
      style={{
        padding: `${containerPadding}px ${containerPadding}px 0 ${containerPadding}px`,
        // height: `${cardHeight + 2 * containerPadding}px`,
      }}
    >
      <h1>{title}</h1>
      <div style={{ display: "flex" }}>
        {isLeftScrollButtonVisible && (
          <Button
            style={{
              alignSelf: "center",
              position: "absolute",
              left: 0,
              zIndex: 1,
              height: `${cardHeight}px`,
              background:
                "linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.05))",
            }}
            onClick={() => {
              scrollFixedDistance(true);
            }}
          >
            <ArrowBackIos
              style={{
                marginBottom: `${Math.floor(cardHeight * 0.26)}px`,
                transform: "translateX(5px)",
                color: theme.palette.primary.light,
              }}
            />
          </Button>
        )}
        <div
          className="HorizontalScrollSection__container"
          ref={scrollContainerRef}
          onScroll={() => setScrollButtonVisibility()}
          style={{ position: "relative" }}
        >
          {metaDataList.map((metaData, index) => (
            <VideoCard
              key={index}
              title={metaData.title}
              yearStart={metaData.yearStart}
              auth={auth}
              width={cardWidth}
              height={cardHeight}
              margin={cardMargin}
            />
          ))}
        </div>
        {isRightScrollButtonVisible && (
          <Button
            style={{
              alignSelf: "center",
              position: "absolute",
              right: 0,
              height: `${cardHeight}px`,
              background:
                "linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.05))",
            }}
            onClick={() => {
              scrollFixedDistance(false);
            }}
          >
            <ArrowForwardIos
              style={{
                marginBottom: `${Math.floor(cardHeight * 0.26)}px`,
                color: theme.palette.primary.light,
              }}
            />
          </Button>
        )}
      </div>
    </div>
  );
}

export default HorizontalScrollSection;
