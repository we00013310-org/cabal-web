import { PRICE_STEP_RATE, START_PRICE } from "./constants";

export const getPrice = (data) => {
  return +(START_PRICE * (1 + data.members * PRICE_STEP_RATE)).toFixed(2);
};
