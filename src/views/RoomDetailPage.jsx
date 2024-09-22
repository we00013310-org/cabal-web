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

  const roomPrice = data.price;
  const initValue = solToken.price * data.members * roomPrice;
  const profit = roomValue - initValue;

  return (
    <Layout>
      <div className="shop-details-wrapper w-full">
        <div className="main-wrapper w-full">
          <RoomDetailHeader ownedKeys={balanceData?.keys?.[id]} data={data} />
          <div className="current_balance-bit-sell-widget w-full lg:h-[336px] mb-8">
            <div className="w-full h-full lg:flex lg:space-x-7">
              <div className="w-full h-full mb-8 lg:mb-0">
                <AssetsWidget data={data} />
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
