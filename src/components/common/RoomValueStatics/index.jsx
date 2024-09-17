import React, { useState } from "react";

import SelectBox from "../../Helpers/SelectBox";
import { generateNearestDays } from "../../../lib/date";
import { generateNumbersInRange } from "../../../lib/generator";
import RoomValueChart from "./RoomValueChart";

export default function RoomValueStatics({ data }) {
  const filterDatas = ["Last 15 days", "Last 7 days", "Last 30 days"];
  const [currencyDataLvl, setCurrencyDataLvl] = useState(
    generateNearestDays(15)
  );
  const [filterDataSet, setFilterDataSet] = useState(
    generateNumbersInRange(15, data.value)
  );
  const dataSetHandler = (value) => {
    if (value === "Last 30 days") {
      setCurrencyDataLvl(generateNearestDays(30));
      setFilterDataSet(generateNumbersInRange(30, data.value));
    } else if (value === "Last 7 days") {
      setCurrencyDataLvl(generateNearestDays(7));
      setFilterDataSet(generateNumbersInRange(7, data.value));
    } else {
      setCurrencyDataLvl(generateNearestDays(15));
      setFilterDataSet(generateNumbersInRange(15, data.value));
    }
  };
  return (
    <div className="sell-analise w-full md:p-8 p-4 bg-white dark:bg-dark-white   overflow-hidden rounded-2xl section-shadow mb-11">
      <div className="flex flex-col justify-between h-full">
        <div className="content flex justify-between items-center mb-5">
          <div>
            <h1 className="text-xl font-bold text-dark-gray dark:text-white tracking-wide">
              Room Value Analize
            </h1>
          </div>
          <SelectBox datas={filterDatas} action={dataSetHandler} />
        </div>
        <div>
          <RoomValueChart dataLvls={currencyDataLvl} datasets={filterDataSet} />
        </div>
      </div>
    </div>
  );
}
