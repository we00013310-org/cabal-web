import { v4 as uuidv4 } from "uuid";
import orderBy from "lodash/orderBy";

import { ROOMS_DATA_KEY } from "../constants";
import ROOMS_DATA from "../../data/room_data.json";
import TOKENS_DATA from "../../data/token_data.json";
// import { getRandomCabals } from "../generator";
import { getPrice } from "../room";
import { getCurrentUsername } from "../utils";
import { sendMessageApi } from "./message";
import { generateNumbersInRange } from "../generator";
import { formatNumb } from "../number";

export const fetchRooms = async () => {
  const cached = localStorage.getItem(ROOMS_DATA_KEY);

  if (cached) {
    const data = JSON.parse(cached);
    return data.map((o) => {
      const tokensData = TOKENS_DATA.datas;
      let result = 0;

      o?.assets?.forEach((o) => {
        const token = tokensData.find((i) => i.id === o.id);
        result += token.price * o.amount;
      });
      return {
        ...o,
        value: +result.toFixed(4),
        price: getPrice(o),
        owner: o.owned ? getCurrentUsername() : o.owner,
      };
    });
  }

  const rawData = ROOMS_DATA.datas;
  const tmp = [...rawData].map((o) => {
    const tokensData = TOKENS_DATA.datas;
    let result = 0;

    o?.assets?.forEach((o) => {
      const token = tokensData.find((i) => i.id === o.id);
      result += token.price * o.amount;
    });
    return {
      ...o,
      value: +result.toFixed(4),
      price: getPrice(o),
      owner: o.owned ? getCurrentUsername() : o.owner,
    };
  });
  localStorage.setItem(ROOMS_DATA_KEY, JSON.stringify(tmp));

  return tmp;
};

export const fetchRoomDetail = (id) => async () => {
  const rooms = await fetchRooms();

  return rooms.find((o) => o.id === id);
};

export const createRoom = async (data) => {
  const newData = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().getTime(),
    pointAssets: [
      {
        id: "sol",
        amount: 10,
      },
    ],
  };
  const roomsData = await fetchRooms();

  roomsData.push(newData);
  localStorage.setItem(
    ROOMS_DATA_KEY,
    JSON.stringify(orderBy(roomsData, ["value"], ["desc"]))
  );

  return newData;
};

export const updateRoomByBuyingKey = async (roomId, qtt, price) => {
  try {
    const rooms = await fetchRooms();
    const currentData = await fetchRoomDetail(roomId)();
    let newAssets = currentData.assets || [];
    const histories = currentData.histories || [];
    const amount = qtt * price;

    if (newAssets.find((o) => o.id === "sol")) {
      newAssets = newAssets.map((o) => {
        if (o.id === "sol") {
          return {
            id: "sol",
            amount: o.amount + amount,
          };
        }
        return o;
      });
    } else {
      newAssets.push({
        id: "sol",
        amount,
      });
    }

    histories.push({
      id: uuidv4(),
      createdAt: new Date().getTime(),
      label: `<span class="text-purple">${getCurrentUsername()}</span> ${amount >= 0 ? "bought" : "sold"} a Key`,
      assets: [
        {
          id: "sol",
          amount: amount,
        },
      ],
    });

    const updatedRoom = {
      ...currentData,
      members: currentData.members + qtt,
      joined: true,
      assets: newAssets,
      histories,
    };

    const newRooms = rooms.map((o) => {
      if (o.id !== updatedRoom.id) {
        return o;
      }

      return updatedRoom;
    });
    localStorage.setItem(
      ROOMS_DATA_KEY,
      JSON.stringify(orderBy(newRooms, ["value"], ["desc"]))
    );

    return updatedRoom;
  } catch (err) {
    console.log("err", err);
  }
};

export const swapTokenApi =
  (roomId, tokenAId, amountA, tokenBId, amountB, usePoint = false) =>
  async () => {
    try {
      const rooms = await fetchRooms();
      const currentData = await fetchRoomDetail(roomId)();
      const histories = currentData.histories || [];
      const currentAssets =
        (usePoint ? currentData.pointAssets : currentData.assets) || [];
      let newAssets = currentAssets.map((o) => {
        if (o.id === tokenAId) {
          return {
            ...o,
            amount: +o.amount - amountA,
          };
        }
        if (o.id === tokenBId) {
          return {
            ...o,
            amount: +o.amount + amountB,
          };
        }
        return o;
      });
      if (!newAssets.find((o) => o.id === tokenBId)) {
        newAssets.push({
          id: tokenBId,
          amount: amountB,
        });
      }

      newAssets = newAssets.filter((o) => !!o.amount);

      const tmpAId = tokenAId === "sol" && usePoint ? "pSol" : tokenAId;
      const tmpBId = tokenBId === "sol" && usePoint ? "pSol" : tokenBId;
      histories.push({
        id: uuidv4(),
        createdAt: new Date().getTime(),
        label: `Swapped <span class="text-purple">${tmpAId.toUpperCase()}</span> to <span class="text-purple">${tmpBId.toUpperCase()}</span>`,
        assets: [
          {
            id: tmpAId,
            amount: -amountA,
          },
          {
            id: tmpBId,
            amount: amountB,
          },
        ],
      });
      const updatedRoom = usePoint
        ? {
            ...currentData,
            pointAssets: newAssets,
            histories,
          }
        : {
            ...currentData,
            assets: newAssets,
            histories,
          };

      const newRooms = rooms.map((o) => {
        if (o.id !== updatedRoom.id) {
          return o;
        }

        return updatedRoom;
      });

      localStorage.setItem(
        ROOMS_DATA_KEY,
        JSON.stringify(orderBy(newRooms, ["value"], ["desc"]))
      );

      if (!usePoint) {
        const pnl = formatNumb(generateNumbersInRange(2, 10, 200)[0]);
        await sendMessageApi({
          roomId,
          datas: [
            {
              id: uuidv4(),
              sender: "command",
              text:
                tokenBId === "sol"
                  ? `Position closed: ${amountA} ${tokenAId.toUpperCase()} for ${amountB} ${tokenBId.toUpperCase()}. ${pnl > 0 ? `<b class='text-light-green'>PNL +${pnl}%</b>` : `<b class="text-light-red">PNL ${pnl}%</b>`}`
                  : `Position opened: ${amountA} ${tokenAId.toUpperCase()} for ${amountB} ${tokenBId.toUpperCase()}`,
            },
          ],
        });
      }

      return updatedRoom;
    } catch (err) {
      console.log("err", err);
    }
  };
