import React from "react";

import { formatDate } from "../../../lib/date";

import SolIcon from "../../../assets/images/tokens/sol.svg";
import USERS_DATA from "../../../data/user_data.json";

export default function RoomDetailHeader({ data, className }) {
  const ownerData = USERS_DATA.datas.find((o) => o.name === data.owner);

  const generateActions = () => {
    if (data.owned) {
      return (
        <button className="w-40 h-11 flex justify-center items-center btn-gradient text-base rounded-full text-white">
          Manage Room
        </button>
      );
    }

    if (data.joined) {
      return (
        <button className="w-40 h-11 flex justify-center items-center btn-gradient text-base rounded-full text-white">
          Quit
        </button>
      );
    }

    return (
      <button className="w-40 h-11 flex justify-center items-center btn-gradient text-base rounded-full text-white">
        Buy Key to Join
      </button>
    );
  };

  return (
    <div
      className={`w-full shadow lg:flex rounded-lg justify-between items-center md:p-9 p-4 py-9 bg-white dark:bg-dark-white  border-b dark:border-[#5356fb29] -2 border-pink mb-10 ${
        className || ""
      }`}
    >
      <div className="lg:w-8/12 w-full mb-8 lg:mb-0">
        <div className="flex space-x-4">
          <div className="w-24 h-24 flex justify-center items-center rounded-full overflow-hidden">
            <img src={data.img} alt="" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-4xl text-dark-gray dark:text-white font-bold mb-3">
              {data.name}
            </h1>
            <span className="text-base text-thin-light-gray tracking-wide mb-4 flex flex-col-reverse sm:flex-row sm:items-center">
              <div className="flex items-center space-x-2 lg:mb-0 mr-2">
                <div className="w-8 h-8 flex justify-center items-center rounded-full overflow-hidden">
                  <img src={ownerData.img} alt="" />
                </div>
                <div>
                  <p className="text-base tracking-wide font-bold antise text-purple">
                    {ownerData.name}
                  </p>
                </div>
              </div>
              <span className="hidden sm:block">created at </span>
              <span className="italic text-dark-white dark:text-white mb-2 sm:mb-0 ml-1">
                {formatDate(new Date())}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center lg:justify-end space-y-2">
        <p className="text-thin-light-gray">
          Members:{" "}
          <span className="text-xl text-dark-white dark:text-white">
            {data.members} / {data.max}
          </span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="text-thin-light-gray">Key Price: </span>
          <span className="text-xl text-dark-white dark:text-white">
            {(data.maxSolAmount * 1.0) / data.max}
          </span>
          <img className="w-[24px] h-[24px] ml-2" src={SolIcon} />
        </p>
        <div className="flex items-center space-x-5 pt-2">
          {generateActions()}
        </div>
      </div>
    </div>
  );
}
