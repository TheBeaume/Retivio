import React from "react";

const chats = [
  {
    id: 1,
    name: "Priya Sharma",
    message: "I'd like to book a facial.",
    time: "10:25 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Neha Verma",
    message: "Thank you ❤️",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    name: "Anjali",
    message: "Hair spa available?",
    time: "Mon",
    unread: 1,
  },
];

export default function ChatSidebar() {
  return (
    <div className="bg-white rounded-2xl shadow h-full">

      <div className="p-4 border-b">

        <h2 className="text-xl font-bold">
          💬 Conversations
        </h2>

        <input
          type="text"
          placeholder="Search customer..."
          className="w-full mt-3 border rounded-lg p-2"
        />

      </div>

      <div>

        {chats.map((chat) => (

          <div
            key={chat.id}
            className="p-4 border-b hover:bg-green-50 cursor-pointer flex justify-between"
          >

            <div>

              <h3 className="font-semibold">
                {chat.name}
              </h3>

              <p className="text-sm text-gray-500">
                {chat.message}
              </p>

            </div>

            <div className="text-right">

              <p className="text-xs text-gray-500">
                {chat.time}
              </p>

              {chat.unread > 0 && (
                <span className="inline-block mt-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  {chat.unread}
                </span>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
