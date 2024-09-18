export const formatNumb = (raw, fractions = 2) => {
  return +raw?.toFixed(fractions);
};
