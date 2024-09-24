import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import profileImg from "../../assets/images/profile-pic.jpg";
import useToggle from "../../hooks/useToggle";
import DarkModeContext from "../Contexts/DarkModeContext";
import Icons from "../Helpers/Icons";
import { fetchBalance } from "../../lib/apis/balance";

import SolIcon from "../../assets/images/tokens/sol.svg";
import USERS_DATA from "../../data/user_data.json";
import { formatNumb } from "../../lib/number";

export default function Header({ onLogout, sidebarHandler }) {
  const userData = USERS_DATA.datas.find((o) => o.id === "u2");
  const [balanceDropdown, setbalanceValue] = useToggle(false);
  const [notificationDropdown, setNotificationValue] = useToggle(false);
  const [userProfileDropdown, setProfileDropdown] = useToggle(false);
  const [moneyPopup, setPopup] = useToggle(false);
  const darkMode = useContext(DarkModeContext);
  const handlerBalance = () => {
    setbalanceValue.toggle();
    if (notificationDropdown) {
      setNotificationValue.toggle();
    }
    if (userProfileDropdown) {
      setProfileDropdown.toggle();
    }
  };
  const handlerNotification = () => {
    setNotificationValue.toggle();
    if (balanceDropdown) {
      setbalanceValue.toggle();
    }
    if (userProfileDropdown) {
      setProfileDropdown.toggle();
    }
  };
  const handlerProfile = () => {
    setProfileDropdown.toggle();
    if (balanceDropdown) {
      setbalanceValue.toggle();
    }
    if (notificationDropdown) {
      setNotificationValue.toggle();
    }
  };
  const clickAwayhandler = () => {
    if (balanceDropdown) {
      setbalanceValue.toggle();
    }
    if (notificationDropdown) {
      setNotificationValue.toggle();
    }
    if (userProfileDropdown) {
      setProfileDropdown.toggle();
    }
  };
  const addMoneyHandler = () => {
    setPopup.toggle();
    setbalanceValue.set(false);
  };

  const { data } = useQuery({
    queryKey: ["balance"],
    queryFn: fetchBalance,
  });

  return (
    <>
      <div className="header-wrapper backdrop-blur-sm bg-[#efedfe5e]/60 dark:bg-transparent w-full h-full flex items-center xl:px-0 md:px-10 px-4">
        <div className="flex justify-between items-center w-full">
          <button
            className="xl:hidden block mr-8 sm:mr-10"
            type="button"
            onClick={sidebarHandler}
          >
            <svg
              width="25"
              height="19"
              viewBox="0 0 25 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.3544 8.45953L16.9855 0.271831C16.8283 0.0982522 16.6089 0 16.3763 0H11.4637C11.1411 0 10.848 0.189955 10.7153 0.484712C10.5843 0.781107 10.6384 1.12663 10.8545 1.36571L17.7306 9.00647L10.8545 16.6456C10.6384 16.8863 10.5827 17.2318 10.7153 17.5266C10.848 17.823 11.1411 18.0129 11.4637 18.0129H16.3763C16.6089 18.0129 16.8283 17.913 16.9855 17.7427L24.3544 9.55505C24.6344 9.24391 24.6344 8.76903 24.3544 8.45953Z"
                fill="url(#paint0_linear_700_68145)"
              />
              <path
                d="M13.7104 8.45953L6.34147 0.271831C6.18427 0.0982522 5.96484 0 5.73231 0H0.819691C0.497095 0 0.203976 0.189955 0.071335 0.484712C-0.0596682 0.781107 -0.00562942 1.12663 0.210526 1.36571L7.08656 9.00647L0.210526 16.6456C-0.00562942 16.8863 -0.0613058 17.2318 0.071335 17.5266C0.203976 17.823 0.497095 18.0129 0.819691 18.0129H5.73231C5.96484 18.0129 6.18427 17.913 6.34147 17.7427L13.7104 9.55505C13.9904 9.24391 13.9904 8.76903 13.7104 8.45953Z"
                fill="url(#paint1_linear_700_68145)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_700_68145"
                  x1="10.644"
                  y1="0"
                  x2="28.9548"
                  y2="13.8495"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ffee99" />
                  <stop offset="0.416763" stopColor="#ffcd66" />
                  <stop offset="1" stopColor="#FFAB33" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_700_68145"
                  x1="0"
                  y1="0"
                  x2="18.3108"
                  y2="13.8495"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ffee99" />
                  <stop offset="0.416763" stopColor="#ffcd66" />
                  <stop offset="1" stopColor="#FFAB33" />
                </linearGradient>
              </defs>
            </svg>
          </button>

          {/* user info */}
          <div className="user-info flex items-center justify-end w-full space-x-2 z-10">
            {/* dark mode */}
            <button
              onClick={darkMode.handleThemeSwitch}
              type="button"
              className="w-10 h-10 sm:w-12 sm:h-12 dark:bg-white bg-dark-gray border border-pink rounded-full flex justify-center items-center"
            >
              <span className="scale-75 sm:scale-95 dark:text-dark-gray text-white">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.3065 16.3771C18.1572 16.6304 17.986 16.8743 17.7937 17.1062C17.7118 17.2044 17.7247 17.3515 17.8228 17.4339C17.9208 17.5163 18.0665 17.5028 18.1484 17.4046C18.3569 17.1532 18.5419 16.8897 18.7043 16.6155C18.7695 16.5051 18.7334 16.3622 18.6238 16.2966C18.5142 16.2304 18.3722 16.2668 18.3065 16.3771ZM18.9591 14.722C18.8948 15.0116 18.8078 15.2975 18.6982 15.5759C18.6511 15.6955 18.7093 15.831 18.8282 15.878C18.9466 15.9255 19.0812 15.8668 19.1283 15.7477C19.2472 15.446 19.3411 15.1368 19.4104 14.8231C19.4382 14.6978 19.3596 14.5735 19.2347 14.5456C19.1103 14.5176 18.9864 14.5968 18.9591 14.722ZM19.0673 12.944C19.0955 13.2411 19.1006 13.5395 19.0825 13.8375C19.0747 13.9655 19.1718 14.0763 19.2994 14.0837C19.4266 14.0917 19.5362 13.9939 19.5441 13.8659C19.564 13.5437 19.5584 13.2206 19.5274 12.8994C19.5154 12.7713 19.4021 12.6777 19.2754 12.6899C19.1482 12.702 19.0548 12.816 19.0673 12.944ZM18.6229 11.2201C18.7422 11.4948 18.8388 11.7769 18.9128 12.0641C18.9447 12.1884 19.071 12.2629 19.1949 12.2308C19.3184 12.1987 19.3924 12.0716 19.3605 11.9473C19.2805 11.6363 19.1755 11.3304 19.0465 11.0334C18.9951 10.9156 18.8587 10.8616 18.7417 10.9133C18.6247 10.9649 18.5715 11.1023 18.6229 11.2201ZM17.6651 9.72283C17.8653 9.94816 18.0448 10.1856 18.2034 10.4333C18.2723 10.5413 18.4157 10.5725 18.523 10.5026C18.6303 10.4333 18.6612 10.2889 18.5919 10.1809C18.4208 9.91324 18.2265 9.65578 18.0092 9.4123C17.9241 9.31639 17.7779 9.30848 17.6827 9.39414C17.5879 9.4798 17.58 9.62738 17.6651 9.72283Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.4409 5.61267C9.08757 5.61267 5.55359 9.14665 5.55359 13.5C5.55359 17.8533 9.08757 21.3873 13.4409 21.3873C17.7942 21.3873 21.3282 17.8533 21.3282 13.5C21.3282 9.14665 17.7942 5.61267 13.4409 5.61267ZM13.9049 6.5559C17.5298 6.79484 20.4003 9.81475 20.4003 13.5C20.4003 17.1852 17.5298 20.2051 13.9049 20.4441V6.5559Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.1116 1.32213V3.46343C12.1116 4.19318 12.7072 4.78556 13.4409 4.78556C14.1746 4.78556 14.7702 4.19318 14.7702 3.46343V1.32213C14.7702 0.592374 14.1746 0 13.4409 0C12.7072 0 12.1116 0.592374 12.1116 1.32213Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.0877 4.01472L19.5511 5.5513C19.0274 6.07499 19.0274 6.92528 19.5511 7.44898C20.0748 7.97267 20.9251 7.97267 21.4488 7.44898L22.9854 5.9124C23.509 5.38871 23.509 4.53841 22.9854 4.01472C22.4617 3.49102 21.6114 3.49102 21.0877 4.01472Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.6581 12.3649H23.4849C22.7443 12.3649 22.1431 12.9661 22.1431 13.7068C22.1431 14.4474 22.7443 15.0486 23.4849 15.0486H25.6581C26.3988 15.0486 27 14.4474 27 13.7068C27 12.9661 26.3988 12.3649 25.6581 12.3649Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.9854 21.5012L21.4488 19.9646C20.9251 19.4409 20.0748 19.4409 19.5511 19.9646C19.0274 20.4883 19.0274 21.3386 19.5511 21.8623L21.0877 23.3989C21.6114 23.9226 22.4617 23.9226 22.9854 23.3989C23.509 22.8752 23.509 22.0249 22.9854 21.5012Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.7702 25.6778V23.5365C14.7702 22.8068 14.1746 22.2144 13.4409 22.2144C12.7072 22.2144 12.1116 22.8068 12.1116 23.5365V25.6778C12.1116 26.4076 12.7072 27 13.4409 27C14.1746 27 14.7702 26.4076 14.7702 25.6778Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.78958 23.0647L7.29553 21.5372C7.80878 21.0166 7.80878 20.1714 7.29553 19.6508C6.78228 19.1302 5.94893 19.1302 5.43568 19.6508L3.92974 21.1783C3.41649 21.6989 3.41649 22.5441 3.92974 23.0647C4.44299 23.5853 5.27633 23.5853 5.78958 23.0647Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.32213 14.8293H3.46343C4.19318 14.8293 4.78556 14.2337 4.78556 13.5C4.78556 12.7663 4.19318 12.1707 3.46343 12.1707H1.32213C0.592374 12.1707 0 12.7663 0 13.5C0 14.2337 0.592374 14.8293 1.32213 14.8293Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.92974 5.82165L5.43568 7.34911C5.94893 7.86969 6.78228 7.86969 7.29553 7.34911C7.80878 6.82853 7.80878 5.98328 7.29553 5.46269L5.78958 3.93524C5.27633 3.41465 4.44299 3.41465 3.92974 3.93524C3.41649 4.45582 3.41649 5.30107 3.92974 5.82165Z"
                  />
                </svg>
              </span>
            </button>
            {/* balance */}
            <div className="flex user-balance cursor-pointer w-30 h-10 sm:w-40 sm:h-12  items-center rounded-full relative  bg-purple pr-1.5 pl-4">
              <div
                onClick={() => handlerBalance()}
                className="flex items-center sm:justify-between justify-center w-full h-full"
              >
                <span className="sm:block hidden">
                  <Icons name="wallet" />
                </span>
                <div className="flex items-center mr-2">
                  <p
                    key={data?.balance}
                    className="animate-fade lg:text-xl text-lg font-bold text-white"
                  >
                    {formatNumb(data?.balance || 0)}
                  </p>
                  <img className="w-[18px] h-[18px] ml-2" src={SolIcon} />
                </div>
              </div>
            </div>
            <div className="lg:hidden block"></div>
            {/* notification */}
            <div className="user-notification lg:block hidden relative">
              <div
                onClick={() => handlerNotification()}
                className="lg:w-[48px] lg:h-[48px] w-[38px] h-[38px] bg-white flex justify-center items-center rounded-full overflow-hidden relative cursor-pointer"
              >
                <Icons name="notification" />
                <span className="absolute right-2 top-2 z-10 text-xs lg:w-5 lg:h-5 w-4 h-4 flex justify-center items-center rounded-full primary-gradient text-white">
                  2
                </span>
              </div>
              <div
                className={`notification-dropdown z-30 w-96 bg-white dark:bg-dark-white absolute -right-12 rounded-lg cursor-pointer ${
                  notificationDropdown ? "active" : ""
                }`}
              >
                <div className="heading border-b dark:border-[#FFAB3329]  border-light-purple px-7 py-6">
                  <h3 className="text-xl font-bold   text-dark-gray dark:text-white">
                    Recent Notifications
                  </h3>
                </div>
                <div className="content px-7 pb-7">
                  <ul>
                    <li className="content-item py-4 border-b dark:border-[#FFAB3329]  border-light-purple hover:border-purple dark:hover:border-purple">
                      <div className="notifications flex space-x-4 items-center">
                        <div className="icon">
                          <svg
                            width="52"
                            height="52"
                            viewBox="0 0 52 52"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="26" cy="26" r="26" fill="#27AE60" />
                            <path
                              d="M21.5404 30.2033C22.185 29.6102 22.818 29.0287 23.451 28.4456C27.4582 24.759 31.4637 21.0724 35.4709 17.3859C35.7849 17.0968 36.0973 16.8044 36.4146 16.517C36.697 16.2611 37.021 16.0834 37.4014 16.0186C38.2055 15.884 38.782 16.4987 38.5877 17.2878C38.5112 17.5985 38.3634 17.8776 38.1574 18.1202C33.9574 23.0362 29.7575 27.9505 25.5576 32.8648C24.5641 34.0261 23.5739 35.1891 22.5787 36.3487C22.3129 36.6594 21.9906 36.8903 21.5786 36.9734C21.2347 37.0431 20.9091 36.975 20.6316 36.779C20.399 36.6145 20.1631 36.4284 19.9937 36.2041C17.7708 33.2237 15.5562 30.2365 13.3465 27.2461C13.0757 26.8789 12.9462 26.4486 13.0209 25.9901C13.1422 25.2342 14.046 24.7274 14.8085 24.9982C15.0445 25.083 15.2721 25.2225 15.4698 25.3787C17.4634 26.957 19.4504 28.5453 21.4391 30.1302C21.4673 30.1535 21.4972 30.1734 21.5404 30.2033Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        <div className="name">
                          <p className="text-base text-dark-gray dark:text-white font-medium mb-2">
                            Your Account has been created
                            <span className="ml-1 font-bold">
                              successfully done
                            </span>
                          </p>
                          <p className="text-sm text-thin-light-gray font-medium">
                            23 hours ago
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="content-item py-4">
                      <div className="notifications flex space-x-4 items-center">
                        <div className="icon">
                          <svg
                            width="52"
                            height="52"
                            viewBox="0 0 52 52"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="26" cy="26" r="26" fill="#FFAB33" />
                            <path
                              d="M25.9481 24.3684C25.4776 24.213 25.0352 24.1246 24.6425 23.9303C21.1636 22.2082 17.6912 20.4687 14.2167 18.7379C13.962 18.6106 13.7656 18.4466 13.7613 18.1423C13.757 17.8251 13.9534 17.6481 14.221 17.5143C17.6718 15.7943 21.1226 14.07 24.5712 12.3456C25.564 11.8493 26.5416 11.9054 27.5214 12.3996C29.7377 13.5153 31.9627 14.6203 34.1834 15.7295C35.3164 16.295 36.4473 16.8625 37.5781 17.4301C37.6429 17.4625 37.7076 17.4927 37.7745 17.5251C38.0335 17.6459 38.2126 17.8337 38.2126 18.1337C38.2126 18.438 38.0205 18.6084 37.7659 18.7336C36.1581 19.5343 34.5525 20.3392 32.9447 21.1399C31.0887 22.0657 29.2414 23.0045 27.3746 23.9066C26.93 24.1224 26.4272 24.2173 25.9481 24.3684Z"
                              fill="white"
                            />
                            <path
                              d="M25.0538 33.4541C25.0538 35.3834 25.056 37.3128 25.0517 39.2421C25.0495 39.9284 24.6632 40.1701 24.0309 39.8787C20.8671 38.422 17.7012 36.9696 14.5439 35.5021C13.5274 35.0295 13.0095 34.2029 13.0052 33.085C12.9965 29.4076 13.0008 25.7302 13.003 22.0528C13.003 21.3428 13.4023 21.0795 14.0367 21.373C17.3084 22.8815 20.5779 24.3987 23.8518 25.9007C24.6827 26.2827 25.0668 26.9042 25.0603 27.8128C25.0474 29.6947 25.056 31.5744 25.056 33.4562C25.056 33.4541 25.056 33.4541 25.0538 33.4541Z"
                              fill="white"
                            />
                            <path
                              d="M26.9187 33.4002C26.9187 31.5076 26.923 29.6149 26.9165 27.7223C26.9144 26.8676 27.305 26.2785 28.0711 25.9246C31.3644 24.4053 34.6598 22.8903 37.953 21.3731C38.553 21.0969 38.9652 21.3451 38.9652 21.999C38.9695 25.7131 38.976 29.425 38.9609 33.1391C38.9566 34.2764 38.3739 35.0706 37.3488 35.5454C34.7893 36.728 32.2276 37.9085 29.6681 39.089C29.1199 39.3415 28.5739 39.594 28.0279 39.8465C27.2855 40.1875 26.9165 39.9565 26.9165 39.1494C26.9165 37.233 26.9165 35.3145 26.9165 33.3981C26.9187 33.4002 26.9187 33.4002 26.9187 33.4002Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        <div className="name">
                          <p className="text-base text-dark-gray dark:text-white font-medium mb-2">
                            You created
                            <span className="ml-1 font-bold">your Cabal</span>
                          </p>
                          <p className="text-sm text-thin-light-gray font-medium">
                            23 hours ago
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="add-money-btn flex justify-center items-center">
                    <Link
                      to="/notification"
                      className="text-purple text-sm font-medium"
                    >
                      See all Notification
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:hidden block">
              <Link
                to="/notification"
                className="lg:w-[48px] lg:h-[48px] w-[38px] h-[38px] bg-white   flex justify-center items-center rounded-full overflow-hidden relative"
              >
                <Icons name="notification" />
                <span className="absolute right-2 top-2 z-10 text-xs lg:w-5 lg:h-5 w-4 h-4 flex justify-center items-center rounded-full primary-gradient text-white">
                  10
                </span>
              </Link>
            </div>
            {/* profile */}
            <div className="user-profile relative lg:block hidden">
              <div
                onClick={() => handlerProfile()}
                className="flex items-center space-x-3.5 hover:cursor-pointer"
              >
                {/* profile-image */}
                <div className="sm:w-12 sm:h-12 w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={userData.img || profileImg}
                    alt="profile"
                    className="w-full h-full"
                  />
                </div>
                <div className="lg:block hidden">
                  <h1 className="text-xl font-bold   text-dark-gray dark:text-white">
                    {userData.name}
                  </h1>
                  <p className="text-sm text-thin-light-gray">@nuoanunu</p>
                </div>
              </div>
              <div
                className={`profile-dropdown w-[293px] z-30 bg-white dark:bg-dark-white   absolute lg:right-16 -right-[16px]  rounded-lg cursor-pointer ${
                  userProfileDropdown ? "active" : ""
                }`}
              >
                <div className="heading border-b dark:border-[#FFAB3329]  border-light-purple px-7 py-6">
                  <h3 className="text-xl font-bold   text-dark-gray dark:text-white">
                    My Profile
                  </h3>
                </div>
                <div className="content px-7">
                  <ul>
                    <li className="content-item py-4 border-b dark:border-[#FFAB3329]  border-light-purple hover:border-purple dark:hover:border-purple">
                      <Link
                        to="/profile"
                        className="notifications flex space-x-4 items-center"
                      >
                        <div className="icon">
                          <svg
                            width="42"
                            height="42"
                            viewBox="0 0 42 42"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              opacity="0.1"
                              cx="21"
                              cy="21"
                              r="21"
                              fill="#56CCF2"
                            />
                            <path
                              d="M24.1446 22.7104H17.8554C16.8333 22.7117 15.8534 23.1161 15.1306 23.8351C14.4078 24.5541 14.0012 25.5288 14 26.5456V30.4473H28V26.5456C27.9988 25.5288 27.5922 24.5541 26.8694 23.8351C26.1466 23.1161 25.1667 22.7117 24.1446 22.7104Z"
                              fill="#56CCF2"
                            />
                            <path
                              d="M20.9999 20.8682C23.6451 20.8682 25.7894 18.8064 25.7894 16.263C25.7894 13.7196 23.6451 11.6577 20.9999 11.6577C18.3548 11.6577 16.2104 13.7196 16.2104 16.263C16.2104 18.8064 18.3548 20.8682 20.9999 20.8682Z"
                              fill="#56CCF2"
                            />
                          </svg>
                        </div>
                        <div className="name">
                          <p className="text-base text-dark-gray dark:text-white font-medium mb-2">
                            My Profile
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="content-item py-5">
                      <div className="notifications flex space-x-4 items-center">
                        <div className="icon">
                          <svg
                            width="42"
                            height="42"
                            viewBox="0 0 42 42"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              opacity="0.1"
                              cx="21"
                              cy="21"
                              r="21"
                              fill="#EB5757"
                            />
                            <path
                              d="M12.0027 25.0635C12.0027 24.9135 12.0027 24.7637 12.0027 24.6137C12.0027 24.4633 12.0027 24.3131 12.0027 24.1627C12.0027 24.0127 12.0027 23.8629 12.0027 23.713C12.0027 23.5625 12.0027 23.4123 12.0027 23.2619C12.0027 23.1119 12.0027 22.9621 12.0027 22.8122C12.0027 22.6617 12.0027 22.5115 12.0027 22.3611C12.0027 22.2111 12.0027 22.0614 12.0027 21.9114C12.0027 21.7609 12.0027 21.6107 12.0027 21.4603C12.0027 21.3103 12.0027 21.1606 12.0027 21.0106C12.0027 20.8602 12.0027 20.7099 12.0027 20.5595C12.0027 20.4095 12.0027 20.2598 12.0027 20.1098C12.0027 19.9594 12.0027 19.8092 12.0027 19.6587C12.0027 19.5087 12.0027 19.359 12.0027 19.209C12.0027 19.0586 12.0027 18.9084 12.0027 18.7579C12.0027 18.608 12.0027 18.4582 12.0027 18.3082C12.0027 18.1578 12.0027 18.0076 12.0027 17.8572C12.0027 17.7072 12.0027 17.5574 12.0027 17.4074C12.0027 17.257 12.0027 17.1068 12.0027 16.9564C12.0027 16.8064 12.0027 16.6566 12.0027 16.5066C12.0027 16.3562 12.0027 16.206 12.0027 16.0556C12.0027 15.9056 12.0027 15.7558 12.0027 15.6059C12.0027 15.4554 12.0027 15.3052 12.0027 15.1548C12.0027 15.0048 12.0027 14.855 12.0027 14.7051C12.0027 14.5546 12.0027 14.4044 12.0027 14.254C12.0027 14.104 12.0027 13.9543 12.0027 13.8043C12.0027 13.6538 12.0027 13.5036 12.0027 13.3532C12.0027 13.2032 12.0027 13.0535 12.0027 12.9035C12.0468 12.3506 12.3522 12.0453 12.9078 12C13.0578 12 13.2075 12 13.3575 12C13.5079 12 13.6581 12 13.8086 12C13.9585 12 14.1083 12 14.2583 12C14.4087 12 14.5589 12 14.7094 12C14.8593 12 15.0091 12 15.1591 12C15.3095 12 15.4597 12 15.6101 12C15.7601 12 15.9099 12 16.0599 12C16.2103 12 16.3605 12 16.5109 12C16.6609 12 16.8107 12 16.9606 12C17.1111 12 17.2613 12 17.4117 12C17.5617 12 17.7115 12 17.8614 12C18.0119 12 18.1621 12 18.3125 12C18.4625 12 18.6122 12 18.7622 12C18.9127 12 19.0629 12 19.2133 12C19.3633 12 19.513 12 19.663 12C19.8134 12 19.9637 12 20.1141 12C20.2641 12 20.4138 12 20.5638 12C20.7142 12 20.8644 12 21.0149 12C21.1649 12 21.3146 12 21.4646 12C21.615 12 21.7652 12 21.9157 12C22.0656 12 22.2154 12 22.3654 12C22.5158 12 22.666 12 22.8164 12C22.9664 12 23.1162 12 23.2662 12C23.4166 12 23.5668 12 23.7172 12C24.1138 12.016 24.3937 12.2054 24.5579 12.5664C24.5721 12.611 24.5865 12.6558 24.6007 12.7004C24.6043 12.7231 24.6079 12.7459 24.6115 12.7684C24.6122 13.7791 24.6128 14.7895 24.6126 15.8002C24.6126 15.8441 24.6243 15.8903 24.5975 15.9317C24.4541 15.931 24.3106 15.9207 24.1676 15.9373C24.017 15.9238 23.8661 15.9241 23.7154 15.9373C23.5661 15.9241 23.4166 15.9247 23.2673 15.9371C23.1626 15.9344 23.0576 15.9252 22.9536 15.9308C22.8709 15.9353 22.8556 15.9049 22.8561 15.829C22.8592 15.3075 22.8581 14.7859 22.8577 14.2644C22.8577 14.2085 22.8646 14.1513 22.8365 14.0988C22.8011 13.9254 22.6993 13.8173 22.5241 13.7818C22.4541 13.7433 22.3778 13.7599 22.3046 13.7597C20.0904 13.7586 17.8776 13.7588 15.6651 13.7588C15.5955 13.7588 15.5257 13.7588 15.4561 13.7588C15.4536 13.7676 15.4509 13.7761 15.4484 13.7849C15.6507 13.8858 15.8529 13.9869 16.0551 14.0878C16.3544 14.2466 16.6526 14.4071 16.9606 14.5488C17.2539 14.7177 17.557 14.8677 17.8621 15.0138C17.954 15.0694 18.0477 15.1215 18.1488 15.1591C18.3343 15.2703 18.5282 15.3658 18.7242 15.4572C18.832 15.5149 18.9392 15.5739 19.048 15.6297C19.2687 15.7432 19.5011 15.8392 19.6574 16.0468V16.0538L19.6635 16.0572C19.7452 16.197 19.7993 16.3468 19.824 16.5069C19.8249 16.6571 19.8261 16.8073 19.827 16.9575C19.8155 17.1079 19.8155 17.2584 19.827 17.4088C19.8166 17.5585 19.8166 17.7085 19.827 17.8583C19.8155 18.0087 19.8155 18.1591 19.827 18.3096C19.8166 18.4593 19.8166 18.6091 19.827 18.7588C19.8155 18.9093 19.8155 19.0597 19.827 19.2101C19.8166 19.3599 19.8166 19.5096 19.827 19.6594C19.8155 19.8098 19.8155 19.9603 19.827 20.1109C19.8166 20.2607 19.8166 20.4104 19.827 20.5602C19.8155 20.7106 19.8155 20.8611 19.827 21.0115C19.8166 21.1612 19.8166 21.311 19.827 21.4608C19.8155 21.6112 19.8155 21.7616 19.827 21.912C19.8166 22.0618 19.8166 22.2116 19.827 22.3615C19.8155 22.512 19.8155 22.6624 19.827 22.8128C19.8166 22.9626 19.8166 23.1123 19.827 23.2623C19.8155 23.4128 19.8155 23.5632 19.827 23.7136C19.8249 23.7247 19.8209 23.7357 19.8213 23.7465C19.8335 24.0762 19.7398 24.0228 20.113 24.0165C20.2634 24.0275 20.4138 24.0275 20.5643 24.0165C20.7138 24.0262 20.8635 24.0262 21.0131 24.0165C21.1637 24.0275 21.3146 24.0275 21.4653 24.0165C21.6148 24.0262 21.7643 24.0262 21.9141 24.0165C22.0645 24.0275 22.2149 24.0278 22.3654 24.0165C22.5982 24.0305 22.7595 23.9251 22.8259 23.7159C22.861 23.6461 22.855 23.5706 22.855 23.4963C22.8552 22.4019 22.8565 21.3074 22.8523 20.2129C22.8518 20.1114 22.8809 20.0907 22.977 20.0916C23.4792 20.0963 23.9814 20.0934 24.4838 20.0938C24.5279 20.0938 24.5743 20.0832 24.6146 20.1125C24.611 20.262 24.6038 20.4118 24.6185 20.5613C24.6074 20.7113 24.6074 20.8613 24.6185 21.0113C24.6061 21.1615 24.6061 21.3117 24.6185 21.4619C24.6074 21.6119 24.6074 21.7618 24.6185 21.9118C24.6061 22.062 24.6061 22.2122 24.6185 22.3624C24.6074 22.5124 24.6074 22.6624 24.6185 22.8124C24.6061 22.9626 24.6061 23.1128 24.6185 23.263C24.6074 23.413 24.6074 23.563 24.6185 23.713C24.6061 23.8632 24.6061 24.0134 24.6185 24.1636C24.6074 24.3136 24.6074 24.4635 24.6185 24.6135C24.6108 24.7712 24.6029 24.929 24.5953 25.0867C24.5471 25.2438 24.4701 25.3857 24.3656 25.5125C24.2985 25.5643 24.2316 25.6161 24.1645 25.6679C23.9715 25.7663 23.7639 25.7762 23.5524 25.7758C22.3417 25.7737 21.1313 25.7744 19.9206 25.7767C19.8848 25.7767 19.8301 25.7422 19.8101 25.8084C19.8002 25.8604 19.7993 25.9122 19.8107 25.964C19.7979 26.1147 19.7984 26.2653 19.8107 26.416C19.7993 26.5655 19.799 26.7151 19.8107 26.8646C19.7981 27.015 19.7981 27.1654 19.8107 27.3159C19.799 27.4654 19.7993 27.6152 19.8107 27.7647C19.7981 27.9154 19.7981 28.066 19.8107 28.2164C19.799 28.3662 19.799 28.516 19.8107 28.6657C19.7979 28.8164 19.7986 28.967 19.8103 29.1177C19.7941 29.4784 19.5144 29.6464 19.2131 29.5703C19.1944 29.5523 19.1728 29.5413 19.1462 29.5422C19.0255 29.4663 18.8982 29.403 18.7679 29.3456C18.6233 29.2566 18.4717 29.181 18.3175 29.1112C18.1702 29.0229 18.0175 28.9456 17.8612 28.8747C17.7295 28.7986 17.5957 28.7263 17.4554 28.6666C17.4405 28.645 17.4178 28.6382 17.3937 28.634C17.255 28.5509 17.1109 28.4777 16.9633 28.411C16.6674 28.2459 16.3677 28.0888 16.0608 27.9451C16.036 27.9217 16.0074 27.9052 15.9734 27.8994C15.9556 27.8759 15.9306 27.8658 15.9024 27.862C15.8378 27.819 15.7703 27.7818 15.6966 27.7568C15.5239 27.6512 15.3428 27.5613 15.1591 27.4769C14.8656 27.3123 14.5661 27.1594 14.2635 27.0125C13.9648 26.8522 13.6662 26.6914 13.3593 26.5475C13.0654 26.3786 12.7625 26.2271 12.4578 26.0791C12.4047 26.041 12.3515 26.0028 12.2986 25.9647C12.0399 25.7168 11.9863 25.4017 12.0027 25.0635Z"
                              fill="#EB5757"
                            />
                            <path
                              d="M29.9938 17.8163C29.9965 17.8305 29.9995 17.8449 30.0022 17.8591C30.0017 17.9418 30.001 18.0242 30.0006 18.1068C29.981 18.1726 29.9616 18.2386 29.942 18.3043C29.8662 18.487 29.7182 18.6144 29.5932 18.7592C29.5797 18.7595 29.572 18.766 29.5711 18.7799C29.42 18.9151 29.2766 19.0581 29.1417 19.2092C29.1277 19.2098 29.1214 19.2175 29.121 19.231C28.9685 19.3646 28.8262 19.508 28.6918 19.6596C28.6782 19.6598 28.671 19.6665 28.6704 19.6803C28.5195 19.8156 28.3756 19.958 28.2411 20.11C28.2276 20.1109 28.2209 20.1183 28.2204 20.1316C28.068 20.2653 27.9256 20.409 27.791 20.5604C27.7777 20.5608 27.7705 20.5678 27.7698 20.5811C27.6187 20.716 27.4746 20.8583 27.3408 21.0107C27.3338 21.0177 27.3266 21.0249 27.3196 21.0319C27.1669 21.1655 27.0253 21.31 26.8897 21.4607C26.8762 21.4605 26.869 21.4668 26.8688 21.4805C26.7355 21.5938 26.5866 21.6794 26.4195 21.7323C26.2682 21.7557 26.1175 21.7552 25.968 21.7192C25.6264 21.6003 25.4147 21.3661 25.339 21.011C25.3307 20.8587 25.3462 20.7088 25.3816 20.5606C25.4111 20.4628 25.475 20.3833 25.5205 20.2939C25.5746 20.2338 25.6286 20.1737 25.6827 20.1136C25.7797 20.0179 25.8766 19.9219 25.9736 19.8262C26.0362 19.7809 26.0916 19.7283 26.1367 19.6652C26.2306 19.5726 26.3245 19.4799 26.4184 19.3873C26.4871 19.3366 26.547 19.2772 26.5985 19.2092C26.6852 19.1146 26.7719 19.02 26.8591 18.9247C26.7154 18.9247 26.5677 18.9247 26.42 18.9247C26.2695 18.9137 26.1189 18.9139 25.9684 18.9247C25.8187 18.9144 25.6689 18.9144 25.5194 18.9247C25.369 18.9137 25.2183 18.9139 25.0679 18.9247C24.9181 18.9144 24.7684 18.9144 24.6188 18.9247C24.4684 18.9137 24.3178 18.9139 24.1673 18.9247C24.0176 18.9144 23.8678 18.9144 23.7183 18.9247C23.5678 18.9137 23.4172 18.9139 23.2668 18.9247C23.117 18.9144 22.9675 18.9144 22.8177 18.9247C22.6671 18.9139 22.5166 18.9139 22.366 18.9247C22.2164 18.9135 22.0669 18.9162 21.9174 18.9234C21.7629 18.9121 21.6136 18.8793 21.4722 18.8151C21.4409 18.7962 21.4096 18.7772 21.378 18.7583C21.0751 18.505 20.9556 18.1796 20.9988 17.7907C21.0071 17.7512 21.0157 17.7118 21.024 17.6727C21.0648 17.5844 21.1055 17.4961 21.1463 17.4078C21.2337 17.2882 21.3402 17.1892 21.4654 17.1099C21.6109 17.0495 21.7577 17.0004 21.9194 17.0007C23.5338 17.0025 25.1485 17.002 26.7629 17.0013C26.7983 17.0013 26.8364 17.0133 26.8823 16.9824C26.7283 16.8266 26.583 16.6689 26.4204 16.5282C26.4132 16.521 26.4062 16.514 26.399 16.5068C26.2641 16.3562 26.122 16.2127 25.9691 16.0803C25.9615 16.0726 25.9538 16.0652 25.9462 16.0575C25.8043 15.9134 25.6626 15.7693 25.5208 15.6254C25.5153 15.618 25.5102 15.6107 25.5048 15.6033C25.4208 15.465 25.3705 15.3139 25.3374 15.1565C25.3379 15.1158 25.3368 15.0748 25.339 15.0342C25.3453 14.9234 25.326 14.8079 25.3987 14.7093C25.5237 14.4566 25.7259 14.2967 25.9925 14.2134C26.1272 14.1918 26.2621 14.1929 26.397 14.2107C26.6015 14.2722 26.7792 14.3762 26.9262 14.5332C27.0001 14.612 27.0814 14.6834 27.1595 14.7584C27.1895 14.8007 27.225 14.8379 27.2683 14.8669C27.3748 14.9881 27.4869 15.1034 27.6104 15.2074C27.6385 15.2522 27.6754 15.288 27.7196 15.3169C27.8238 15.44 27.9391 15.5524 28.0603 15.6587C28.0966 15.695 28.1326 15.7312 28.1688 15.7675C28.2756 15.8882 28.3882 16.0033 28.5111 16.1078C28.5391 16.1528 28.5771 16.1877 28.6204 16.2172C28.7246 16.3404 28.8399 16.4525 28.9609 16.5591C28.9917 16.6007 29.0259 16.6392 29.0703 16.6676C29.2617 16.8624 29.4491 17.0612 29.6457 17.2509C29.8117 17.4112 29.938 17.5909 29.9938 17.8163Z"
                              fill="#EB5757"
                            />
                          </svg>
                        </div>
                        <div className="name" onClick={onLogout}>
                          <p className="text-base text-dark-gray dark:text-white font-medium mb-2">
                            Log Out
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="for-mobile-profile lg:hidden block">
              <Link
                to="/profile"
                className="sm:w-12 sm:h-12 w-10 h-10 rounded-full overflow-hidden block ml-4"
              >
                <img
                  src={userData.img || profileImg}
                  alt="profile"
                  className="w-full h-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {balanceDropdown || notificationDropdown || userProfileDropdown ? (
        <div
          onClick={clickAwayhandler}
          className="w-full h-screen fixed left-0"
          style={{ zIndex: "-1" }}
        ></div>
      ) : (
        ""
      )}
    </>
  );
}

Header.propTypes = {
  logoutModalHandler: PropTypes.func,
  sidebarHandler: PropTypes.func,
};
