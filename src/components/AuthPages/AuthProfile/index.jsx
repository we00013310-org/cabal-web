import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Layout from "../../Partials/Layout";
import { fetchRooms } from "../../../lib/apis/room";
import RoomTable from "../../Home/RoomTable";

import USERS_DATA from "../../../data/user_data.json";
import profileBanner from "../../../assets/images/profile-cover.png";

export default function AuthProfile() {
  const { data: rawData } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });
  const userData = USERS_DATA.datas.find((o) => o.id === "u2");
  const ownedRooms = rawData?.filter((o) => o.owned);
  const joinedRooms = rawData?.filter((o) => o.joined);

  const tabs = [
    {
      id: 1,
      name: "Owned",
      content: "Owned",
      number: ownedRooms?.length || 0,
    },
    {
      id: 2,
      name: "Investing",
      content: "Investing",
      number: joinedRooms?.length || 0,
    },
  ];

  const [tab, setTab] = useState(tabs[0].name);
  const tabHandler = (value) => {
    setTab(value);
  };

  return (
    <>
      <Layout>
        <div className="nft-authprofile-wrapper w-full">
          <div className="main-wrapper w-full">
            <div className="content-wrapper-profile-only w-full mb-6">
              <div className="auth-cover w-full">
                <div className="w-full lg:h-[312px] h-[212px] rounded-2xl overflow-hidden">
                  <img
                    src={profileBanner}
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="auth lg:flex justify-between items-center mb-8 sm:mb-16">
                <div className="auth-user-details sm:px-10 px-0 mb-5 lg:mb-0 relative">
                  {/* profile picture */}
                  <div className=" profile-picture sm:block flex justify-center items-center mb-4">
                    <img
                      src={userData.img}
                      alt=""
                      className="md:w-[205px] md:h-[205px] w-[130px] h-[130px] object-cover rounded-full overflow-hidden border-[6px] border-white"
                    />
                  </div>
                  <div className="auth-user-profile-content">
                    <div className="mb-2 sm:mb-4">
                      <h1 className="text-2xl sm:text-3xl text-dark-gray dark:text-white tracking-wide sm:text-26 font-bold">
                        {userData.name}
                      </h1>
                    </div>
                    <div className="mb-2 sm:mb-4">
                      <p className="text-thin-light-gray text-sm sm:text-base tracking-wide leading-2">
                        Referral Code:
                        <span className="ml-2 text-base sm:text-2xl font-bold text-purple">
                          {userData.name.toLowerCase()}
                        </span>
                      </p>
                    </div>
                    <div className="flex text-thin-light-gray sm:text-xl text-sm">
                      <p className="border-r pr-5  border-thin-light-gray">
                        <span className="font-bold mr-1 text-dark-gray dark:text-white">
                          49
                        </span>
                        Followers
                      </p>
                      <p className="border-r px-5 border-thin-light-gray">
                        <span className="font-bold mr-1 text-dark-gray dark:text-white">
                          35
                        </span>
                        Following
                      </p>
                      <p className="pl-5">
                        <span className="font-bold mr-1 text-dark-gray dark:text-white">
                          914
                        </span>
                        Favorites
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 sm:space-x-5 ml-0 sm:ml-10 lg:ml-0">
                  <Link
                    to="/settings"
                    className="text-white btn-shine text-sm sm:text-base rounded-full tracking-wide bg-purple px-4 py-2.5 flex justify-center items-center "
                  >
                    <span>Edit Profile</span>
                  </Link>
                  <button
                    type="button"
                    className="bg-white rounded-full p-2 sm:p-4 "
                  >
                    <svg
                      className="scale-75 sm:scale-100"
                      width="23"
                      height="22"
                      viewBox="0 0 23 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.4922 5.51801C12.4922 5.43549 12.4922 5.37668 12.4922 5.31786C12.4908 3.80698 12.4894 2.2961 12.4881 0.784769C12.4876 0.460163 12.6709 0.18525 12.97 0.0626106C13.2823 -0.0654996 13.6374 0.00562209 13.8708 0.251813C14.1079 0.50165 14.3391 0.756959 14.5725 1.00999C16.9742 3.6114 19.3723 6.216 21.7827 8.80921C22.0863 9.13564 22.0863 9.7347 21.7863 10.0579C19.1471 12.9024 16.5188 15.7568 13.8868 18.608C13.6356 18.8802 13.3069 18.9586 12.9864 18.8264C12.6668 18.6947 12.4899 18.4006 12.4899 18.0404C12.4899 16.5204 12.4844 15 12.4803 13.48C12.4803 13.449 12.4735 13.418 12.4676 13.3706C12.4092 13.3706 12.3559 13.3697 12.3021 13.3706C9.96553 13.4216 7.82231 14.1082 5.8537 15.3506C4.32002 16.3185 3.04895 17.5544 2.11206 19.1177C1.60053 19.9712 1.23261 20.8826 1.02517 21.8573C1.01788 21.8915 1.00602 21.9248 0.984596 22C0.896606 21.7821 0.818646 21.6024 0.750715 21.4196C0.0700445 19.5905 -0.16338 17.7081 0.114724 15.7728C0.385533 13.8885 1.11088 12.1857 2.25521 10.6707C4.17459 8.12899 6.70944 6.52693 9.80642 5.8107C10.6271 5.62104 11.4623 5.52804 12.3053 5.51846C12.3591 5.51755 12.4133 5.51801 12.4922 5.51801Z"
                        fill="#374557"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="auth-tab-content relative mb-8">
                <div className="lg:flex justify-between">
                  <div className="tab-items">
                    <ul className="lg:flex lg:space-x-14 space-x-8">
                      {tabs &&
                        tabs.length > 0 &&
                        tabs.map((tabValue) => (
                          <li
                            key={tabValue.id}
                            className="relative group inline"
                            onClick={() => tabHandler(tabValue.name)}
                          >
                            <span
                              className={`py-4 sm:border-b-none border-b group-hover:border-purple lg:text-xl text-sm tracking-wide font-bold  group-hover:text-purple text-dark-gray dark:text-white relative z-10 cursor-pointer ${
                                tab === tabValue.name
                                  ? "text-purple border-purple border-b-4"
                                  : "text-dark-gray dark:text-white border-transparent "
                              }`}
                            >
                              {tabValue.content}
                            </span>
                            <span
                              className={`w-5 h-5 group-hover:bg-pink group-hover:text-dark-white  text-[10px]  rounded-full absolute -top-2 -right-5 flex justify-center items-center ${
                                tab === tabValue.name
                                  ? "text-white bg-purple"
                                  : "text-thin-light-gray bg-pink"
                              }`}
                            >
                              {tabValue.number}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div style={{ transform: "translateY(-22px)" }}>
                    <Link
                      to="/create-cabal"
                      className="btn-gradient lg:flex hidden w-[153px] h-[46px] rounded-full text-white justify-center items-center"
                    >
                      Create Cabal
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:block w-full h-[1px] bg-[#DCD5FE] dark:bg-[#FFAB3329] absolute top-[42px] left-0"></div>
              </div>
            </div>

            <div className="tab-cotainer w-full mb-8">
              <RoomTable key={tab} hideHeader user="Nuoanunu" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
