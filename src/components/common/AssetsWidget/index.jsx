import React, { useMemo } from "react";

import background from "../../../assets/images/shape/balance-bg.png";

import TOKENS_DATA from "../../../data/token_data.json";
import { useRoomValue } from "../../../hooks/useRoom";
import { formatNumb } from "../../../lib/number";
import SolIcon from "../../../assets/images/tokens/sol.svg";
import { useSolToken } from "../../../hooks/useToken";

const calculatePercent = (room, value) => {
  const prevValue = value - room["24h"];

  if (!prevValue) {
    return 0;
  }

  return ((Math.abs(room["24h"]) * 100.0) / prevValue).toFixed(2);
};

export default function AssetsWidget({ data }) {
  const solToken = useSolToken();
  const roomValue = useRoomValue(data);
  const roomPrice = (data.maxSolAmount * 1.0) / data.max;
  const formattedAssets = useMemo(() => {
    const results = [];

    if (!roomValue) {
      return results;
    }

    data.assets?.forEach((o) => {
      const token = TOKENS_DATA.datas.find((i) => i.id === o.id);
      const value = o.amount * token.price;
      const percent = (value * 100.0) / roomValue;

      results.push({
        ...token,
        amount: o.amount,
        value,
        percent,
      });
    });

    return results;
  }, [data, roomValue]);

  return (
    <div
      className="current-balance-widget w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between px-4 py-4 sm:px-8 sm:py-9"
      style={{
        background: `url(${background}) 0% 0% / cover no-repeat`,
      }}
    >
      <div className="flex justify-between mb-2">
        <div className="balance">
          <p className="text-base sm:text-lg text-white opacity-[70%] tracking-wide mb-2 sm:mb-4">
            Current Value
          </p>
          <p className="text-4xl sm:text-5xl font-bold text-white tracking-wide leading-10 mb-1">
            $ {roomValue}
          </p>
          <p
            className={`text-base sm:text-lg ${data["24h"] >= 0 ? "text-light-green" : "text-light-red"} tracking-wide`}
          >
            $ {data["24h"]} ({calculatePercent(data, roomValue)}%)
          </p>
        </div>
        <div className="key-solds">
          <p className="text-base sm:text-lg text-white opacity-[70%] tracking-wide mb-2 sm:mb-4">
            Total Keys sold
          </p>
          <p className="text-4xl sm:text-5xl font-bold text-white tracking-wide leading-10 mb-1">
            {data.members} keys
          </p>
          <div className="flex items-center">
            <p className="text-base sm:text-xl font-bold text-white tracking-wide">
              {+(data.members * roomPrice).toFixed(4)}
            </p>
            <img
              className="w-4 h-4 sm:w-[20px] sm:h-[20px] ml-1"
              src={SolIcon}
            />
            <p className="text-sm sm:text-base text-white flex items-center ml-1">
              <span>
                ~ ${+(solToken.price * data.members * roomPrice).toFixed(4)}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="counters flex space-x-16">
        {formattedAssets.map((o) => {
          return (
            <div
              className="circle-count w-[33%] flex-col items-center"
              key={o.id}
            >
              <div>
                <div className="percent flex justify-center">
                  <svg>
                    <circle cx="37" cy="37" r="30"></circle>
                    <circle
                      cx="37"
                      cy="37"
                      r="30"
                      style={{ "--percent": `${o.percent.toFixed(0)}` }}
                    />
                  </svg>
                  <div className="number">
                    <h3>
                      {o.percent.toFixed(0)}
                      <span>%</span>
                    </h3>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-white text-center uppercase">
                  {formatNumb(o.amount)} {o.slug}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
