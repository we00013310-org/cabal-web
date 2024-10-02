import { toast } from "react-toastify";
import { copyTextToClipboard, getCurrentUsername } from "../../../lib/utils";

const RefBanner = ({ className }) => {
  const username = getCurrentUsername();
  const url = `${window.location.origin}/ref/${username.toLowerCase()}`;

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
      <div className="py-4">
        <h1 className="text-purple font-bold mb-2 text-base sm:text-xl">
          How referral work
        </h1>
        <p className="text-sm sm:text-base text-thin-light-gray">
          - Users will earn points when their invites earn points and when their
          invites earn points.
        </p>
        <p className="text-sm sm:text-base text-thin-light-gray">
          - Direct Referral invites get 100 Burst Points +10% bonus Burst Points
          from referral.
        </p>
        <p className="text-sm sm:text-base text-thin-light-gray">
          - Indirect Referral invites get 5% bonus Burst Points.
        </p>
      </div>
    </div>
  );
};

export default RefBanner;
