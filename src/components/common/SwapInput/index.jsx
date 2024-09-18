import { useState } from "react";
import { formatNumb } from "../../../lib/number";
import Icons from "../../Helpers/Icons";

const SwapInput = ({
  value,
  token,
  onChange,
  onChangeToken,
  listTokens = [],
  tokenBalance,
  output = false,
}) => {
  const [showOpt, setOpt] = useState(false);

  const triggerOpt = () => {
    setOpt(!showOpt);
  };

  return (
    <div className="rounded-xl bg-[#FAFAFA] dark:bg-[#11131F] border">
      <div className="flex justify-between items-center px-4 pt-2 mb-1">
        <span className="text-dark-gray dark:text-white">
          {output ? "To" : "From"}
        </span>
        <div className="flex items-center text-thin-light-gray">
          <span className="scale-50">
            <Icons name="wallet" />
          </span>
          <span className="font-thin underline">
            {formatNumb(tokenBalance, 6)}
          </span>
        </div>
      </div>
      <div className="rounded-xl bg-white dark:bg-dark-white p-4 flex items-center">
        <div
          onClick={triggerOpt}
          className="relative cursor-pointer space-x-2 p-4 rounded-lg bg-[#FAFAFA] dark:bg-[#11131F] flex items-center "
        >
          {!!showOpt && !!listTokens.length && (
            <>
              <div
                className="fixed top-0 left-0 w-full h-full"
                onClick={triggerOpt}
              />
              <div
                style={{ boxShadow: "0px 4px 87px 0px #0000002B" }}
                className="z-10 absolute left-0 top-0 w-[120px] bg-white dark:bg-dark-white rounded-[4px] p-3  animate-fade"
              >
                <ul className="flex flex-col space-y-4">
                  {listTokens.map((o) => {
                    return (
                      <li
                        key={o.id}
                        onClick={() => {
                          onChangeToken(o.id);
                        }}
                        className="hover:opacity-80 pb-2 text-thin-light-gray tracking-wide text-sm cursor-pointer flex items-center border-b border-light-purple dark:border-[#5356fb29]"
                      >
                        <img
                          className="rounded-full w-[20px] h-[20px] mr-2"
                          src={o.img}
                        />
                        {o.slug.toUpperCase()}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
          <img
            className="w-[32px] h-[32px] rounded-full overflow-hidden"
            src={token.img}
          />
          <span className="text-xl font-medium flex-1 text-center text-dark-gray dark:text-white">
            {token.slug.toUpperCase()}
          </span>
          <span>
            <svg
              width="13"
              height="6"
              viewBox="0 0 13 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                d="M12.7488 0.247421C12.6691 0.169022 12.5744 0.106794 12.4699 0.0643287C12.3655 0.0218632 12.2535 0 12.1403 0C12.0272 0 11.9152 0.0218632 11.8107 0.0643287C11.7063 0.106794 11.6115 0.169022 11.5318 0.247421L7.60655 4.07837C7.52688 4.15677 7.43209 4.219 7.32765 4.26146C7.22321 4.30393 7.11119 4.32579 6.99805 4.32579C6.88491 4.32579 6.77289 4.30393 6.66845 4.26146C6.56401 4.219 6.46922 4.15677 6.38954 4.07837L2.46427 0.247421C2.3846 0.169022 2.28981 0.106794 2.18537 0.0643287C2.08093 0.0218632 1.96891 0 1.85577 0C1.74263 0 1.63061 0.0218632 1.52617 0.0643287C1.42173 0.106794 1.32694 0.169022 1.24727 0.247421C1.08764 0.404141 0.998047 0.616141 0.998047 0.837119C0.998047 1.0581 1.08764 1.2701 1.24727 1.42682L5.18111 5.26613C5.6632 5.73605 6.31669 6 6.99805 6C7.6794 6 8.33289 5.73605 8.81498 5.26613L12.7488 1.42682C12.9084 1.2701 12.998 1.0581 12.998 0.837119C12.998 0.616141 12.9084 0.404141 12.7488 0.247421Z"
                fill="#374557"
              />
            </svg>
          </span>
        </div>
        <div className="flex-1 flex-col">
          <input
            className="w-full input-field placeholder:text-2xl text-2xl py-2 text-dark-gray text-right dark:text-white bg-transparent focus:ring-0 focus:outline-none"
            type="number"
            placeholder="Input"
            onChange={onChange}
            value={value}
          />
          <div className="text-right text-sm text-thin-light-gray">
            ~${formatNumb(token.price * value)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapInput;
