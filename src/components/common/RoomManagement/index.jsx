import { useState } from "react";

import ActionTab from "./ActionTab";
import SwapTab from "./SwapTab";
import CollateralTab from "./CollateralTab";

import CloseIcon from "../../../assets/images/icons/close-ic.png";

const tabsData = [
  {
    id: "swap",
    label: "Swap token",
    selectedIcon: "hammer",
    icon: "gradient-hammer",
  },
  {
    id: "collateral",
    label: "Collateral",
    selectedIcon: "doller",
    icon: "gradient-doller",
  },
];

const RoomManagement = ({ roomData, onClose }) => {
  const [tab, setTab] = useState(tabsData[0].id);

  return (
    <div className="lg:w-[580px] sm:w-[450px] w-full rounded-2xl h-auto bg-white dark:bg-dark-white  ">
      <div className="heading border-b dark:border-[#FFAB3329]  border-light-purple lg:px-7 sm:px-5 p-4 flex items-center justify-between">
        <h3 className="text-base sm:text-xl font-bold text-dark-gray dark:text-white">
          Cabal Management
        </h3>
        <button
          onClick={onClose}
          className="text-dark-gray dark:text-white cursor-pointer w-[24px] h-[24px] hover:opacity-80"
        >
          <img src={CloseIcon} />
        </button>
      </div>
      <div className="content p-4 sm:p-8">
        <div className="items flex space-x-5">
          {tabsData.map((o) => {
            return (
              <ActionTab
                key={o.id}
                data={o}
                selected={tab === o.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setTab(o.id);
                }}
              />
            );
          })}
        </div>
        <div className="mt-4 sm:mt-6">
          {tab === "swap" ? (
            <SwapTab roomData={roomData} onClose={onClose} />
          ) : (
            <CollateralTab onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomManagement;
