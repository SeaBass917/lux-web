import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./LandingPage/LandingPage";
import VideoHomepage from "./Video/VideoHomepage/VideoHomepage";
import BlackListLandingPage from "./BlackListLandingPage/BlackListLandingPage";
import VideoInfoPage from "./Video/VideoInfoPage/VideoInfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/video",
    element: <VideoHomepage />,
  },
  {
    path: "/blacklist",
    element: <BlackListLandingPage />,
  },
  {
    path: "/video/:title",
    element: <VideoInfoPage />,
  },
]);

export default router;
