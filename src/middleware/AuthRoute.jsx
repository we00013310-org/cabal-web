import { Navigate, Outlet } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { LOGIN_KEY } from "../lib/constants";
import { setCurrentUsername } from "../lib/utils";
import WalletConnectButton from "../components/common/WalletConnectButton";

const AuthRoute = ({ redirectPath = "/login" }) => {
  const navigate = useNavigate();
  const logined = localStorage.getItem(LOGIN_KEY);
  const { publicKey } = useWallet();

  const onLoginSuccess = (publicKey) => {
    toast.success("Login Successfully");
    localStorage.setItem(LOGIN_KEY, true);
    setCurrentUsername(publicKey);
    navigate("/", { replace: true });
  };

  if (!logined) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!publicKey) {
    return (
      <div className="flex flex-col justify-center items-center pt-[30vh]">
        <span className="loader" />
        <div className="w-full max-w-[300px] py-8 flex justify-center">
          <WalletConnectButton onSuccess={onLoginSuccess} />
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default AuthRoute;
