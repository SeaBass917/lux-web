import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./LandingPage/LandingPage";
import VideoHomepage from "./Video/VideoHomepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/video",
    element: <VideoHomepage />,
  },
]);

export default router;
