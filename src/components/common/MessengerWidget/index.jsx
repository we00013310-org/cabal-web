import React, { useState, useRef, useEffect } from "react";

import {
  generateBotMessages,
  getRandomMessages,
  getRandomUser,
} from "../../../lib/generator";

const user1 = getRandomUser();
const user2 = getRandomUser();

const DATA = [
  {
    id: 1,
    text: "Welcome to our Cabal!",
    sender: {
      id: "u2",
      name: "Nuoanunu",
      img: "https://img.craiyon.com/2024-09-16/ugXwRKGiRhWpvM-T-1TyxA.webp",
      you: true,
    },
  },
  {
    id: 2,
    text: "Hello, nice to meet you",
    sender: user1,
  },
  {
    id: 3,
    text: "I've been looking at BTC's chart and I think we should go long.",
    sender: user1,
  },
  {
    id: 4,
    text: "Why do you think now is a good time to long BTC?",
    sender: {
      id: "u2",
      name: "Nuoanunu",
      img: "https://img.craiyon.com/2024-09-16/ugXwRKGiRhWpvM-T-1TyxA.webp",
      you: true,
    },
  },
  {
    id: 5,
    text: "Check out the RSI on the 4-hour chart. It's been oversold for a while, and we're seeing bullish divergence.",
    sender: user1,
  },
  {
    id: 6,
    text: "Also, the moving averages just crossed — the 50-day MA broke above the 200-day MA. That golden cross usually signals a strong uptrend is coming.",
    sender: user1,
  },
  {
    id: 7,
    text: "Makes sense. I'll prepare the long command.",
    sender: {
      id: "u2",
      name: "Nuoanunu",
      img: "https://img.craiyon.com/2024-09-16/ugXwRKGiRhWpvM-T-1TyxA.webp",
      you: true,
    },
  },
  {
    id: 8,
    text: "Yeah, I agree with Hunter. The indicators are pointing towards a bullish trend. It’s a good time to take a long position.",
    sender: user2,
  },
];

const MESSAGE_DELAY = 1000;

const MessengerWidget = () => {
  const [messages, setMessages] = useState(DATA);
  const [newMessage, setNewMessage] = useState("");
  const [toggled, setToggled] = useState(true);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (toggled && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages?.length, toggled]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        text: newMessage,
        sender: {
          id: "u2",
          name: "Nuoanunu",
          img: "https://img.craiyon.com/2024-09-16/ugXwRKGiRhWpvM-T-1TyxA.webp",
          you: true,
        },
      },
    ]);

    setNewMessage(""); // Clear the input after sending a message
    if (!triggerBotMessage(newMessage)) {
      setTimeout(() => {
        const newMessages = getRandomMessages();

        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      }, MESSAGE_DELAY);
    }
  };

  const triggerBotMessage = (newMessage) => {
    const messages = generateBotMessages(newMessage);

    messages?.forEach((o, i) => {
      setTimeout(
        () => {
          setMessages((prevMessages) => [...prevMessages, o]);
        },
        (i + 1) * MESSAGE_DELAY
      );
    });

    return messages;
  };

  if (!toggled) {
    return (
      <div
        onClick={() => setToggled(true)}
        className="fixed z-10 bottom-10 right-10 cursor-pointer border-4 rounded-full border-dark-light-purple animate-heartBeat hover:animate-spin"
      >
        <div className="w-14 md:w-24">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="1" cx="21" cy="21" r="21" fill="#FFAB33" />
            <path
              d="M28.0478 17.231L22.7595 22.4236C21.5318 23.6262 19.5445 23.6262 18.3169 22.4236L13.0289 17.231C13.02 17.3284 13 17.4166 13 17.5135V24.9158C13.0021 26.6183 14.4073 27.9982 16.1411 28.0002H24.9359C26.6697 27.9982 28.0749 26.6183 28.0769 24.9158V17.5135C28.0766 17.4166 28.0566 17.3284 28.0478 17.231Z"
              fill="white"
            />
            <path
              d="M21.9595 21.0064L28.0769 15.4629C27.4742 14.5575 26.3936 14.0028 25.2264 14H15.8503C14.6833 14.0028 13.6024 14.5575 13 15.4629L19.1174 21.0064C19.9029 21.7158 21.1737 21.7158 21.9595 21.0064Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-2xl p-8 flex flex-col justify-between bg-blue-100 dark:bg-dark-white border-4 dark:border-purple">
      <div className="flex items-center justify-between pb-2 border-b dark:border-[#FFAB3329]  border-light-purple mb-4">
        <h1 className="text-2xl font-bold text-dark-gray dark:text-white tracking-wide animate-heartBeat">
          Discussion
        </h1>
      </div>
      {/* Chat Window */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto rounded-md px-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`animate-fade flex mb-2 ${
              message.sender.you ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 max-w-[80%] rounded-lg ${
                message.sender.you
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <pre className="whitespace-break-spaces">{message.text}</pre>
              {!message.sender.you && (
                <div className="border-t border-light-purple dark:border-[#FFAB3329] mt-2 pt-2  flex items-center space-x-2 lg:mb-0 mr-2">
                  <div className="w-4 h-4 flex justify-center items-center rounded-full overflow-hidden">
                    <img src={message.sender.img} alt="" />
                  </div>
                  <div>
                    <p className="text-xs tracking-wide font-bold antise text-purple">
                      {message.sender.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessengerWidget;
