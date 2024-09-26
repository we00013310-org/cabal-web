import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";

import { formatDate } from "../../../lib/date";
import { buyKeyApi } from "../../../lib/apis/balance";
import { formatUsersData } from "../../../lib/utils";
import ModalCom from "../../Helpers/ModalCom";
import RoomManagement from "../RoomManagement";

import Img from "../../../assets/images/auth-profile-picture.png";

import SolIcon from "../../../assets/images/tokens/sol.svg";
import USERS_DATA from "../../../data/user_data.json";

export default function RoomDetailHeader({ data, ownedKeys = 0, className }) {
  const queryClient = useQueryClient();
  const [modal, showModal] = useState(false);
  const { publicKey } = useWallet();

  const keyPrice = data.price;

  const sellPrice = useMemo(() => {
    if (!data.members) {
      return null;
    }
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
  const ownerData = formatUsersData(USERS_DATA.datas, publicKey).find(
    (o) => o.name === data.owner
  );

  const generateActions = () => {
    return (
      <button
        onClick={() => {
          buyKey();
        }}
        className="flex justify-center items-center btn-gradient text-sm sm:text-base rounded-full text-white py-1.5 w-40 sm:py-2.5"
      >
        Buy Key
      </button>
    );
  };

  return (
    <>
      <div
        className={`w-full shadow lg:flex rounded-lg justify-between items-center p-4 md:p-8 py-4 md:py-8 bg-white dark:bg-dark-white  border-b dark:border-[#FFAB3329] -2 border-pink mb-8 ${
          className || ""
        }`}
      >
        <div className="flex-1 mb-4 lg:mb-0 flex justify-center lg:justify-start">
          <div className="flex space-x-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 flex justify-center items-center rounded-full overflow-hidden">
              <img src={data.img || Img} alt="" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-4xl text-dark-gray dark:text-white font-bold mb-2 sm:mb-3">
                {data.name}
              </h1>
              <span className="text-base text-thin-light-gray tracking-wide mb-4 flex flex-col-reverse sm:flex-row sm:items-center">
                <div className="flex items-center space-x-2 lg:mb-0 mr-2">
                  <div>
                    <p className="text-base tracking-wide font-bold antise text-purple">
                      {data.name}
                    </p>
                  </div>
                </div>
                <span className="hidden sm:block">created on </span>
                <span className="italic text-dark-white dark:text-white mb-2 sm:mb-0 ml-1">
                  {formatDate(new Date())}
                </span>
              </span>
              {!!data?.owned && (
                <button
                  onClick={() => showModal(true)}
                  className="text-white btn-shine text-sm sm:text-base rounded-full tracking-wide bg-purple px-4 py-1.5 sm:px-4 sm:py-2.5 flex justify-center items-center"
                >
                  <span>Manage Cabal</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start py-4 lg:py-0 lg:justify-end space-y-2 lg:mr-8 border-t lg:border-t-0 border-light-purple dark:border-[#FFAB3329]">
          <p className="text-sm sm:text-base text-thin-light-gray">
            Keys Sold:{" "}
            <span className="text-base sm:text-xl text-dark-white dark:text-white">
              {data.members}
            </span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="text-sm sm:text-base text-thin-light-gray">
              Key Price:{" "}
            </span>
            <span className="text-base sm:text-xl text-dark-white dark:text-white">
              {keyPrice}
            </span>
            <img className="w-[24px] h-[24px] ml-2" src={SolIcon} />
          </p>
          <div className="flex items-center space-x-5 pt-2">
            {generateActions()}
          </div>
        </div>
        <div className="flex flex-col pt-4 lg:py-0 items-center lg:items-start border-t lg:border-t-0 border-light-purple dark:border-[#FFAB3329] lg:justify-end space-y-2">
          <p className="text-sm sm:text-base text-thin-light-gray">
            Owned Keys:{" "}
            <span className="text-base sm:text-xl font-bold text-purple">
              {ownedKeys}
            </span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="text-sm sm:text-base text-thin-light-gray">
              Sell Price:{" "}
            </span>
            <span className="text-base sm:text-xl text-dark-white dark:text-white">
              {sellPrice ? +sellPrice.toFixed(4) : "-"}
            </span>
            <img
              className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] ml-2"
              src={SolIcon}
            />
          </p>
          <div className="flex items-center space-x-5 pt-2">
            <button
              disabled={ownedKeys <= 0}
              onClick={() => {
                sellKey();
              }}
              className="flex justify-center items-center btn-gradient text-sm sm:text-base rounded-full text-white py-1.5 w-40 sm:py-2.5"
            >
              Sell Key
            </button>
          </div>
        </div>
      </div>
      {!!modal && (
        <ModalCom action={() => showModal(false)} situation={modal}>
          <RoomManagement onClose={() => showModal(false)} roomData={data} />
        </ModalCom>
      )}
    </>
  );
}
