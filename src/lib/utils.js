import { USER_KEY } from "./constants";

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

export const formatAddress = (publicKey) => {
  return publicKey?.toBase58();
};

export const generateName = (publicKey) => {
  return `User_${formatAddress(publicKey).slice(-5)}`;
};

export const formatUsersData = (users, publicKey) => {
  return users.map((o) => {
    return o.id === "u2"
      ? {
          ...o,
          name: publicKey ? generateName(publicKey) : o.name,
        }
      : o;
  });
};

export const getCurrentUsername = () => {
  return localStorage.getItem(USER_KEY) || "Nuoanunu";
};

export const setCurrentUsername = (publicKey) => {
  if (publicKey) {
    const name = generateName(publicKey);
    localStorage.setItem(USER_KEY, name);
    return name;
  }
};
