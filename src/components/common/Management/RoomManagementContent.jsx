import { useMemo, useState } from "react";

import { useTokens } from "../../../hooks/useToken";
import AssetsTable from "./AssetsTable";
import { generateNumbersInRange } from "../../../lib/generator";
import { formatNumb } from "../../../lib/number";
import RoomManagement from "../RoomManagement";
import ModalCom from "../../Helpers/ModalCom";

const TABS = [
  {
    id: 1,
    name: "My Assets",
    content: "My Assets",
  },
  {
    id: 2,
    name: "Market Trending",
    content: "Market Trending",
  },
];

const RoomManagementContent = ({ roomData, className }) => {
  const listTokens = useTokens();
  const [tab, setTab] = useState(TABS[0].name);
  const tabHandler = (value) => {
    setTab(value);
  };
  const [selectedToken, setSelectedToken] = useState();

  const allTokensData = useMemo(() => {
    return listTokens.map((o) => {
      return {
        ...o,
        volume: roomData.assets?.find((i) => i.id === o.id)?.amount,
        "1h": formatNumb(generateNumbersInRange(2, 5, 200)[0]),
        "24h": formatNumb(generateNumbersInRange(2, 20, 200)[0]),
        "7d": formatNumb(generateNumbersInRange(2, 100, 200)[0]),
      };
    });
  }, [listTokens, roomData.assets]);

  const tokensData = useMemo(() => {
    if (tab === "My Assets") {
      return allTokensData.filter((o) => !!o.volume);
    }

    return allTokensData;
  }, [allTokensData, tab]);

  return (
    <div
      className={`w-full shadow rounded-lg jp-4 md:p-8 py-4 md:py-8 bg-white dark:bg-dark-white  border-b dark:border-[#FFAB3329] -2 border-pink mb-8 ${
        className || ""
      }`}
    >
      <div className="tab-items mb-8">
        <ul className="lg:flex lg:space-x-14 space-x-8">
          {TABS.map((tabValue) => (
            <li
              key={tabValue.id}
              className="relative group inline"
              onClick={() => tabHandler(tabValue.name)}
            >
              <span
                className={`py-4 sm:border-b-none border-b group-hover:border-purple lg:text-xl text-sm tracking-wide font-bold  group-hover:text-purple text-dark-gray dark:text-white relative z-10 cursor-pointer ${
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
      <AssetsTable
        myAssets={tab === "My Assets"}
        tokensData={tokensData}
        onBuy={setSelectedToken}
      />
      {!!selectedToken && (
        <ModalCom action={() => setSelectedToken(undefined)} situation={true}>
          <RoomManagement
            onClose={() => setSelectedToken(false)}
            roomData={roomData}
          />
        </ModalCom>
      )}
    </div>
  );
};

export default RoomManagementContent;
