import { Link } from "react-router-dom";
import { useState } from "react";

import Layout from "../components/Partials/Layout";
import SearchCom from "../components//Helpers/SearchCom";
import RoomTable from "../components/Home/RoomTable";

const ExplorePage = () => {
  const tabs = [
    {
      id: 1,
      name: "Trending",
      content: "Trending",
    },
    {
      id: 2,
      name: "New",
      content: "New",
    },
  ];

  const [tab, setTab] = useState(tabs[0].name);
  const [search, setSearch] = useState();

  return (
    <Layout>
      <div className="home-page-wrapper">
        <div className="mb-4 sm:mb-6">
          <h1 className="sm:text-2xl text-xl font-bold text-dark-gray dark:text-white">
            <span>Explore Cabals</span>
          </h1>
        </div>

        <div className="w-full shadow flex flex-col-reverse sm:space-x-2 space-y-2 sm:flex-row rounded-lg justify-between items-center md:p-9 p-4 bg-white dark:bg-dark-white border-b dark:border-[#FFAB3329] border-pink mb-8 pb-8">
          <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <ul className="flex justify-around">
              {tabs?.length > 0 &&
                tabs.map((tabValue) => (
                  <li
                    key={tabValue.id}
                    className="relative group inline text-center w-[100px] cursor-pointer"
                    onClick={() => setTab(tabValue.name)}
                  >
                    <span
                      className={`py-4 sm:border-b-none border-b group-hover:border-purple lg:text-base text-sm tracking-wide font-bold  group-hover:text-purple text-dark-gray dark:text-white relative z-10 cursor-pointer ${
                        tab === tabValue.name
                          ? "text-purple border-purple border-b-2"
                          : "text-dark-gray dark:text-white border-transparent "
                      }`}
                    >
                      {tabValue.content}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="w-full sm:w-[200px] md:w-[240px] lg:w-[318px]">
            <SearchCom onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex-1" />
          <div className="w-full sm:w-auto sm:border-b-0 border-b border-dashed border-b-light-purple dark:border-b-dark-light-purple pb-4 sm:pb-0">
            <Link
              to="/create-cabal"
              className="w-full sm:w-auto px-8 py-2 flex justify-center items-center btn-gradient text-base rounded-full text-white"
            >
              CREATE A CABAL
            </Link>
          </div>
        </div>

        <RoomTable search={search} hideHeader sort={tab} />
      </div>
    </Layout>
  );
};

export default ExplorePage;
