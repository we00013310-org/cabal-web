export const generateLeverageColor = (input, type = "accent") => {
  if (type === "accent") {
    if (input <= 10) {
      return "accent-green-500";
    }
    if (input <= 500) {
      return "accent-yellow-500";
    }

    return "accent-red-500";
  }

  if (input <= 10) {
    return "text-green-500";
  }
  if (input <= 500) {
    return "text-yellow-500";
  }

  return "text-red-500 animate-heartBeat";
};
