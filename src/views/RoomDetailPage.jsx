import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import AssetsWidget from "../components/common/AssetsWidget";
import Layout from "../components/Partials/Layout";
import RoomValueStatics from "../components/common/RoomValueStatics";
import RoomDetailHeader from "../components/common/RoomDetailHeader";
import TokenRateStatics from "../components/common/TokenRateStatics";
import MessengerWidget from "../components/common/MessengerWidget";
import RoomHistory from "../components/common/RoomHistory";
import { fetchRoomDetail } from "../lib/apis/room";
import { fetchBalance } from "../lib/apis/balance";
import { useTokens } from "../hooks/useToken";

const RoomDetailPage = () => {
  const { id } = useParams();
  const listTokens = useTokens();

  const { data, isFetching } = useQuery({
    queryKey: ["rooms", id],
    queryFn: fetchRoomDetail(id),
  });
  const { data: balanceData, isFetching: fetchingBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: fetchBalance,
  });

  if (isFetching) {
    return null;
  }

  return (
    <Layout>
      <div className="shop-details-wrapper w-full">
        <div className="main-wrapper w-full">
          <RoomDetailHeader ownedKeys={balanceData?.keys?.[id]} data={data} />

          <div className="w-full h-[80vh] lg:h-[600px] mb-8">
            <MessengerWidget />
          </div>

          <div className="current_balance-bit-sell-widget w-full lg:h-[336px] mb-8">
            <div className="w-full h-full lg:flex lg:space-x-7">
              <div className="md:w-1/2 h-full mb-8 lg:mb-0">
                <AssetsWidget data={data} />
              </div>
              <div className="md:w-1/2 h-full mb-8 lg:mb-0">
                <AssetsWidget usePoint data={data} />
              </div>
            </div>
          </div>

          <RoomValueStatics data={data} />

          <div className="w-full h-full lg:flex lg:space-x-7 lg:h-[436px] mb-8">
            <div className="lg:w-1/2 h-full mb-8 lg:mb-0">
              <RoomHistory roomData={data} />
            </div>
            <div className="lg:w-1/2 h-full mb-8 lg:mb-0">
              <TokenRateStatics listTokens={listTokens.map((o) => o.id)} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoomDetailPage;
