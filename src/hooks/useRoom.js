import TOKENS_DATA from "../data/token_data.json";

export const useRoomValue = (data, usePoint = false) => {
  const tokensData = TOKENS_DATA.datas;
  let result = 0;
  let assets = usePoint ? data?.pointAssets : data?.assets;

  assets?.forEach((o) => {
    const token = tokensData.find((i) => i.id === o.id);
    result += token.price * o.amount;
  });

  return +result.toFixed(4);
};
