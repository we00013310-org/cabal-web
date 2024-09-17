import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LocalImg from "../../lib/LocalImg";

export default function CollectionCard({ collectionData }) {
  return (
    <Link
      to="/my-collection/collection-item"
      className="item w-full block group"
    >
      <div className="bg-white dark:bg-dark-white   rounded-2xl p-5 section-shadow">
        <div className="flex flex-col justify-between">
          <div className="w-full mb-4">
            <div className="w-full h-[160px] overflow-hidden rounded-xl mb-[10px]">
              <LocalImg
                className="w-full h-full"
                alt="img"
                url={`${collectionData.images[0]}`}
              />
            </div>
            <div className="w-full h-[90px] flex space-x-[10px]">
              <div className="w-1/2 h-full rounded-lg overflow-hidden">
                <LocalImg
                  className="w-full h-full object-cover"
                  alt="img"
                  url={`${collectionData.images[1]}`}
                />
              </div>
              <div className="flex-1 h-full rounded-lg overflow-hidden">
                <LocalImg
                  className="w-full h-full object-cover"
                  alt="img"
                  url={`${collectionData.images[2]}`}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <LocalImg
                className="w-10 h-10 rounded-full"
                alt="img"
                url={`${collectionData.owner}`}
              />
              <p className="text-xl font-bold tracking-wide text-dark-gray dark:text-white group-hover:text-purple transition duration-300 ease-in-out">
                {collectionData.title}
              </p>
            </div>
            <p className="text-lg text-dark-gray dark:text-white tracking-wide">
              {collectionData.NumberOfItem}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

CollectionCard.propTypes = {
  collectionData: PropTypes.object,
};
