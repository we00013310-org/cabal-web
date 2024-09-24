import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import SwapInput from "../SwapInput";
import { getToken, useToken, useTokens } from "../../../hooks/useToken";
import { findAmountB } from "../../../lib/token";
import { swapTokenApi } from "../../../lib/apis/room";
import { generateLeverageColor } from "../../../lib/utils";
import { MAX_LEVERAGE } from "../../../lib/constants";

const SwapTab = ({ roomData, onClose, usePoint = false }) => {
  const queryClient = useQueryClient();
  const [valueA, setValueA] = useState(0);
  const [valueB, setValueB] = useState(0);
  const [tokenA, setTokenA] = useState("sol");
  const [tokenB, setTokenB] = useState("usdc");
  const tokA = useToken(tokenA);
  const tokB = useToken(tokenB);
  const listTokA = useTokens(tokenA);
  const listTokB = useTokens(tokenB);
  const [leverage, setLeverage] = useState(1);
  const assets = useMemo(() => {
    return usePoint ? roomData?.pointAssets : roomData?.assets;
  }, [roomData?.assets, roomData?.pointAssets, usePoint]);

  const [dip, setDip] = useState(false);

  const { mutate: swapToken } = useMutation({
    mutationFn: swapTokenApi(
      roomData.id,
      tokenA,
      valueA,
      tokenB,
      valueB,
      usePoint
    ),
    onSuccess: () => {
      toast.success("Swapped successfully!!");
      queryClient.invalidateQueries({ queryKey: ["rooms", roomData.id] });
      onClose();
    },
  });

  const tokenABalance = useMemo(() => {
    return assets?.find((o) => o.id === tokenA)?.amount || 0;
  }, [assets, tokenA]);
  const tokenBBalance = useMemo(() => {
    return assets?.find((o) => o.id === tokenB)?.amount || 0;
  }, [assets, tokenB]);

  const handleRotate = () => {
    let tmp = tokenA;
    setTokenA(tokenB);
    setTokenB(tmp);
    tmp = valueA;
    setValueA(valueB);
    setValueB(tmp);
  };

  const handleSwap = () => {
    if (valueA > tokenABalance) {
      toast.error("Insufficient balance!");
      return;
    }
    if (tokenA === tokenB) {
      toast.error("Invalid Output!");
      return;
    }

    swapToken();
  };

  const handleChangeValueA = (value) => {
    setValueA(value);
    if (!isNaN(value)) {
      setValueB(findAmountB(value, tokA, tokB));
    }
  };

  const handleChangeValueB = (value) => {
    setValueB(value);

    if (!isNaN(value)) {
      setValueA(findAmountB(value, tokB, tokA));
    }
  };

  return (
    <div className="w-full">
      <SwapInput
        token={
          tokA.id === "sol" && usePoint
            ? {
                ...tokA,
                slug: "pSol",
              }
            : tokA
        }
        value={valueA}
        onChange={(e) => {
          const value = e.target.value;
          handleChangeValueA(value);
        }}
        tokenBalance={tokenABalance}
        listTokens={listTokA?.map((o) => {
          if (o.id === "sol" && usePoint) {
            return {
              ...o,
              slug: "pSol",
            };
          }
          return o;
        })}
        onChangeToken={(token) => {
          setTokenA(token);

          if (!isNaN(valueA)) {
            const tokA = getToken(token);

            setValueB(findAmountB(valueA, tokA, tokB));
          }
        }}
      />
      <div className="relative h-6 full flex justify-center">
        <button
          onClick={handleRotate}
          className="relative top-[-16px] bg-purple w-12 h-12 text-2xl sm:w-16 sm:h-16 text-dark-gray sm:text-4xl dark:text-white rounded-full flex justify-center items-center cursor-pointer transition-transform hover:rotate-180"
        >
          ↓
        </button>
      </div>
      <SwapInput
        output
        token={
          tokB.id === "sol" && usePoint
            ? {
                ...tokB,
                slug: "pSol",
              }
            : tokB
        }
        value={valueB}
        onChange={(e) => {
          const value = e.target.value;
          handleChangeValueB(value);
        }}
        tokenBalance={tokenBBalance}
        listTokens={listTokB?.map((o) => {
          if (o.id === "sol" && usePoint) {
            return {
              ...o,
              slug: "pSol",
            };
          }
          return o;
        })}
        onChangeToken={(token) => {
          setTokenB(token);

          if (!isNaN(valueB)) {
            const tokB = getToken(token);

            setValueA(findAmountB(valueB, tokB, tokA));
          }
        }}
      />
      <div className="flex flex-col space-y-2 py-4 relative">
        <div
          className={`text-sm sm:text-base flex justify-center absolute left-0 top-6 w-full ${generateLeverageColor(leverage, "text")}`}
        >
          {leverage} X
        </div>
        <label
          className="text-sm sm:text-base text-dark-gray dark:text-white"
          htmlFor="leverage"
        >
          Leverage
        </label>
        <input
          onChange={(e) => setLeverage(e.target.value)}
          value={leverage}
          className={`w-full ${generateLeverageColor(leverage)}`}
          type="range"
          name="leverage"
          min="1"
          max={MAX_LEVERAGE}
        />
      </div>
      <div
        onClick={() => setDip(!dip)}
        className="flex my-4 items-center space-x-2.5 cursor-pointer"
      >
        <button
          type="button"
          className="w-5 h-5 text-dark-gray dark:text-white flex justify-center items-center border border-light-gray"
        >
          {dip && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <span className="text-sm sm:text-base text-dark-gray dark:text-white">
          Buy Dip
        </span>
      </div>
      {!!dip && (
        <div className="input-field my-2 animate-fade">
          <div className="input-wrapper border border-light-purple dark:border-[#FFAB3329]  w-full rounded-full h-[58px] flex items-center overflow-hidden">
            <div className="flex-1 pl-4 sm:pl-8 flex h-full items-center bg-[#FAFAFA] dark:bg-[#11131F] ">
              <div className="flex space-x-1 items-center">
                <span className="text-dark-gray dark:text-white text-sm sm:text-base mr-1 sm:mr-2">
                  MC ↓ by
                </span>
                <span>
                  <svg
                    width="13"
                    height="6"
                    viewBox="0 0 13 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.7"
                      d="M12.7488 0.247421C12.6691 0.169022 12.5744 0.106794 12.4699 0.0643287C12.3655 0.0218632 12.2535 0 12.1403 0C12.0272 0 11.9152 0.0218632 11.8107 0.0643287C11.7063 0.106794 11.6115 0.169022 11.5318 0.247421L7.60655 4.07837C7.52688 4.15677 7.43209 4.219 7.32765 4.26146C7.22321 4.30393 7.11119 4.32579 6.99805 4.32579C6.88491 4.32579 6.77289 4.30393 6.66845 4.26146C6.56401 4.219 6.46922 4.15677 6.38954 4.07837L2.46427 0.247421C2.3846 0.169022 2.28981 0.106794 2.18537 0.0643287C2.08093 0.0218632 1.96891 0 1.85577 0C1.74263 0 1.63061 0.0218632 1.52617 0.0643287C1.42173 0.106794 1.32694 0.169022 1.24727 0.247421C1.08764 0.404141 0.998047 0.616141 0.998047 0.837119C0.998047 1.0581 1.08764 1.2701 1.24727 1.42682L5.18111 5.26613C5.6632 5.73605 6.31669 6 6.99805 6C7.6794 6 8.33289 5.73605 8.81498 5.26613L12.7488 1.42682C12.9084 1.2701 12.998 1.0581 12.998 0.837119C12.998 0.616141 12.9084 0.404141 12.7488 0.247421Z"
                      fill="#374557"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="w-[1px] h-[33px] bg-light-purple dark:bg-dark-light-purple "></div>
            <span className="px-8 items-center w-8/12 flex text-dark-gray dark:text-white text-base h-full bg-[#FAFAFA] dark:bg-[#11131F] ">
              ≤
              <input
                placeholder="20"
                className="input-field placeholder:text-base text-base px-6 text-dark-gray dark:text-white flex-1 h-full bg-[#FAFAFA] dark:bg-[#11131F]  focus:ring-0 focus:outline-none"
                type="number"
              />
              %
            </span>
          </div>
        </div>
      )}

      <div className="w-full mt-4 pt-4 sm:mt-8 sm:pt-8 bg-red border-t border-light-purple dark:border-[#FFAB3329] flex justify-center items-center">
        <button
          disabled={!tokenABalance}
          onClick={handleSwap}
          className="flex justify-center items-center btn-gradient text-base sm:text-xl rounded-full text-white py-2 w-40 sm:py-2.5"
        >
          Swap
        </button>
      </div>
    </div>
  );
};

export default SwapTab;
