import TOKENS_DATA from "../data/token_data.json";

export const useSolToken = () => {
  return TOKENS_DATA.datas.find((o) => o.id === "sol");
};
