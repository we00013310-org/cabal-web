import React from "react";

import Layout from "../Partials/Layout";
import TopSellerTopBuyerSliderSection from "./TopSellerTopBuyerSliderSection";
import RoomTable from "./RoomTable";
import CreateRoomBanner from "./CreateRoomBanner";

export default function Home() {
  return (
    <Layout>
      <div className="home-page-wrapper">
        <CreateRoomBanner className="mb-4" />
        <TopSellerTopBuyerSliderSection className="my-8" />
        <RoomTable explore className="my-8" />
      </div>
    </Layout>
  );
}
