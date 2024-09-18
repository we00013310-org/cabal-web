import CreateRoomBanner from "../components/Home/CreateRoomBanner";
import RoomTable from "../components/Home/RoomTable";
import Layout from "../components/Partials/Layout";

const MyCabalsPage = () => {
  return (
    <Layout>
      <div className="mycollection-wrapper">
        <div className="main-wrapper">
          <div className="flex justify-between items-center mb-6">
            <div className="w-full">
              <h1 className="text-26 font-bold   text-dark-gray dark:text-white">
                <span>My Cabals</span>
              </h1>
              <RoomTable hideHeader className="my-10" defaultFilter="Owned" />

              <CreateRoomBanner />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyCabalsPage;
