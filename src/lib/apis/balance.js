import { BALANCE_DATA_KEY } from "../constants";
import { updateRoomByBuyingKey } from "./room";
import BALANCE_DATA from "../../data/my_balance.json";

export const fetchBalance = async () => {
  const cached = localStorage.getItem(BALANCE_DATA_KEY);

  if (cached) {
    return JSON.parse(cached);
  }

  return BALANCE_DATA;
};

window.addBalance = async (amount = 100) => {
  const balanceData = await fetchBalance();
  if (balanceData) {
    const newData = {
      ...balanceData,
      balance: balanceData.balance + amount,
    };
    localStorage.setItem(BALANCE_DATA_KEY, JSON.stringify(newData));
    console.log(`Added ${amount}SOL to Balance!!!!`);
    console.log("Please Refresh the page to see!!!");
  }
};

export const buyKeyApi = (roomId, qtt, price) => async () => {
  const data = await fetchBalance();
  const amount = qtt * price;
  const newBalance = +(data.balance - +amount).toFixed(6);
  const newKeysBalance = (data.keys?.[roomId] || 0) + qtt;
  const tmp = {
    balance: newBalance,
    keys: {
      ...data.keys,
      [roomId]: newKeysBalance,
    },
  };

  localStorage.setItem(BALANCE_DATA_KEY, JSON.stringify(tmp));
  await updateRoomByBuyingKey(roomId, qtt, price);

  return tmp;
};
