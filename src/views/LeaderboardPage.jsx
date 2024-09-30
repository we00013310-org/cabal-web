import LeaderTable from "../components/common/LeaderTable";
import CreateRoomBanner from "../components/Home/CreateRoomBanner";
import Layout from "../components/Partials/Layout";

const LeaderboardPage = () => {
  return (
    <Layout>
      <div>
        <div className="main-wrapper">
          <div className="flex justify-between items-center mb-6">
            <div className="w-full">
              <h1 className="text-26 font-bold text-dark-gray dark:text-white">
                <span>Leaderboard</span>
              </h1>
              <LeaderTable className="my-8" />

              <CreateRoomBanner />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
