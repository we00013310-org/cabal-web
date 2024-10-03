import { RouterProvider, createBrowserRouter } from "react-router-dom";

import FourZeroFour from "./components/FourZeroFour";
import Notification from "./components/Notification";
import AuthRoute from "./middleware/AuthRoute";
import AuthProfilePage from "./views/AuthProfilePage";
import HomePages from "./views/HomePages";
import LoginPage from "./views/LoginPage";
import SettingsPage from "./views/SettingsPage";
import UserProfilePage from "./views/UserProfilePage";
import Layout from "./Layout";
import RoomDetailPage from "./views/RoomDetailPage";
import CreateRoomPage from "./views/CreateRoomPage";
import MyCabalsPage from "./views/MyCabalsPage";
import FollowingCabalsPage from "./views/FollowingCabalsPage";
import UserPage from "./views/UserPage";
import LeaderboardPage from "./views/LeaderboardPage";
import RoomManagementPage from "./views/RoomManagementPage";

const router = createBrowserRouter([
  {
    errorElement: <FourZeroFour />,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/",
            Component: AuthRoute,
            children: [
              {
                index: true,
                element: <HomePages />,
              },
              {
                path: "/rooms/:id/management",
                element: <RoomManagementPage />,
              },
              {
                path: "/rooms/:id",
                element: <RoomDetailPage />,
              },

              {
                path: "/create-cabal",
                element: <CreateRoomPage />,
              },
              {
                path: "/my-cabals",
                element: <MyCabalsPage />,
              },
              {
                path: "/following-cabals",
                element: <FollowingCabalsPage />,
              },
              {
                path: "/profile",
                element: <AuthProfilePage />,
              },
              {
                path: "/users/:id",
                element: <UserPage />,
              },
              {
                path: "/leaderboard",
                element: <LeaderboardPage />,
              },
              {
                path: "/notification",
                element: <Notification />,
              },
              {
                path: "/user-profile",
                element: <UserProfilePage />,
              },
              {
                path: "/settings",
                element: <SettingsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function Routers() {
  return <RouterProvider router={router} />;
}
