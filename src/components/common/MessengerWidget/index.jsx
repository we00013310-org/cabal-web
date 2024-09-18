import React, { useState } from "react";

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
  };

  return (
    <div className="bg-white dark:bg-dark-white rounded-2xl p-8 2xl:w-[268px] w-full h-full 2xl:mb-10 flex flex-col justify-between">
      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto rounded-md">
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
