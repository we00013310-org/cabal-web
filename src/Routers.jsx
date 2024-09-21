import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FourZeroFour from "./components/FourZeroFour";
import MyCollection from "./components/MyCollection";
import Notification from "./components/Notification";
import AuthRoute from "./middleware/AuthRoute";
import AuthProfilePage from "./views/AuthProfilePage";
import CollectionItemPage from "./views/CollectionItemPage";
import ForgotPasswordPages from "./views/ForgotPasswordPages";
import HistoryPage from "./views/HistoryPage";
import HomePages from "./views/HomePages";
import LoginPage from "./views/LoginPage";
import MarketPlacePage from "./views/MarketPlacePage";
import MyWalletPage from "./views/MyWalletPage";
import SavedPage from "./views/SavedPage";
import SellPage from "./views/SellPage";
import SettingsPage from "./views/SettingsPage";
import ShopDetailsPage from "./views/ShopDetailsPage";
import SignupPage from "./views/SignupPage";
import UpdatePasswordPages from "./views/UpdatePasswordPages";
import UploadProductPage from "./views/UploadProductPage";
import UserProfilePage from "./views/UserProfilePage";
import VerifyYouPages from "./views/VerifyYouPages";
import Layout from "./Layout";
import ActiveBidsPage from "./views/AcitveBidsPage";
import RoomDetailPage from "./views/RoomDetailPage";
import CreateRoomPage from "./views/CreateRoomPage";
import MyCabalsPage from "./views/MyCabalsPage";
import FollowingCabalsPage from "./views/FollowingCabalsPage";
import UserPage from "./views/UserPage";

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
            path: "/signup",
            element: <SignupPage />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPages />,
          },
          {
            path: "/update-password",
            element: <UpdatePasswordPages />,
          },
          {
            path: "/verify-you",
            element: <VerifyYouPages />,
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
                path: "/active-bids",
                element: <ActiveBidsPage />,
              },
              {
                path: "/notification",
                element: <Notification />,
              },
              {
                path: "/market-place",
                element: <MarketPlacePage />,
              },
              {
                path: "/shop-details",
                element: <ShopDetailsPage />,
              },
              {
                path: "/my-wallet",
                element: <MyWalletPage />,
              },
              {
                path: "/my-collection",
                element: <MyCollection />,
              },
              {
                path: "/my-collection/collection-item",
                element: <CollectionItemPage />,
              },
              {
                path: "/sell",
                element: <SellPage />,
              },
              {
                path: "/saved",
                element: <SavedPage />,
              },
              {
                path: "/history",
                element: <HistoryPage />,
              },
              {
                path: "/upload-product",
                element: <UploadProductPage />,
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
