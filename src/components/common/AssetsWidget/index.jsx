import React, { useMemo } from "react";

import background from "../../../assets/images/shape/balance-bg.svg";

import TOKENS_DATA from "../../../data/token_data.json";

const calculatePercent = (room) => {
  const prevValue = room.value - room["24h"];

  if (!prevValue) {
    return 0;
  }

  return ((Math.abs(room["24h"]) * 100.0) / prevValue).toFixed(2);
};

export default function AssetsWidget({ data }) {
  const formattedAssets = useMemo(() => {
    const results = [];
    let solValue = data.value;

    if (!data.value) {
      return results;
    }

    data.assets?.forEach((o) => {
      const token = TOKENS_DATA.datas.find((i) => i.id === o.id);
      const value = o.amount * token.price;
      solValue -= value;
      const percent = (value * 100.0) / data.value;

      results.push({
        ...token,
        amount: o.amount,
        value,
        percent,
      });
    });

    if (solValue > 0) {
      const solToken = TOKENS_DATA.datas.find((o) => o.id === "sol");
      results.push({
        ...solToken,
        amount: (solValue * 1.0) / solToken.price,
        value: solValue,
        percent: (solValue * 100.0) / data.value,
      });
    }

    return results;
  }, [data]);

  return (
    <div
      className="current-balance-widget w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between  px-8 py-9"
      style={{
        background: `url(${background}) 0% 0% / cover no-repeat`,
      }}
    >
      <div className="balance">
        <p className="text-lg text-white opacity-[70%] tracking-wide mb-6">
          Current Value
        </p>
        <p className="text-[44px] font-bold text-white tracking-wide leading-10 mb-2">
          $ {data.value}
        </p>
        <p
          className={`text-lg ${data["24h"] >= 0 ? "text-light-green" : "text-light-red"} tracking-wide`}
        >
          $ {data["24h"]} ({calculatePercent(data)}%)
        </p>
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
                <p className="font-18 text-white text-center uppercase">
                  {o.amount.toFixed(2)} {o.slug}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
