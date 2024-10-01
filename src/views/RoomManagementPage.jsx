import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Layout from "../components/Partials/Layout";
import RoomDetailHeader from "../components/common/RoomDetailHeader";
import { fetchRoomDetail } from "../lib/apis/room";
import { fetchBalance } from "../lib/apis/balance";
import { useTokens } from "../hooks/useToken";
import Loader from "../components/common/Loader";
import RoomManagementContent from "../components/common/Management/RoomManagementContent";

const RoomManagementPage = () => {
  const { id } = useParams();

  const { data, isFetching } = useQuery({
    queryKey: ["rooms", id],
    queryFn: fetchRoomDetail(id),
  });
  const { data: balanceData, isFetching: fetchingBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: fetchBalance,
  });

  if (isFetching) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="shop-details-wrapper w-full">
        <div className="main-wrapper w-full">
          <RoomDetailHeader
            onManagementPage
            ownedKeys={balanceData?.keys?.[id]}
            data={data}
          />
          <RoomManagementContent roomData={data} />
        </div>
      </div>
    </Layout>
  );
};

export default RoomManagementPage;
