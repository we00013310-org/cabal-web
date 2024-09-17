import { Navigate, Outlet } from "react-router-dom";

import { LOGIN_KEY } from "../lib/constants";

const AuthRoute = ({ redirectPath = "/login" }) => {
  const logined = localStorage.getItem(LOGIN_KEY);

  if (!logined) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
