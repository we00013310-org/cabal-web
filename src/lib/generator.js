import USERS_DATA from "../data/user_data.json";
import { v4 as uuidv4 } from "uuid";

// number, value, % range
export function generateNumbersInRange(x, y, z = 20) {
  const result = [];

  // Calculate the minimum and maximum boundaries based on the percentage z
  const range = y * (z / 100);
  const min = y - range;
  const max = y + range;

  // Generate x random numbers within the range
  for (let i = 1; i < x; i++) {
    // Generate a random number between min and max
    const randomNumber = Math.random() * (max - min) + min;
    result.push(randomNumber);
  }

  result.push(y);

  return result;
}

export const getRandomUser = () => {
  const users = USERS_DATA.datas.filter((o) => o.id !== "u2" && !o.bot);

  return users[Math.floor(Math.random() * users.length)];
};

export const getBot = () => {
  return USERS_DATA.datas.find((o) => o.bot);
};

export function getRandomMessages() {
  // Helper function to generate random text
  const getRandomText = () => {
    const texts = [
      "Any news, guys?",
      "Hey, why don't we buy BTC? It’s going to pump soon!",
      "ETH is on fire lately; we better grab some before it skyrockets.",
      "I’m hearing a lot about SOL, it's making big moves—might be a good time to jump in!",
      "People are saying BNB is going to double by the end of the month.",
      "I’ve heard whispers that SHIB is gearing up for another pump.",
      "MANA just got a lot of attention from institutional investors—price might spike soon.",
      "Let’s load up on GRT; I think it’s undervalued with all the recent activity.",
      "ZIL is getting a lot of buzz lately; we should get in before it’s too late.",
      "Rumor has it that LINK is about to partner with a major tech company.",
      "I'm telling you, DOGE always surprises—let’s ride the next wave!",
    ];

    return texts[Math.floor(Math.random() * texts.length)];
  };

  // Generate a random number between 0 and 3 (inclusive)
  const numberOfMessages = Math.ceil(Math.random() * 4);

  // Generate the array of messages
  const messages = Array.from({ length: numberOfMessages }, () => ({
    id: uuidv4(),
    text: getRandomText(),
    sender: getRandomUser(),
  }));

  return messages;
}

const getRandomCabalName = () => {
  const groupNames = [
    "Pump Chasers",
    "HODL Army",
    "Moonshot Crew",
    "Whale Watchers",
    "FOMO Squad",
    "Crypto DeGens",
    "To The Mooners",
    "Diamond Hands Only",
    "Altcoin Avengers",
    "Bag Holders Anonymous",
    "Lambo Dreamers",
    "Pump & Chill",
    "Dip Divers",
    "Satoshi Seekers",
    "Shill Masters",
    "DeFi Degenerates",
    "Whale Whisperers",
    "Crypto Cult",
    "Shill Society",
    "Token Tossers",
  ];

  return groupNames[Math.floor(Math.random() * groupNames.length)];
};

const generateCabalAuto = () => {
  const owner = getRandomUser();

  return {
    id: uuidv4(),
    name: getRandomCabalName(),
    owner: owner.name,
    owned: owner.id === "u2", // Nuoanunu
    joined: false,
    createdAt: new Date().getTime(),
    "24h": 0,
    description: "",
    members: 0,
    value: 0,
    assets: [],
    pointAssets: [
      {
        id: "sol",
        amount: 10,
      },
    ],
  };
};

export const getRandomCabals = (number) => {
  const messages = Array.from({ length: number }, generateCabalAuto);

  return messages;
};

export const generateBotMessages = (newMessage) => {
  const triggerSentence = "anything interesting today";
  if (newMessage?.toLowerCase().includes(triggerSentence)) {
    const user1 = getRandomUser();
    const user2 = getRandomUser();
    const bot = getBot();

    return [
      {
        id: uuidv4(),
        text: "been looking at Solana Breakpoint projects",
        sender: user1,
      },
      {
        id: uuidv4(),
        text: "oh yea i heard that was the hypest event at token",
        sender: user2,
      },
      {
        id: uuidv4(),
        text: "def was, i think sanctum is a dark horse. They launched creator coins and cloud card at breakpoint, $CLOUD been on an up only trend",
        sender: user1,
      },
      {
        id: uuidv4(),
        text: "CLoUDKc4Ane7HeQcPpE3YHnznRxhMimJ4MyaUqyHFzAu",
        sender: user2,
      },
      {
        id: uuidv4(),
        text: `Solana @ Meteora Dlmm
💰 USD: $0.4419
💎 FDV: $442.0M
💦 Liq: $16.3M 🐡[x54.2]
📊 Vol: $1M 🕰 Age: 2mo
⛰ ATH: $458.2M [1d ago]
📉 1H: -0.4% ⋅ $17.8K 🅑 11 🅢 28
🖨 Mint: ✅ ⋅ LP: 🔥
🧰 More: ch ⋅ bm 🐦 x ⋅ web

CLoUDKc4Ane7HeQcPpE3YHnznRxhMimJ4MyaUqyHFzAu
MAE⋅BAN⋅BNK⋅SHU⋅PEP⋅DEX⋅BRD
TRO⋅STB⋅PHO⋅BLX⋅EXP⋅RUG⋅TW
💥 NEW: Fastest sniper & trading - MevX on SOL`,
        sender: bot,
      },
      {
        id: uuidv4(),
        text: "actually $CLOUD looks like a really good set up, im deploying. you get bonus if we profit on this! Lets go! 🚀",
        sender: {
          id: "u2",
          name: "Nuoanunu",
          img: "https://img.craiyon.com/2024-09-16/ugXwRKGiRhWpvM-T-1TyxA.webp",
          you: true,
        },
      },
    ];
  }
};

export const generateTonWalletAddress = () => {
  // Prefix for TON addresses (usually starts with 'EQ')
  const prefix = "EQ";

  // Generate a random string of 48 characters (mimicking the address body)
  const randomPart = [...Array(48)]
    .map(() => Math.floor(Math.random() * 36).toString(36))
    .join("")
    .toUpperCase();

  // Combine the prefix with the random part to form the address
  const tonWalletAddress = prefix + randomPart;

  return tonWalletAddress;
};
