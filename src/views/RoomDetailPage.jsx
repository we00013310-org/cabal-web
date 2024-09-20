import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import AssetsWidget from "../components/common/AssetsWidget";
import Layout from "../components/Partials/Layout";
import SellMonthStatics from "../components/Charts/SellMonthStatics";
import { useSolToken } from "../hooks/useToken";
import RoomValueStatics from "../components/common/RoomValueStatics";
import RoomDetailHeader from "../components/common/RoomDetailHeader";
import TokenRateStatics from "../components/common/TokenRateStatics";
import { fetchRoomDetail } from "../lib/apis/room";
import { fetchBalance } from "../lib/apis/balance";

import SolIcon from "../assets/images/tokens/sol.svg";
import { useRoomValue } from "../hooks/useRoom";
import MessengerWidget from "../components/common/MessengerWidget";
import RoomHistory from "../components/common/RoomHistory";
import { generateNumbersInRange } from "../lib/generator";

const RoomDetailPage = () => {
  const { id } = useParams();
  const solToken = useSolToken();

  const { data, isFetching } = useQuery({
    queryKey: ["rooms", id],
    queryFn: fetchRoomDetail(id),
  });
  const { data: balanceData, isFetching: fetchingBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: fetchBalance,
  });
  const roomValue = useRoomValue(data);

  if (isFetching) {
    return null;
  }

  const roomPrice = (data.maxSolAmount * 1.0) / data.max;
  const initValue = solToken.price * data.members * roomPrice;
  const profit = roomValue - initValue;

  return (
    <Layout>
      <div className="shop-details-wrapper w-full">
        <div className="main-wrapper w-full">
          <RoomDetailHeader ownedKeys={balanceData?.keys?.[id]} data={data} />
          <div className="current_balance-bit-sell-widget w-full lg:h-[436px] mb-8">
            <div className="w-full h-full lg:flex lg:space-x-7">
              <div className="lg:w-2/3 h-full mb-8 lg:mb-0">
                <AssetsWidget data={data} />
              </div>
              <div className="lg:w-1/3 h-full mb-8 lg:mb-0">
                <div className="sell-month-analytic-card w-full h-full rounded-xl overflow-hidden relative">
                  {/* heading */}
                  <div className="w-full py-2 sm:py-4 bg-gold flex pl-4 sm:pl-8 items-center">
                    <h1 className="text-base sm:text-xl font-medium tracking-wide text-white">
                      Keys bought this Month
                    </h1>
                  </div>
                  <div className="w-full h-full flex flex-col justify-between bg-white dark:bg-dark-white  ">
                    <div className="w-full px-2 pt-2 sm:px-5 sm:pt-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="text-xl sm:text-2xl font-bold text-dark-gray dark:text-white tracking-wide">
                            {+(data.members * roomPrice).toFixed(4)}
                          </p>
                          <img
                            className="w-4 h-4 sm:w-[24px] sm:h-[24px] ml-2"
                            src={SolIcon}
                          />
                        </div>
                        <p className="text-xl sm:text-2xl text-dark-gray dark:text-white tracking-wide">
                          ~
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-dark-gray dark:text-white tracking-wide">
                          {data.members} keys
                        </p>
                      </div>
                      <p className="text-xl sm:text-2xl text-thin-light-gray flex items-center mt-1">
                        <span>
                          ($
                          {
                            +(
                              solToken.price *
                              data.members *
                              roomPrice
                            ).toFixed(4)
                          }
                          )
                        </span>
                      </p>
                    </div>
                    <div className="month-statics w-full lg:h-[205px] h-full lg:absolute bottom-0 left-0 transform scale-[1.08]">
                      <SellMonthStatics
                        dataSet={generateNumbersInRange(30, 10)}
                        setRGBColor="rgba(242, 153, 74)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 h-full mb-8 lg:mb-0">
                <div className="sell-month-analytic-card w-full h-full rounded-xl overflow-hidden relative">
                  {/* heading */}
                  <div className="w-full py-2 sm:py-4 bg-pink flex pl-4 sm:pl-8 items-center">
                    <h1 className="text-base sm:text-xl font-medium tracking-wide text-white">
                      Profit took this Month
                    </h1>
                  </div>
                  <div className="w-full h-full flex flex-col justify-between bg-white dark:bg-dark-white  ">
                    <div className="w-full px-2 pt-2 sm:px-5 sm:pt-5">
                      <div className="flex items-center">
                        <p className="text-base sm:text-xl font-bold text-dark-gray dark:text-white tracking-wide">
                          {(profit / solToken.price).toFixed(2)}
                        </p>
                        <img
                          className="w-4 h-4 sm:w-[24px] sm:h-[24px] ml-2"
                          src={SolIcon}
                        />
                      </div>
                      <p className="text-thin-light-gray text-base sm:text-xl flex items-center">
                        <span
                          className={`ml-2 text-base sm:text-xl ${profit >= 0 ? "text-light-green" : "text-light-red"}`}
                        >
                          ${profit.toFixed(2)} (
                          {((profit * 100.0) / initValue).toFixed(2)}
                          %)
                        </span>
                      </p>
                    </div>
                    <div className="month-statics w-full lg:h-[205px] h-full lg:absolute bottom-0 left-0 transform scale-[1.08]">
                      <SellMonthStatics
                        dataSet={generateNumbersInRange(30, 10)}
                        setRGBColor="rgba(245, 57, 248, 1)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <RoomValueStatics data={data} />

          <div className="w-full h-full lg:flex lg:space-x-7 lg:h-[436px] mb-11">
            <div className="lg:w-1/2 h-full mb-8 lg:mb-0">
              <RoomHistory roomData={data} />
            </div>
            <div className="lg:w-1/2 h-full mb-8 lg:mb-0">
              <TokenRateStatics
                listTokens={data.assets?.map((o) => o.id)?.push("sol")}
              />
            </div>
          </div>

          <MessengerWidget />
        </div>
      </div>
    </Layout>
  );
};

export default RoomDetailPage;
