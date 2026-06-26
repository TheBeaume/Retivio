import React from "react";

const messages = [
  {
    id: 1,
    sender: "customer",
    text: "Hi 👋",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "salon",
    text: "Welcome to The Beaume 🌸",
    time: "10:31 AM",
  },
  {
    id: 3,
    sender: "customer",
    text: "I want to book a Hair Spa.",
    time: "10:32 AM",
  },
];

export default function ChatWindow() {
  return (
    <div className="bg-[#efeae2] rounded-2xl shadow h-full flex flex-col">

      <div className="bg-green-700 text-white p-4 rounded-t-2xl">
        <h2 className="font-bold">Priya Sharma</h2>
        <p className="text-sm text-green-100">Online</p>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">

        {messages.map((msg) => (

          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "salon"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-xs rounded-2xl px-4 py-2 shadow ${
                msg.sender === "salon"
                  ? "bg-green-200"
                  : "bg-white"
              }`}
            >

              <p>{msg.text}</p>

              <p className="text-xs text-gray-500 mt-1 text-right">
                {msg.time}
              </p>

            </div>

          </div>

        ))}

      </div>

      <div className="border-t bg-white p-3 flex gap-2">

        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2"
        />

        <button className="bg-green-600 text-white px-5 rounded-full">
          ➤
        </button>

      </div>

    </div>
  );
}
