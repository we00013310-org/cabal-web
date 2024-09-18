import { formatNumb } from "./number";

export const findAmountB = (amountA, tokenA, tokenB) => {
  return formatNumb((amountA * 1.0 * tokenA.price) / tokenB.price, 10);
};
