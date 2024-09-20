import formatDistance from "date-fns/formatDistance";
import orderBy from "lodash/orderBy";

import { formatNumb } from "../../../lib/number";

const RoomHistory = ({ roomData }) => {
  let histories = orderBy(roomData?.histories || [], ["createdAt"], ["desc"]);

  return (
    <div className="recent-transaction-widget w-full h-full p-4 sm:p-8 rounded-2xl bg-white dark:bg-dark-white ">
      <div className="heading sm:flex items-center mb-2 sm:mb-4">
        <div>
          <h1 className="text-base sm:text-xl font-bold tracking-wide text-dark-gray dark:text-white">
            Room History
          </h1>
        </div>
      </div>
      <div className="content h-full">
        <ul className="max-h-full overflow-auto px-3">
          {histories.map((o) => {
            return (
              <li
                key={o.id}
                className="content-item py-2 sm:py-3 border-b border-light-purple dark:border-dark-light-purple hover:border-purple"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="name">
                      <p
                        dangerouslySetInnerHTML={{ __html: o.label }}
                        className="text-sm sm:text-base text-dark-gray dark:text-white font-medium mb-1"
                      />
                    </div>
                    <div className="time">
                      <p className="text-xs sm:text-sm text-thin-light-gray font-medium">
                        {formatDistance(new Date(o.createdAt), new Date())}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    {o.assets.map((a) => {
                      const value = formatNumb(a.amount);

                      return (
                        <p
                          key={o.id + a.id}
                          className={`animate-fade text-sm sm:text-base font-bold ${value >= 0 ? "text-light-green" : "text-light-red"}`}
                        >
                          {value >= 0 ? `+${value}` : value}{" "}
                          {a.id.toUpperCase()}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RoomHistory;
