import TOKENS_DATA from "../data/token_data.json";

export const useSolToken = () => {
  return TOKENS_DATA.datas.find((o) => o.id === "sol");
};

export const useToken = (id) => {
  return TOKENS_DATA.datas.find((o) => o.id === id);
};

export const useTokens = (exceptionalIds = []) => {
  return TOKENS_DATA.datas.filter((o) => !exceptionalIds.includes(o.id));
};
