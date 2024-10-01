import { formatNumb } from "../../../lib/number.js";
import Icons from "../../Helpers/Icons.jsx";

const AssetItem = ({ tokenData, onBuy, myAsset = false }) => {
  return (
    <tr className="animate-fade bg-white dark:bg-dark-white border-b dark:border-[#FFAB3329]">
      <td className="py-2 md:py-4 align-top">
        <div className="flex space-x-2 items-center">
          <div className="w-6 h-6 md:w-10 md:h-10 rounded-full overflow-hidden flex justify-center items-center">
            <img src={tokenData.img} alt="data" className="w-full h-full" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-sm md:text-base text-dark-gray dark:text-white">
              {tokenData.name}
            </h1>
            <span className="text-sm text-thin-light-gray">
              {tokenData.slug.toUpperCase()}
            </span>
          </div>
        </div>
      </td>
      <td className="text-right py-2 md:py-4 align-top">
        <h1 className="font-bold text-sm md:text-base text-dark-gray dark:text-white text-right ">
          ${tokenData.price}
        </h1>
      </td>
      {!!myAsset && (
        <td className=" py-2 md:py-4 align-top">
          <div className="flex flex-col items-end">
            <h1 className="font-bold text-sm md:text-base text-dark-gray dark:text-white">
              ${formatNumb(tokenData.volume * tokenData.price).toLocaleString()}
            </h1>
            <span className="text-sm text-thin-light-gray">
              {formatNumb(tokenData.volume).toLocaleString()}{" "}
              {tokenData.slug.toUpperCase()}
            </span>
          </div>
        </td>
      )}
      <td className="text-right py-2 md:py-4 align-top">
        <div className="flex flex-col">
          <h1 className="font-bold text-sm md:text-base text-dark-gray dark:text-white">
            ${tokenData.marketcap.toLocaleString()}
          </h1>
          <span className="text-sm text-thin-light-gray">
            {formatNumb(tokenData.marketcap / tokenData.price).toLocaleString()}{" "}
            {tokenData.slug.toUpperCase()}
          </span>
        </div>
      </td>
      <td className="text-right py-2 md:py-4 align-top">
        <span
          className={`text-sm md:text-base whitespace-nowrap ${tokenData["1h"] >= 0 ? "text-light-green" : "text-light-red"}`}
        >
          {tokenData["1h"]}%
        </span>
      </td>
      <td className="text-right py-2 md:py-4 align-top">
        <span
          className={`text-sm md:text-base whitespace-nowrap ${tokenData["24h"] >= 0 ? "text-light-green" : "text-light-red"}`}
        >
          {tokenData["24h"]}%
        </span>
      </td>
      <td className="text-right py-2 md:py-4 align-top">
        <span
          className={`text-sm md:text-base whitespace-nowrap ${tokenData["7d"] >= 0 ? "text-light-green" : "text-light-red"}`}
        >
          {tokenData["7d"]}%
        </span>
      </td>
      <td className="text-right py-2 md:py-4 align-top">
        <div className="flex justify-end">
          <div className="w-[80px] text-left">
            <div className="text-light-green mb-1">
              <Icons name="checked" />
            </div>
            <span className="text-xs sm:text-sm text-dark-gray dark:text-white">
              Mint Auth Disabled
            </span>
          </div>
          <div className="w-[80px] text-left">
            <div className="text-light-green mb-1">
              <Icons name="checked" />
            </div>
            <span className="text-xs sm:text-sm text-dark-gray dark:text-white">
              Freeze Auth Disabled
            </span>
          </div>
          <div className="w-[80px] text-left">
            <div className="text-light-green mb-1">
              <Icons name="checked" />
            </div>
            <span className="text-xs sm:text-sm text-dark-gray dark:text-white">
              Top 10 Holders
            </span>
          </div>
        </div>
      </td>
      <td className="text-right py-2 md:py-4 align-top">
        <button
          onClick={onBuy}
          className="w-full text-right text-xs sm:text-sm rounded-full text-white underline hover:text-purple"
        >
          Swap
        </button>
      </td>
    </tr>
  );
};

export default AssetItem;
