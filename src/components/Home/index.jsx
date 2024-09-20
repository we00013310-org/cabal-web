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
        <RoomTable className="my-8" />
        <TopSellerTopBuyerSliderSection className="mb-8" />
      </div>
    </Layout>
  );
}
