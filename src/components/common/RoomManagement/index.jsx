import { useState } from "react";
import ActionTab from "./ActionTab";
import SwapTab from "./SwapTab";
import CollateralTab from "./CollateralTab";

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
      <div className="heading border-b dark:border-[#5356fb29]  border-light-purple lg:px-7 sm:px-5 px-3 py-6 flex items-center justify-between">
        <h3 className="text-xl font-bold   text-dark-gray dark:text-white">
          Room Management
        </h3>
      </div>
      <div className="content lg:px-7 px-3 sm:px-5 py-8">
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
        <div className="mt-8">
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
