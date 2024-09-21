import React, { useMemo, useState } from "react";

import SelectBox from "../../Helpers/SelectBox";
import { generateNearestDays } from "../../../lib/date";
import { generateNumbersInRange } from "../../../lib/generator";
import RoomValueChart from "./RoomValueChart";
import { useRoomValue } from "../../../hooks/useRoom";
import { useTokens } from "../../../hooks/useToken";

export default function RoomValueStatics({ data }) {
  const tokens = useTokens();
  const roomValue = useRoomValue(data);
  const filterDatas = ["Last 15 days", "Last 7 days", "Last 30 days"];
  const [currencyDataLvl, setCurrencyDataLvl] = useState(
    generateNearestDays(15)
  );
  const dataSetHandler = (value) => {
    if (value === "Last 30 days") {
      setCurrencyDataLvl(generateNearestDays(30));
    } else if (value === "Last 7 days") {
      setCurrencyDataLvl(generateNearestDays(7));
    } else {
      setCurrencyDataLvl(generateNearestDays(15));
    }
  };
  const chartsData = useMemo(() => {
    return data.assets.map((o) => {
      const token = tokens.find((i) => i.id === o.id);
      return {
        label: o.id,
        data: generateNumbersInRange(
          currencyDataLvl.length,
          token.price * o.amount
        ),
        color: token.color,
      };
    });
  }, [currencyDataLvl.length, data.assets, tokens]);

  return (
    <div className="sell-analise w-full sm:p-8 p-4 bg-white dark:bg-dark-white overflow-hidden rounded-2xl section-shadow mb-8">
      <div className="flex flex-col justify-between h-full">
        <div className="content flex justify-between items-center mb-5">
          <div>
            <h1 className="text-base sm:text-xl text-dark-gray dark:text-white tracking-wide">
              Cabal Value Analize
            </h1>
          </div>
          <SelectBox datas={filterDatas} action={dataSetHandler} />
        </div>
        <div>
          <RoomValueChart dataLvls={currencyDataLvl} chartsData={chartsData} />
        </div>
      </div>
    </div>
  );
}
