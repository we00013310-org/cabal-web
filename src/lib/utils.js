import { USER_KEY, LOGIN_KEY } from "./constants";

const checkLogined = () => {
  return localStorage.getItem(LOGIN_KEY);
};

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
  if (!publicKey) {
    return;
  }
  return `User_${formatAddress(publicKey).slice(-5)}`;
};

export const formatUsersData = (users, publicKey) => {
  const logined = checkLogined();

  return users.map((o) => {
    return o.id === "u2"
      ? {
          ...o,
          name: logined ? generateName(publicKey) || o.name : o.name,
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
