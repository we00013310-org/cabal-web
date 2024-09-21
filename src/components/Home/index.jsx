import React from "react";

import Layout from "../Partials/Layout";
import TopSellerTopBuyerSliderSection from "./TopSellerTopBuyerSliderSection";
import RoomTable from "./RoomTable";
import CreateRoomBanner from "./CreateRoomBanner";
import JoinRoomBanner from "./JoinRoomBanner";

export default function Home() {
  return (
    <Layout>
      <div className="home-page-wrapper">
        <CreateRoomBanner className="mb-4" />
        <div className="text-3xl flex justify-center items-center mb-4 text-dark-gray dark:text-white">
          OR
        </div>
        <JoinRoomBanner />
        <RoomTable className="my-8" />
        <TopSellerTopBuyerSliderSection className="mb-8" />
      </div>
    </Layout>
  );
}
