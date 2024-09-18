import { v4 as uuidv4 } from "uuid";
import orderBy from "lodash/orderBy";

import { ROOMS_DATA_KEY } from "../constants";
import ROOMS_DATA from "../../data/room_data.json";

export const fetchRooms = async () => {
  const cached = localStorage.getItem(ROOMS_DATA_KEY);

  if (cached) {
    return JSON.parse(cached);
  }

  return ROOMS_DATA.datas;
};

export const fetchRoomDetail = (id) => async () => {
  const rooms = await fetchRooms();

  return rooms.find((o) => o.id === id);
};

export const createRoom = async (data) => {
  const newData = {
    ...data,
    id: uuidv4(),
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
  const rooms = await fetchRooms();
  const currentData = await fetchRoomDetail(roomId)();
  let newAssets = currentData.assets || [];
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

  const updatedRoom = {
    ...currentData,
    members: currentData.members + qtt,
    joined: true,
    assets: newAssets,
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
};

export const swapTokenApi =
  (roomId, tokenAId, amountA, tokenBId, amountB) => async () => {
    try {
      console.log("tesdadas");
      const rooms = await fetchRooms();
      const currentData = await fetchRoomDetail(roomId)();
      let newAssets = (currentData.assets || []).map((o) => {
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
      console.log("newAssets", newAssets);
      newAssets = newAssets.filter((o) => !!o.amount);
      const updatedRoom = {
        ...currentData,
        assets: newAssets,
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
      console.log("updatedRoom", updatedRoom);

      return updatedRoom;
    } catch (err) {
      console.log("err", err);
    }
  };
