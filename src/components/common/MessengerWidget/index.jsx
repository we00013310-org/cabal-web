import React, { useState, useRef, useEffect } from "react";

import CloseIcon from "../../../assets/images/icons/close-ic.png";
import { getRandomMessages } from "../../../lib/generator";

const DATA = [
  {
    id: 1,
    text: "Welcome to our Room!",
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
    sender: {
      id: "u1",
      name: "Hunter",
      img: "https://imgcdn.stablediffusionweb.com/2024/5/28/1f61f844-f7fa-4e15-978a-650c14b126a9.jpg",
    },
  },
];

const MessengerWidget = () => {
  const [messages, setMessages] = useState(DATA);
  const [newMessage, setNewMessage] = useState("");
  const [toggled, setToggled] = useState(false);
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

    setTimeout(() => {
      const newMessages = getRandomMessages();

      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    }, 1000);
  };

  if (!toggled) {
    return (
      <div
        onClick={() => setToggled(true)}
        className="fixed z-10 bottom-10 right-10 cursor-pointer border-4 rounded-full border-dark-light-purple animate-heartBeat hover:animate-spin"
      >
        <div className="w-[100px]">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="1" cx="21" cy="21" r="21" fill="#5356FB" />
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
    <div className="fixed z-[1000] h-full w-full bottom-0 right-0 md:bottom-10 md:right-10 md:w-[360px] md:h-[500px] rounded-2xl p-8 flex flex-col justify-between bg-blue-100 dark:bg-dark-white  border-4 dark:border-[#5356fb29]">
      <div className="flex items-center justify-between pb-2 border-b dark:border-[#5356fb29]  border-light-purple mb-4">
        <h1 className="text-2xl font-bold text-dark-gray dark:text-white tracking-wide">
          Discussion
        </h1>
        <button
          onClick={() => {
            setToggled(false);
          }}
          className="text-dark-gray dark:text-white cursor-pointer w-[24px] h-[24px] hover:opacity-80"
        >
          <img src={CloseIcon} />
        </button>
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
              {message.text}
              {!message.sender.you && (
                <div className="border-t border-light-purple dark:border-[#5356fb29] mt-2 pt-2  flex items-center space-x-2 lg:mb-0 mr-2">
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
