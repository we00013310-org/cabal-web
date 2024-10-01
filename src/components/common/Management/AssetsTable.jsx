import { useState } from "react";
import { PER_PAGE } from "../../../lib/constants";
import AssetItem from "./AssetItem";

const AssetsTable = ({ tokensData, myAssets = false, onBuy }) => {
  const [nItems, setNItems] = useState(PER_PAGE);

  const handleShowMore = () => {
    setNItems((o) => o + PER_PAGE);
  };

  if (!tokensData?.length) {
    return <div className="w-full text-center">No Data</div>;
  }

  const hasShowMore = tokensData.length > nItems;

  return (
    <div className="relative w-full overflow-x-auto sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          {/* table heading */}
          <tr className="text-sm md:text-base text-thin-light-gray whitespace-nowrap px-2 border-b dark:border-[#FFAB3329]  default-border-bottom ">
            <td className="py-2 whitespace-nowrap">Token</td>
            <td className="py-2 whitespace-nowrap text-right">Price</td>
            {myAssets && (
              <td className="py-2 whitespace-nowrap text-right">Volume</td>
            )}
            <td className="py-2 whitespace-nowrap text-right">Market Cap</td>
            <td className="py-2 whitespace-nowrap text-right">1H%</td>
            <td className="py-2 whitespace-nowrap text-right">24H%</td>
            <td className="py-2 whitespace-nowrap text-right">7D%</td>
            <td className="py-2 whitespace-nowrap text-center">
              Audit Results
            </td>
            <td className="py-2 whitespace-nowrap text-right">Actions</td>
          </tr>
          {/* table heading end */}
          {tokensData?.slice(0, nItems)?.map((o) => {
            return (
              <AssetItem
                key={o.id}
                tokenData={o}
                myAsset={myAssets}
                onBuy={() => onBuy(o.id)}
              />
            );
          })}
        </tbody>
      </table>
      {!!hasShowMore && (
        <div className="w-full flex justify-center items-center mt-2">
          <button
            onClick={handleShowMore}
            className="w-full py-2 flex justify-center items-center hover:opacity-80 border border-dark-light-purple dark:border-purple text-base rounded-full text-dark-light-purple dark:text-purple"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetsTable;
