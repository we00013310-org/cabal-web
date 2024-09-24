import React from "react";
import { Link } from "react-router-dom";

export default function CreateRoomBanner({ className }) {
  return (
    <div
      className={`create-nft w-full lg:h-[140px] shadow lg:flex rounded-lg justify-between items-center  md:p-9 p-4 bg-white dark:bg-dark-white   border-b dark:border-[#FFAB3329] -2 border-pink mb-8 ${
        className || ""
      }`}
    >
      <div className="lg:w-8/12 w-full mb-4 lg:mb-0">
        <h1 className="text-base sm:text-xl text-dark-gray dark:text-white font-bold mb-1 sm:mb-2">
          Start Your Cabal
        </h1>
        <p className="text-xs md:text-sm text-thin-light-gray tracking-wide">
          Start your inner circle, grow your following and build gen wealth
          together
        </p>
      </div>
      <div className="flex-1 flex justify-center lg:justify-end">
        <div className="flex items-center space-x-5">
          <Link
            to="/create-cabal"
            className="px-8 py-2 flex justify-center items-center btn-gradient text-base rounded-full text-white"
          >
            CREATE A CABAL
          </Link>
        </div>
      </div>
    </div>
  );
}
