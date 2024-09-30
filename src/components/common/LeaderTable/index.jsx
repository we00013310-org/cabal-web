import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderBy from "lodash/orderBy";

import USERS_DATA from "../../../data/user_data.json";
import { PER_PAGE } from "../../../lib/constants";
import {
  generateNumbersInRange,
  generateTonWalletAddress,
} from "../../../lib/generator";
import { formatNumb } from "../../../lib/number";
import { getCurrentUsername } from "../../../lib/utils";

import dataImage1 from "../../../assets/images/data-table-user-1.png";

const LeaderTable = ({ className }) => {
  const navigate = useNavigate();
  const data = useMemo(
    () =>
      orderBy(
        USERS_DATA.datas.map((o) => {
          if (o.id === "u2") {
            return {
              ...o,
              name: getCurrentUsername() + " [YOU]",
              points: generateNumbersInRange(2, 10000, 100)[0],
              wallet: generateTonWalletAddress(),
            };
          }
          return {
            ...o,
            points: generateNumbersInRange(2, 10000, 100)[0],
            wallet: generateTonWalletAddress(),
          };
        }),
        ["points"],
        ["desc"]
      ),
    []
  );
  const [nItems, setNItems] = useState(PER_PAGE);

  const handleShowMore = () => {
    setNItems((o) => o + PER_PAGE);
  };

  const hasShowMore = data.length > nItems;

  return (
    <div
      className={`update-table w-full p-4 md:p-8 bg-white dark:bg-dark-white overflow-hidden rounded-2xl section-shadow relative min-h-[320px] ${
        className || ""
      }`}
    >
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-sm md:text-base text-thin-light-gray whitespace-nowrap px-2 border-b dark:border-[#FFAB3329]  default-border-bottom ">
              <td className="py-2 whitespace-nowrap text-center">Rank</td>
              <td className="py-2 px-4 w-[150px] md:w-[180px] block whitespace-nowrap">
                Name
              </td>
              <td className="py-2 whitespace-nowrap text-center">Address</td>
              <td className="py-2 whitespace-nowrap text-center">Points</td>
            </tr>
            {/* table heading end */}
            {data?.slice(0, nItems)?.map((o, i) => {
              const rank = i + 1;
              const textColor =
                rank === 1
                  ? "text-purple"
                  : rank === 2
                    ? "text-light-green"
                    : rank === 3
                      ? "text-pink"
                      : "text-dark-gray dark:text-white";

              return (
                <tr
                  onClick={() => {
                    navigate(`/users/${o.id}`);
                  }}
                  className="animate-fade bg-white dark:bg-dark-white border-b dark:border-[#FFAB3329] hover:opacity-80 hover:cursor-pointer"
                >
                  <td
                    className={`text-center py-2 md:py-4 text-xl sm:text-2xl ${textColor}`}
                  >
                    {i + 1}
                  </td>
                  <td className="py-2 md:py-4 px-4">
                    <div className="flex space-x-2 items-center">
                      <div className="w-6 h-6 md:w-10 md:h-10 rounded-full overflow-hidden flex justify-center items-center">
                        <img
                          src={o.img || dataImage1}
                          alt="data"
                          className="w-full h-full"
                        />
                      </div>
                      <h1
                        className={`font-bold text-sm md:text-base ${textColor}`}
                      >
                        {o.name}
                      </h1>
                    </div>
                  </td>
                  <td className="text-center py-2 md:py-4 px-2">
                    <span className="text-xs md:text-sm  font-medium">
                      {o.wallet}
                    </span>
                  </td>
                  <td className="text-center py-2 md:py-4">
                    <span
                      className={`text-base md:text-xl ${textColor} font-medium`}
                    >
                      {formatNumb(o.points, 0)}
                    </span>
                  </td>
                </tr>
              );
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
};

export default LeaderTable;
