import { useParams } from "react-router-dom";

import AssetsWidget from "../components/common/AssetsWidget";
import Layout from "../components/Partials/Layout";
import SellMonthStatics from "../components/Charts/SellMonthStatics";
import { useSolToken } from "../hooks/useToken";
import RoomValueStatics from "../components/common/RoomValueStatics";

import SolIcon from "../assets/images/tokens/sol.svg";

import ROOMS_DATA from "../data/room_data.json";
import RoomDetailHeader from "../components/common/RoomDetailHeader";
import TokenRateStatics from "../components/common/TokenRateStatics";

const RoomDetailPage = () => {
  let { id } = useParams();
  const data = ROOMS_DATA.datas.find((o) => o.id == id);
  const roomPrice = (data.maxSolAmount * 1.0) / data.max;
  const solToken = useSolToken();
  const initValue = solToken.price * data.members * roomPrice;
  const profit = data.value - initValue;

  return (
    <Layout>
      <div className="shop-details-wrapper w-full">
        <div className="main-wrapper w-full">
          <RoomDetailHeader data={data} />
          <div className="current_balance-bit-sell-widget w-full lg:h-[436px] mb-11">
            <div className="w-full h-full lg:flex lg:space-x-7">
              <div className="lg:w-2/3 h-full mb-10 lg:mb-0">
                <AssetsWidget data={data} />
              </div>
              <div className="lg:w-1/3 h-full mb-10 lg:mb-0">
                <div className="sell-month-analytic-card w-full h-full rounded-xl overflow-hidden relative">
                  {/* heading */}
                  <div className="w-full h-16 bg-gold flex pl-7 items-center">
                    <h1 className="text-xl font-medium tracking-wide text-white">
                      Keys bought this Month
                    </h1>
                  </div>
                  <div className="w-full h-full flex flex-col justify-between bg-white dark:bg-dark-white  ">
                    <div className="w-full px-5 pt-5">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <p className="text-26 font-bold text-dark-gray dark:text-white tracking-wide">
                            {data.members * roomPrice}
                          </p>
                          <img
                            className="w-[24px] h-[24px] ml-2"
                            src={SolIcon}
                          />
                        </div>
                        <p className="text-26 font-bold text-dark-gray dark:text-white tracking-wide">
                          -
                        </p>
                        <p className="text-26 font-bold text-dark-gray dark:text-white tracking-wide">
                          {data.members} key(s)
                        </p>
                      </div>
                      <p className="text-thin-light-gray text-18 flex items-center mt-1">
                        <span>
                          (${solToken.price * data.members * roomPrice})
                        </span>
                      </p>
                    </div>
                    <div className="month-statics w-full lg:h-[205px] h-full lg:absolute bottom-0 left-0 transform scale-[1.08]">
                      <SellMonthStatics setRGBColor="rgba(242, 153, 74)" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3 h-full mb-10 lg:mb-0">
                <div className="sell-month-analytic-card w-full h-full rounded-xl overflow-hidden relative">
                  {/* heading */}
                  <div className="w-full h-16 bg-pink flex pl-7 items-center">
                    <h1 className="text-xl font-medium tracking-wide text-white">
                      Profit took this Month
                    </h1>
                  </div>
                  <div className="w-full h-full flex flex-col justify-between bg-white dark:bg-dark-white  ">
                    <div className="w-full px-5 pt-5">
                      <div className="flex items-center">
                        <p className="text-26 font-bold text-dark-gray dark:text-white tracking-wide">
                          {(profit / solToken.price).toFixed(2)}
                        </p>
                        <img className="w-[24px] h-[24px] ml-2" src={SolIcon} />
                      </div>
                      <p className="text-thin-light-gray text-18 flex items-center">
                        <span
                          className={`ml-2 text-sm ${profit >= 0 ? "text-light-green" : "text-light-red"}`}
                        >
                          ${profit.toFixed(2)} (
                          {((profit * 100.0) / initValue).toFixed(2)}
                          %)
                        </span>
                      </p>
                    </div>
                    <div className="month-statics w-full lg:h-[205px] h-full lg:absolute bottom-0 left-0 transform scale-[1.08]">
                      <SellMonthStatics setRGBColor="rgba(245, 57, 248, 1)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <RoomValueStatics data={data} />

          <TokenRateStatics
            listTokens={data.assets?.map((o) => o.id)?.push("sol")}
          />
        </div>
      </div>
    </Layout>
  );
};

export default RoomDetailPage;
