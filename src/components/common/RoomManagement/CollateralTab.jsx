import { useState } from "react";
import { COLLATERAL_RATE } from "../../../lib/constants";

const CollateralTab = () => {
  const [amount, setAmount] = useState(0);

  return (
    <form className="w-full">
      <div className="field w-full mb-4 sm:mb-6">
        <div className="text-sm sm:text-base tracking-wide text-dark-gray dark:text-white">
          <p>
            <span className="text-thin-light-gray">
              Deposit your SOL to Spend more Room's SOL
            </span>
          </p>
        </div>
        <div className="input-field my-2 sm:mb-3">
          <div className="input-wrapper border border-light-purple dark:border-dark-light-purple h-[58px] w-full rounded-full flex items-center overflow-hidden">
            <input
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  setAmount(value);
                }
              }}
              placeholder="enter amount of SOL to deposit"
              className="input-field placeholder:text-base text-sm sm:text-base px-4 sm:px-6 text-dark-gray dark:text-white w-10/12 h-full bg-[#FAFAFA] dark:bg-[#11131F] focus:ring-0 focus:outline-none"
              type="number"
            />
            <div className="w-[1px] h-[33px] bg-light-purple dark:bg-dark-light-purple "></div>
            <div className="flex-1 flex h-full justify-center items-center bg-[#FAFAFA] dark:bg-[#11131F] ">
              <div className="flex space-x-1 items-center">
                <span className="text-dark-gray dark:text-white text-sm sm:text-base">
                  SOL
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm sm:text-base tracking-wide text-dark-gray dark:text-white">
          {!!+amount && (
            <p>
              <span className="text-thin-light-gray">SOL able to Spend:</span>{" "}
              <span>{amount * COLLATERAL_RATE} SOL</span>
            </p>
          )}
        </div>
      </div>
      <div className="w-full mt-4 pt-4 sm:mt-8 sm:pt-8 bg-red border-t border-light-purple dark:border-[#FFAB3329] flex justify-center items-center">
        <button
          type="submit"
          className="flex justify-center items-center btn-gradient text-base sm:text-xl rounded-full text-white py-2 w-40 sm:py-2.5"
        >
          Deposit
        </button>
      </div>
    </form>
  );
};

export default CollateralTab;
