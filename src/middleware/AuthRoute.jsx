import { Navigate, Outlet } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";

import { LOGIN_KEY } from "../lib/constants";

const AuthRoute = ({ redirectPath = "/login" }) => {
  const logined = localStorage.getItem(LOGIN_KEY);
  const { publicKey } = useWallet();

  if (!logined) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!publicKey) {
    return (
      <div className="flex justify-center items-center pt-[30vh]">
        <span className="loader" />
      </div>
    );
  }

  return <Outlet />;
};

export default AuthRoute;
