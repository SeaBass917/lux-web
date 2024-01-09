import "./VideoHomepage.css";
import HorizontalScrollSection from "../HorizontalScrollSection/HorizontalScrollSection";
import TopNavBar from "../TopNavBar/TopNavBar";

function VideoHomepage() {
  return (
    <div className="VideoHomepage">
      <TopNavBar />
      <HorizontalScrollSection title="Recently Watched"></HorizontalScrollSection>
      <HorizontalScrollSection title="Recently Watched"></HorizontalScrollSection>
    </div>
  );
}

export default VideoHomepage;
