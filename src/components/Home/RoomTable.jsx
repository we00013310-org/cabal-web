import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import orderBy from "lodash/orderBy";

import SearchCom from "../Helpers/SearchCom";
import SelectBox from "../Helpers/SelectBox";
import RoomListItem from "../common/RoomListItem";
import { fetchRooms } from "../../lib/apis/room";
import { PER_PAGE } from "../../lib/constants";

export default function RoomTable({
  className,
  hideHeader = false,
  defaultFilter,
  user,
  hideShowMore = false,
  explore = false,
}) {
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
  const [search, setSearch] = useState();

  const [sort, setSort] = useState(tabs[0].name);
  const [nItems, setNItems] = useState(PER_PAGE);
  const { data: rawData } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });
  const filterCategories = ["All", "Owned", "Investing"];
  const [selectedCategory, setCategory] = useState(
    defaultFilter || filterCategories[0]
  );

  const handleShowMore = () => {
    setNItems((o) => o + PER_PAGE);
  };

  const data = useMemo(() => {
    if (!rawData) {
      return [];
    }

    let results = rawData;

    if (user) {
      results = rawData?.filter((o) => o.owner === user);
    }
    if (selectedCategory === "Owned") {
      results = rawData?.filter((o) => o.owned);
    }

    if (selectedCategory === "Investing") {
      results = rawData?.filter((o) => o.joined);
    }

    if (sort === "Trending") {
      results = orderBy(results, ["value"], ["desc"]);
    }
    if (sort === "New") {
      results = orderBy(results, ["createdAt"], ["desc"]);
    }

    if (search) {
      results = results.filter((o) => {
        return (
          o.name.toLowerCase().includes(search.toLowerCase()) ||
          o.owner.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    return results;
  }, [rawData, user, selectedCategory, sort, search]);

  if (!data?.length) {
    return null;
  }

  if (search && !data.length) {
    <div className="w-full text-center">No Data</div>;
  }

  const hasShowMore = !hideShowMore && data.length > nItems;

  return (
    <div
      className={`update-table w-full p-4 md:p-8 bg-white dark:bg-dark-white overflow-hidden rounded-2xl section-shadow relative min-h-[320px] ${
        className || ""
      }`}
    >
      {!hideHeader && (
        <div className="header w-full flex items-center mb-2">
          <div className="flex space-x-2 items-center mb-2 sm:mb-0">
            <h1 className="text-base sm:text-xl font-bold text-dark-gray dark:text-white tracking-wide">
              All Cabals
            </h1>
          </div>
        </div>
      )}
      {!!explore && (
        <div className="flex flex-col-reverse sm:flex-row sm:space-x-2 space-y-2 justify-center sm:justify-between items-center md:py-9 py-4 pb-8">
          <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <ul className="flex justify-around">
              {tabs?.length > 0 &&
                tabs.map((tabValue) => (
                  <li
                    key={tabValue.id}
                    className={`py-4 relative group inline text-center w-[100px] cursor-pointer sm:border-b-none border-b ${sort === tabValue.name ? "border-purple border-b-2" : " border-transparent "}`}
                    onClick={() => setSort(tabValue.name)}
                  >
                    <span
                      className={`group-hover:border-purple lg:text-base text-sm tracking-wide font-bold group-hover:text-purple text-dark-gray dark:text-white relative z-10 cursor-pointer ${
                        sort === tabValue.name
                          ? "text-purple "
                          : "text-dark-gray dark:text-white"
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
        </div>
      )}
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-sm md:text-base text-thin-light-gray whitespace-nowrap px-2 border-b dark:border-[#FFAB3329]  default-border-bottom ">
              <td className="py-2 w-[240px] md:w-[300px] block whitespace-nowrap">
                Cabal
              </td>
              <td className="py-2 whitespace-nowrap text-center">Value</td>
              <td className="py-2 whitespace-nowrap text-center">Keys Sold</td>
              <td className="py-2 whitespace-nowrap text-center">24H%</td>
              <td className="py-2 whitespace-nowrap text-center">Created On</td>
            </tr>
            {/* table heading end */}
            {data?.slice(0, nItems)?.map((o) => {
              return <RoomListItem key={o.id} data={o} />;
            })}
          </tbody>
        </table>
        {!!hasShowMore && (
          <div className="w-full flex justify-center items-center mt-2">
            <button
              onClick={handleShowMore}
              className="w-full py-2 flex justify-center items-center hover:opacity-80 border border-dark-light-purple dark:border-purple text-base rounded-full text-dark-light-purple dark:text-purple"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
