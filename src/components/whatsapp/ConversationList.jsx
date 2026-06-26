import React from "react";
import ConversationItem from "./ConversationItem";

const conversations = [
  {
    id: 1,
    name: "Priya Sharma",
    message: "I'd like to book a facial.",
    time: "10:25",
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
    message: "Hair Spa available?",
    time: "Mon",
    unread: 1,
  },
  {
    id: 4,
    name: "Riya",
    message: "Bridal package price?",
    time: "Sun",
    unread: 0,
  },
];

export default function ConversationList({ onSelectChat }) {
  return (
    <div className="bg-white min-h-screen">

      <div className="sticky top-0 bg-green-600 text-white p-4">

        <h1 className="text-2xl font-bold">
          💬 WhatsApp Booking
        </h1>

        <input
          type="text"
          placeholder="Search customer..."
          className="w-full mt-4 rounded-xl px-4 py-3 text-black outline-none"
        />

      </div>

{conversations.map((chat, index) => (
<ConversationItem 
 key={chat.id}
  {...chat}
  active={index === 0}
  onClick={() => onSelectChat(chat)}
/>
      ))}

    </div>
  );
}
