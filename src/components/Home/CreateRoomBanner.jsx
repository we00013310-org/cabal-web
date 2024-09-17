import React from "react";
import { Link } from "react-router-dom";

export default function CreateRoomBanner({ className }) {
  return (
    <div
      className={`create-nft w-full lg:h-[140px] shadow lg:flex rounded-lg justify-between items-center  md:p-9 p-4 bg-white dark:bg-dark-white   border-b dark:border-[#5356fb29] -2 border-pink mb-10 ${
        className || ""
      }`}
    >
      <div className="lg:w-8/12 w-full mb-8 lg:mb-0">
        <h1 className="text-2xl text-dark-gray dark:text-white font-bold mb-2">
          Create your own ROOM
        </h1>
        <p className="text-base text-thin-light-gray tracking-wide">
          Leading members to go richer
        </p>
      </div>
      <div className="flex-1 flex lg:justify-end">
        <div className="flex items-center space-x-5">
          <Link
            to="/create-room"
            className="w-40 h-11 flex justify-center items-center btn-gradient text-base rounded-full text-white"
          >
            Create New Room
          </Link>
        </div>
      </div>
    </div>
  );
}
