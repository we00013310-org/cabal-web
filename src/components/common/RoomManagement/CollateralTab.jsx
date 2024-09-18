import { useState } from "react";
import { COLLATERAL_RATE } from "../../../lib/constants";

const CollateralTab = () => {
  const [amount, setAmount] = useState(0);

  return (
    <form className="w-full">
      <div className="field w-full mb-6">
        <div className="text-base tracking-wide text-dark-gray dark:text-white">
          <p>
            <span className="text-thin-light-gray">
              Deposit your SOL to Spend more Room's SOL
            </span>
          </p>
        </div>
        <div className="input-field my-2 mb-3">
          <div className="input-wrapper border border-light-purple dark:border-[#5356fb29]  w-full rounded-[50px] h-[58px] flex items-center overflow-hidden">
            <input
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  setAmount(value);
                }
              }}
              placeholder="enter amount of SOL to deposit"
              className="input-field placeholder:text-base text-bese px-6 text-dark-gray dark:text-white w-10/12 h-full bg-[#FAFAFA] dark:bg-[#11131F]  focus:ring-0 focus:outline-none"
              type="number"
            />
            <div className="w-[1px] h-[33px] bg-light-purple dark:bg-dark-light-purple "></div>
            <div className="flex-1 flex h-full justify-center items-center bg-[#FAFAFA] dark:bg-[#11131F] ">
              <div className="flex space-x-1 items-center">
                <span className="text-dark-gray dark:text-white text-base">
                  SOL
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-base tracking-wide text-dark-gray dark:text-white">
          {!!+amount && (
            <p>
              <span className="text-thin-light-gray">SOL able to Spend:</span>{" "}
              <span className="text-xl">{amount * COLLATERAL_RATE} SOL</span>
            </p>
          )}
        </div>
      </div>
      <div className="w-full mt-8 pt-8 bg-red border-t border-light-purple dark:border-[#5356fb29] flex justify-center items-center">
        <button
          type="submit"
          className="h-[46px] w-[200px] flex justify-center items-center btn-gradient text-xl rounded-full text-white"
        >
          Deposit
        </button>
      </div>
    </form>
  );
};

export default CollateralTab;
