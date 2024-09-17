import React, { useRef } from "react";
import orderBy from "lodash/orderBy";

import Icons from "../Helpers/Icons";
import SliderCom from "../Helpers/SliderCom";
import UserListItem from "../common/UserListItem";

import USERS_DATA from "../../data/user_data.json";

export default function TopSellerTopBuyerSliderSection({ className }) {
  const settings = {
    arrows: false,
    dots: false,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sellSlider = useRef(null);
  const buySlider = useRef(null);

  const prevHandler = (value) => {
    if (value === "sell") {
      sellSlider.current.slickPrev();
    }
    if (value === "buy") {
      buySlider.current.slickPrev();
    }
  };

  const nextHandler = (value) => {
    if (value === "sell") {
      sellSlider.current.slickNext();
    }
    if (value === "buy") {
      buySlider.current.slickNext();
    }
  };

  const creatorsData = USERS_DATA.datas.filter((o) => !!+o.owned_rooms);
  const usersData = orderBy(
    USERS_DATA.datas.filter((o) => !!+o.joined_rooms),
    (o) => +o.joined_rooms,
    "desc"
  );

  return (
    <>
      <div className={`top-seller-top-buyer-wrapper ${className || ""}`}>
        <div className="top-seller-top-buyer-wrapper-container">
          <div className="main-wrapper w-full lg:flex xl:space-x-8 lg:space-x-4">
            <div className="lg:w-1/2 w-full mb-10 lg:mb-0 sm:p-8 p-4 bg-white dark:bg-dark-white   rounded-2xl section-shadow">
              <div className="heading flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-dark-gray dark:text-white tracking-wide">
                  Top Creators
                </h1>
                <div className="slider-btns flex space-x-4">
                  <button
                    onClick={() => nextHandler("sell")}
                    type="button"
                    className="transform rotate-180 text-dark-gray dark:text-white dark:opacity-25"
                  >
                    <Icons name="arrows" />
                  </button>
                  <button
                    onClick={() => prevHandler("sell")}
                    type="button"
                    className="transform rotate-180"
                  >
                    <div className="text-dark-gray dark:text-white">
                      <svg
                        width="11"
                        height="19"
                        viewBox="0 0 11 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.09766 1.1499L1.13307 9.11449L9.09766 17.0791"
                          stroke="url(#paint0_linear_220_23410)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_220_23410"
                            x1="9.09766"
                            y1="1.1499"
                            x2="-4.2474"
                            y2="7.96749"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F539F8" />
                            <stop offset="0.416763" stopColor="#C342F9" />
                            <stop offset="1" stopColor="#5356FB" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <div className="slider-content">
                <SliderCom settings={settings} selector={sellSlider}>
                  {creatorsData.map((o) => {
                    return <UserListItem key={o.id} data={o} />;
                  })}
                </SliderCom>
              </div>
            </div>
            <div className="flex-1 sm:p-8 p-4 bg-white dark:bg-dark-white   rounded-2xl section-shadow">
              <div className="heading flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-dark-gray dark:text-white tracking-wide">
                  Top Users
                </h1>
                <div className="slider-btns flex space-x-4">
                  <button
                    onClick={() => nextHandler("buy")}
                    type="button"
                    className="transform rotate-180 text-dark-gray dark:text-white dark:opacity-25"
                  >
                    <Icons name="arrows" />
                  </button>
                  <button
                    onClick={() => prevHandler("buy")}
                    type="button"
                    className="transform rotate-180"
                  >
                    <div className="  text-dark-gray dark:text-white">
                      <svg
                        width="11"
                        height="19"
                        viewBox="0 0 11 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.09766 1.1499L1.13307 9.11449L9.09766 17.0791"
                          stroke="url(#paint0_linear_220_23410)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_220_23410"
                            x1="9.09766"
                            y1="1.1499"
                            x2="-4.2474"
                            y2="7.96749"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F539F8" />
                            <stop offset="0.416763" stopColor="#C342F9" />
                            <stop offset="1" stopColor="#5356FB" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <div className="slider-content">
                <SliderCom settings={settings} selector={buySlider}>
                  {usersData.map((o) => {
                    return <UserListItem key={o.id} data={o} type="member" />;
                  })}
                </SliderCom>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
