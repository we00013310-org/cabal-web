import React, { useState, useMemo } from "react";

import SelectBox from "../Helpers/SelectBox";
import ROOMS_DATA from "../../data/room_data.json";
import RoomListItem from "../common/RoomListItem";

export default function RoomTable({ className }) {
  const filterCategories = ["All", "Owned", "Joined"];
  const [selectedCategory, setCategory] = useState(filterCategories[0]);
  const data = useMemo(() => {
    if (selectedCategory === "Owned") {
      return ROOMS_DATA.datas.filter((o) => o.owned);
    }

    if (selectedCategory === "Joined") {
      return ROOMS_DATA.datas.filter((o) => o.joined);
    }

    return ROOMS_DATA.datas;
  }, [selectedCategory]);

  return (
    <div
      className={`update-table w-full p-8 bg-white dark:bg-dark-white   overflow-hidden rounded-2xl section-shadow relative min-h-[520px] ${
        className || ""
      }`}
    >
      <div className="header w-full sm:flex justify-between items-center mb-5">
        <div className="flex space-x-2 items-center mb-2 sm:mb-0">
          <h1 className="text-xl font-bold text-dark-gray dark:text-white tracking-wide">
            All Rooms
          </h1>
        </div>
        <SelectBox
          action={setCategory}
          datas={filterCategories}
          className="Update-table-dropdown"
          contentBodyClasses="w-auto min-w-max"
        />
      </div>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-thin-light-gray whitespace-nowrap px-2 border-b dark:border-[#5356fb29]  default-border-bottom ">
              <td className="py-4 w-[300px] block whitespace-nowrap">Room</td>
              <td className="py-4 whitespace-nowrap text-center">Value</td>
              <td className="py-4 whitespace-nowrap text-center">Member</td>
              <td className="py-4 whitespace-nowrap text-center">24H%</td>
              <td className="py-4 whitespace-nowrap  text-right">Created At</td>
            </tr>
            {/* table heading end */}
            {data.map((o) => {
              return <RoomListItem key={o.id} data={o} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
