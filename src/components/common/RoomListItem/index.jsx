import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../lib/date";

import dataImage1 from "../../../assets/images/data-table-user-1.png";
import { useRoomValue } from "../../../hooks/useRoom";

const calculatePercent = (room, value) => {
  const prevValue = value - room["24h"];

  if (!prevValue) {
    return 0;
  }

  return ((Math.abs(room["24h"]) * 100.0) / prevValue).toFixed(2);
};

const RoomListItem = ({ data }) => {
  const navigate = useNavigate();
  const roomValue = useRoomValue(data);

  return (
    <tr
      onClick={() => {
        navigate(`/rooms/${data.id}`);
      }}
      className="animate-fade bg-white dark:bg-dark-white border-b dark:border-[#FFAB3329] hover:opacity-80 hover:cursor-pointer"
    >
      <td className="py-2 md:py-4">
        <div className="flex space-x-2 items-center">
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden flex justify-center items-center">
            <img
              src={data.img || dataImage1}
              alt="data"
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-base md:text-xl text-dark-gray dark:text-white">
              {data.name}
            </h1>
            <span className="text-sm text-thin-light-gray">
              Owned by <span className="text-purple">{data.name}</span>
            </span>
          </div>
        </div>
      </td>
      <td className="text-center py-2 md:py-4 px-2">
        <div className="text-sm md:text-base flex space-x-1 items-center justify-center">
          $
          <span className="ml-1 text-dark-gray dark:text-white font-medium whitespace-nowrap">
            {roomValue}
          </span>
        </div>
      </td>
      <td className="text-center py-2 md:py-4">
        <span className="text-sm md:text-base text-dark-gray dark:text-white font-medium">
          {data.members}
        </span>
      </td>
      <td className="text-center py-2 md:py-4 px-2">
        <span
          className={`text-sm md:text-base whitespace-nowrap px-2 ${data["24h"] >= 0 ? "text-light-green" : "text-light-red"}`}
        >
          {data["24h"]} ({calculatePercent(data, roomValue)}%)
        </span>
      </td>
      <td className="text-center py-2 md:py-4">
        <span className="text-sm md:text-base text-thin-light-gray whitespace-nowrap px-2">
          {formatDate(new Date(data.createdAt || 1))}
        </span>
      </td>
    </tr>
  );
};

export default RoomListItem;
