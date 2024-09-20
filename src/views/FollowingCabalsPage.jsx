import CreateRoomBanner from "../components/Home/CreateRoomBanner";
import RoomTable from "../components/Home/RoomTable";
import Layout from "../components/Partials/Layout";

const FollowingCabalsPage = () => {
  return (
    <Layout>
      <div className="mycollection-wrapper">
        <div className="main-wrapper">
          <div className="flex justify-between items-center mb-6">
            <div className="w-full">
              <h1 className="text-26 font-bold   text-dark-gray dark:text-white">
                <span>Following Cabals</span>
              </h1>
              <RoomTable
                hideHeader
                className="my-8"
                defaultFilter="Following"
              />

              <CreateRoomBanner />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FollowingCabalsPage;
