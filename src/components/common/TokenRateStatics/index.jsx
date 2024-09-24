import { useState } from "react";

import TOKENS_DATA from "../../../data/token_data.json";
import { generateNumbersInRange } from "../../../lib/generator";
import MiniLineChart from "../../Charts/MiniLineChart";

const TokenRateStatics = ({ listTokens = [] }) => {
  const [rateStaticsDropdown, setRateStaticsDropdown] = useState(false);
  const tokensData = TOKENS_DATA.datas.filter((o) => {
    if (!listTokens?.length) {
      return true;
    }

    return listTokens?.includes(o.id);
  });
  const [selectedRate, setSelectedRate] = useState(tokensData[0].id);
  const [filterRateStatics, setFilterRateStatics] = useState(
    generateNumbersInRange(4, tokensData[0].price, 20)
  );
  const rateDataSetHandler = (value) => {
    setSelectedRate(value);
    const newToken = TOKENS_DATA.datas.find((o) => o.id === value);
    setFilterRateStatics(generateNumbersInRange(4, newToken.price, 20));
    setRateStaticsDropdown(!filterRateStatics);
  };
  const selectedToken = TOKENS_DATA.datas.find((o) => o.id === selectedRate);
  const gap = (selectedToken.price - filterRateStatics[0]).toFixed(2);

  return (
    <div className="chart-two bg-white dark:bg-dark-white h-full rounded-2xl p-4 sm:p-8 2xl:w-[268px] w-full 2xl:mb-10 flex flex-col justify-between">
      <div>
        <div className="heading sm:flex items-center mb-2 sm:mb-4">
          <div>
            <h1 className="text-base sm:text-xl font-bold tracking-wide text-dark-gray dark:text-white">
              Market Feed
            </h1>
          </div>
        </div>
        {/* dropdown heading */}
        <div className="flex space-x-2 items-center mb-2 sm:mb-5 relative cursor-pointer">
          {/* icon area */}
          <div className="icon-area">
            <img className="w-4 h-4 sm:w-6 sm:h-6" src={selectedToken.img} />
          </div>
          {/* heading */}
          <div
            className="heading flex space-x-2 items-center"
            onClick={() => setRateStaticsDropdown(!rateStaticsDropdown)}
          >
            <span className="text-base sm:text-xl font-bold text-dark-gray dark:text-white">
              {selectedToken.slug.toUpperCase()} rate
            </span>
            <span className="text-[#374557] dark:text-thin-light-gray">
              <svg
                width="14"
                height="7"
                viewBox="0 0 14 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path d="M13.7092 0.288658C13.6163 0.197192 13.5057 0.124593 13.3839 0.0750502C13.262 0.025507 13.1313 0 12.9993 0C12.8673 0 12.7366 0.025507 12.6148 0.0750502C12.4929 0.124593 12.3824 0.197192 12.2894 0.288658L7.70992 4.7581C7.61697 4.84956 7.50638 4.92216 7.38453 4.9717C7.26269 5.02125 7.132 5.04676 7 5.04676C6.868 5.04676 6.73731 5.02125 6.61547 4.9717C6.49362 4.92216 6.38303 4.84956 6.29008 4.7581L1.7106 0.288658C1.61765 0.197192 1.50706 0.124593 1.38521 0.0750502C1.26337 0.025507 1.13268 0 1.00068 0C0.868682 0 0.737991 0.025507 0.616146 0.0750502C0.4943 0.124593 0.383712 0.197192 0.29076 0.288658C0.10453 0.471497 0 0.718831 0 0.976639C0 1.23445 0.10453 1.48178 0.29076 1.66462L4.88024 6.14382C5.44268 6.69206 6.20509 7 7 7C7.79491 7 8.55732 6.69206 9.11976 6.14382L13.7092 1.66462C13.8955 1.48178 14 1.23445 14 0.976639C14 0.718831 13.8955 0.471497 13.7092 0.288658Z" />
              </svg>
            </span>
          </div>
          <div
            className={`rate-statics-dropdown w-[164px] h-[170px] bg-white dark:bg-dark-white   py-3 px-5 absolute  rounded ${
              rateStaticsDropdown ? "active" : ""
            }`}
            style={{ boxShadow: "0px 4px 87px 0px #0000002B" }}
          >
            <ul className="flex flex-col justify-between h-full">
              {tokensData.map((o) => {
                return (
                  <li
                    key={o.id}
                    className="flex space-x-2.5 items-center cursor-pointer"
                    onClick={() => rateDataSetHandler(o.id)}
                  >
                    <span>
                      <img className="w-4 h-4" src={o.img} />
                    </span>
                    <span className="text-thin-light-gray text-sm sm:text-base tracking-wide">
                      {o.slug.toUpperCase()} Rate
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* details Money */}
        <div className="money-details mb-5">
          <p className="text-xl font-bold   text-dark-gray dark:text-white">
            ${selectedToken.price}
          </p>
          <p
            className={`text-sm ${gap >= 0 ? "text-light-green" : "text-light-red"}`}
          >
            {gap} ({((Math.abs(gap) * 100.0) / filterRateStatics[0]).toFixed(2)}
            %)
          </p>
        </div>
      </div>
      <div className="miniLineChart">
        <MiniLineChart
          height="122px"
          datasets={filterRateStatics}
          label="Price ($)"
          color={selectedToken.color}
        />
      </div>
    </div>
  );
};

export default TokenRateStatics;
