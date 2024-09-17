import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../lib/date";

import dataImage1 from "../../../assets/images/data-table-user-1.png";

const calculatePercent = (room) => {
  const prevValue = room.value - room["24h"];

  if (!prevValue) {
    return 0;
  }

  return ((Math.abs(room["24h"]) * 100.0) / prevValue).toFixed(2);
};

const RoomListItem = ({ data }) => {
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => {
        navigate(`/rooms/${data.id}`);
      }}
      className="bg-white dark:bg-dark-white border-b dark:border-[#5356fb29] hover:opacity-80 hover:cursor-pointer"
    >
      <td className=" py-4">
        <div className="flex space-x-2 items-center">
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center">
            <img
              src={data.img || dataImage1}
              alt="data"
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl   text-dark-gray dark:text-white">
              {data.name}
            </h1>
            <span className="text-sm text-thin-light-gray">
              Owned by <span className="text-purple">{data.owner}</span>
            </span>
          </div>
        </div>
      </td>
      <td className="text-center py-4 px-2">
        <div className="flex space-x-1 items-center justify-center">
          $
          <span className="ml-1 text-base text-dark-gray dark:text-white font-medium whitespace-nowrap">
            {data.value}
          </span>
        </div>
      </td>
      <td className="text-center py-4">
        <span className="text-base text-dark-gray dark:text-white font-medium">
          {data.members} / {data.max}
        </span>
      </td>
      <td className="text-center py-4 px-2">
        <span
          className={`text-base whitespace-nowrap px-2 ${data["24h"] >= 0 ? "text-light-green" : "text-light-red"}`}
        >
          {data["24h"]} ({calculatePercent(data)}%)
        </span>
      </td>
      <td className="text-right py-4">
        <span className="text-base text-thin-light-gray whitespace-nowrap px-2">
          {formatDate(new Date())}
        </span>
      </td>
    </tr>
  );
};

export default RoomListItem;
