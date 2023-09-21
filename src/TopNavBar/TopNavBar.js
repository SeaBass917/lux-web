import "./TopNavBar.css";
import logo from "../assets/imgs/tibix-logo.png";

function TopNavBar() {
  return (
    <div className="TopNavBar">
      <div className="NavSector" id="navPaddingBegin"></div>
      <div className="NavSector" id="logo">
        <img src={logo} id="logoImg"></img>
        <h1 id="logoText">Tibix</h1>
      </div>
      <div className="NavSector NavTab" id="video">
        <h1>Video</h1>
      </div>
      <div className="NavSector NavTab" id="manga">
        <h1>Manga</h1>
      </div>
      <div className="NavSector NavTab" id="music">
        <h1>Music</h1>
      </div>
      <div className="NavSector NavTab" id="images">
        <h1>Images</h1>
      </div>
      <div className="NavSector" id="quickActions"></div>
      <div className="NavSector" id="navPaddingEnd"></div>
    </div>
  );
}

export default TopNavBar;
