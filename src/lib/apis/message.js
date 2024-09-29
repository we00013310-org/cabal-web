import { v4 as uuidv4 } from "uuid";

import { MESSAGE_KEY } from "../constants";
import { getRandomUser } from "../generator";

import MESSAGE_DATAS from "../../data/messages.json";

export const fetchMessages = (roomId) => async () => {
  const cached = localStorage.getItem(MESSAGE_KEY + roomId);

  if (cached) {
    return JSON.parse(cached);
  }

  const rawData = MESSAGE_DATAS.datas;
  const user1 = getRandomUser();
  const user2 = getRandomUser();
  const formattedData = rawData.map((o) => {
    if (o.sender === "user1") {
      return {
        ...o,
        sender: user1,
      };
    }
    if (o.sender === "user2") {
      return {
        ...o,
        sender: user2,
      };
    }

    return o;
  });

  localStorage.setItem(MESSAGE_KEY + roomId, JSON.stringify(formattedData));

  return formattedData;
};

export const sendMessageApi = async ({ roomId, datas }) => {
  const messages = await fetchMessages(roomId)();
  const newMessages = [
    ...messages,
    ...datas.map((o) => {
      return {
        id: uuidv4(),
        ...o,
      };
    }),
  ];

  localStorage.setItem(MESSAGE_KEY + roomId, JSON.stringify(newMessages));

  return newMessages;
};
