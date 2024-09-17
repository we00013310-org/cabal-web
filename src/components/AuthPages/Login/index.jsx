import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import titleShape from "../../../assets/images/shape/title-shape.svg";
import AuthLayout from "../AuthLayout";
import WalletConnectButton from "../../common/WalletConnectButton";
import { LOGIN_KEY } from "../../../lib/constants";

export default function Login() {
  const navigate = useNavigate();

  const onLoginSuccess = () => {
    toast.success("Login Successfully");
    localStorage.setItem(LOGIN_KEY, true);
    navigate("/", { replace: true });
  };

  return (
    <>
      <AuthLayout slogan="Welcome to Cabal">
        <div className="content-wrapper w-full max-w-[500px] flex justify-center items-center xl:bg-white dark:bg-dark-white 2xl:w-[828px] xl:w-[500px] 2xl:h-[818px] xl:h-[600px] rounded-xl 2xl:px-[164px] xl:px-[56px] sm:px-7 px-5 ">
          <div className="w-full">
            <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
              <h1 className="text-5xl font-bold leading-[74px]   text-dark-gray dark:text-white">
                Login
              </h1>
              <div className="shape -mt-5">
                <img src={titleShape} alt="shape" />
              </div>
            </div>
            <div className="input-area">
              <div className="signin-area mb-3.5">
                <div className="flex justify-center">
                  <div className="w-full max-w-[300px] py-8">
                    <WalletConnectButton onSuccess={onLoginSuccess} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
