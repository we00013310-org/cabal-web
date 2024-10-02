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

  return "Kongy";
  // return `User_${formatAddress(publicKey).slice(-5)}`;
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

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

export const copyTextToClipboard = async (text) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return true;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Async: Could not copy text: ", err);
    return false;
  }
};
