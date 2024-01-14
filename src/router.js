import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./LandingPage/LandingPage";
import VideoHomepage from "./Video/VideoHomepage/VideoHomepage";
import BlackListLandingPage from "./BlackListLandingPage/BlackListLandingPage";

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
]);

export default router;
