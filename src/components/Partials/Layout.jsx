import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";

import useToggle from "../../hooks/useToggle";
import { drawerToggle } from "../../store/drawer";
import Header from "./Header";
import MobileSidebar from "./MobileSideBar";
import Sidebar from "./Sidebar";
import { LOGIN_KEY } from "../../lib/constants";

export default function Layout({ children }) {
  const { drawer } = useSelector((state) => state.drawer);
  const dispatch = useDispatch();
  const [MobileSideBar, setMobileSidebar] = useToggle(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const logoutModalHandler = () => {
    setLogoutModal(!logoutModal);
  };
  const navigate = useNavigate();
  const { disconnect } = useWallet();

  const logOut = async () => {
    try {
      await disconnect();
      localStorage.removeItem(LOGIN_KEY);
      navigate("/login", { replace: true });
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <>
      <div className="nft-main-wrapper-layout">
        <div className="nft-wrapper-layout-container 2xl:pr-20 md:pr-10 pr-2 pl-2 md:pl-0 w-full min-h-screen flex">
          {/* sidebar */}
          <div
            className={`nft-sidebar xl:block hidden section-shadow ${
              drawer
                ? "2xl:w-[335px] w-[280px] 2xl:pl-20 pl-10 pr-6 "
                : "w-[70px]"
            } bg-white dark:bg-dark-white   h-full overflow-y-scroll overflow-style-none fixed left-0 top-0 pt-8`}
          >
            <Sidebar
              onLogout={logOut}
              sidebar={drawer}
              action={() => dispatch(drawerToggle())}
            />
          </div>
          {MobileSideBar && (
            <div
              onClick={() => setMobileSidebar.toggle()}
              className="bg-black bg-opacity-20 fixed left-0 top-0 w-full h-full z-[50] block xl:hidden"
            />
          )}
          <div
            className={`nft-sidebar block xl:hidden section-shadow w-[280px] pl-3 bg-white dark:bg-dark-white   h-full overflow-y-scroll overflow-style-none fixed z-[60]  top-0 pt-8 ${
              MobileSideBar ? "left-0" : "-left-[290px]"
            }`}
          >
            <MobileSidebar
              onLogout={logOut}
              sidebar={MobileSideBar}
              action={() => setMobileSidebar.toggle()}
            />
          </div>
          {/* end sidebar */}
          <div
            className={`nft-header-container-wrapper flex-1 md:ml-10 ${
              drawer ? "2xl:ml-[375px] xl:ml-[310px]" : "xl:ml-[110px]"
            }  h-full`}
          >
            {/* header */}
            <div className="nft-header w-full sm:h-20 h-14 default-border-bottom dark:border-[#292967]  z-40 xl:sticky fixed top-0 left-0 ">
              <Header
                sidebarHandler={() => setMobileSidebar.toggle()}
                onLogout={logOut}
              />
            </div>
            {/* container */}
            <div className="nft-container 2xl:flex 2xl:space-x-8 h-full mb-12 mt-20 sm:mt-28 xl:mt-10">
              <div className="nft-main-container flex-1">
                {children && children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
