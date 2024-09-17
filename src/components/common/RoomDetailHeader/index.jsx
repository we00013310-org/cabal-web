import React, { useMemo } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { formatDate } from "../../../lib/date";
import { buyKeyApi } from "../../../lib/apis/balance";

import SolIcon from "../../../assets/images/tokens/sol.svg";
import USERS_DATA from "../../../data/user_data.json";

export default function RoomDetailHeader({ data, ownedKeys = 0, className }) {
  const queryClient = useQueryClient();

  const keyPrice = useMemo(() => {
    return (data.maxSolAmount * 1.0) / data.max;
  }, [data.max, data.maxSolAmount]);

  const sellPrice = useMemo(() => {
    const solLeft = data.assets?.find((o) => o.id === "sol")?.amount || 0;

    return (solLeft * 1.0) / data.members;
  }, [data.assets, data.members]);

  const { mutate: buyKey } = useMutation({
    mutationFn: buyKeyApi(data.id, 1, keyPrice),
    onSuccess: () => {
      toast.success("Bought a Key!");
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["rooms", data.id] });
    },
  });
  const { mutate: sellKey } = useMutation({
    mutationFn: buyKeyApi(data.id, -1, sellPrice),
    onSuccess: () => {
      toast.success("Sold a Key!");
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["rooms", data.id] });
    },
  });
  const ownerData = USERS_DATA.datas.find((o) => o.name === data.owner);

  const generateActions = () => {
    // if (data.owned) {
    //   return (
    //     <button className="w-40 h-11 flex justify-center items-center btn-gradient text-base rounded-full text-white">
    //       Manage Room
    //     </button>
    //   );
    // }

    // if (data.joined) {
    //   return (
    //     <button className="w-40 h-11 flex justify-center items-center btn-gradient text-base rounded-full text-white">
    //       Quit
    //     </button>
    //   );
    // }

    return (
      <button
        disabled={data.members >= data.max}
        onClick={() => {
          buyKey();
        }}
        className="w-40 h-11 flex justify-center items-center btn-gradient text-base rounded-full text-white"
      >
        Buy Key
      </button>
    );
  };

  return (
    <div
      className={`w-full shadow lg:flex rounded-lg justify-between items-center md:p-9 p-4 py-9 bg-white dark:bg-dark-white  border-b dark:border-[#5356fb29] -2 border-pink mb-10 ${
        className || ""
      }`}
    >
      <div className="flex-1 mb-8 lg:mb-0">
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
      <div className="flex flex-col lg:justify-end space-y-2 lg:mr-8">
        <p className="text-thin-light-gray">
          Sold Keys:{" "}
          <span className="text-xl text-dark-white dark:text-white">
            {data.members} / {data.max}
          </span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="text-thin-light-gray">Key Price: </span>
          <span className="text-xl text-dark-white dark:text-white">
            {keyPrice}
          </span>
          <img className="w-[24px] h-[24px] ml-2" src={SolIcon} />
        </p>
        <div className="flex items-center space-x-5 pt-2">
          {generateActions()}
        </div>
      </div>
      <div className="flex flex-col lg:justify-end space-y-2">
        <p className="text-thin-light-gray">
          Owned Keys:{" "}
          <span className="text-xl font-bold text-purple">{ownedKeys}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="text-thin-light-gray">Sell Price: </span>
          <span className="text-xl text-dark-white dark:text-white">
            {+sellPrice.toFixed(4)}
          </span>
          <img className="w-[24px] h-[24px] ml-2" src={SolIcon} />
        </p>
        <div className="flex items-center space-x-5 pt-2">
          <button
            disabled={ownedKeys <= 0}
            onClick={() => {
              sellKey();
            }}
            className="w-40 h-11 flex justify-center items-center btn-gradient text-base rounded-full text-white"
          >
            Sell Key
          </button>
        </div>
      </div>
    </div>
  );
}
