import { toast } from "react-toastify";

import { copyTextToClipboard, getCurrentUsername } from "../../../lib/utils";
import { REF_ORIGIN } from "../../../lib/constants";
import RefImg from "../../../assets/images/ref-img.png";

const RefBanner = ({ className }) => {
  const username = getCurrentUsername();
  const url = `${REF_ORIGIN}/ref/${username.toLowerCase()}`;

  const handleCopy = async () => {
    await copyTextToClipboard(url);
    toast.success("Copied");
  };

  return (
    <div
      className={`w-full shadow rounded-lg justify-between items-center md:p-9 p-4 bg-white dark:bg-dark-white border-b dark:border-[#FFAB3329] -2 border-pink mb-8 ${
        className || ""
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center border-b border-thin-light-gray border-dashed pb-4">
        <h1 className="text-purple font-bold">Your referral link:</h1>
        <span
          onClick={handleCopy}
          className="text-sm sm:text-base sm:ml-2 cursor-pointer text-dark-gray dark:text-white hover:cursor-pointer hover:opacity-80"
        >
          {url}
        </span>
      </div>
      <div className="flex flex-col lg:flex-row py-4 space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="">
          <h1 className="pl-2 text-purple font-bold mb-2 text-base sm:text-xl">
            How referral work
          </h1>
          <p className="text-sm sm:text-base text-thin-light-gray">
            - Users will earn points when other users join using their invite
            link, and earn a cut off their invitee's invites.
          </p>
          <p className="text-sm sm:text-base text-thin-light-gray">
            - Direct Referrals get 100 Points + 10% Bonus Points from Referral
            Volume
          </p>
          <p className="text-sm sm:text-base text-thin-light-gray">
            - Indirect Referrals get 5% bonus Points
          </p>
        </div>
        <img
          className="w-[80%] max-w-[300px] mx-auto rounded-lg border-pink border sm:border-2"
          src={RefImg}
          alt="ref-img"
        />
      </div>
    </div>
  );
};

export default RefBanner;
