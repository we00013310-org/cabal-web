import TOKENS_DATA from "../data/token_data.json";

export const useRoomValue = (data) => {
  const tokensData = TOKENS_DATA.datas;
  let result = 0;

  data?.assets?.forEach((o) => {
    const token = tokensData.find((i) => i.id === o.id);
    result += token.price * o.amount;
  });

  return +result.toFixed(4);
};
