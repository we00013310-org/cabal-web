import React from "react";

import Layout from "../Partials/Layout";
import TopSellerTopBuyerSliderSection from "./TopSellerTopBuyerSliderSection";
import RoomTable from "./RoomTable";
import CreateRoomBanner from "./CreateRoomBanner";

export default function Home() {
  return (
    <Layout>
      <div className="home-page-wrapper">
        <CreateRoomBanner />
        <RoomTable className="mb-10" />
        <TopSellerTopBuyerSliderSection className="mb-10" />
      </div>
    </Layout>
  );
}
