import React from "react";

export default function ChatScreen({ selectedChat }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#efeae2]">

      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center justify-between">

        <div>
<h2 className="font-bold text-lg">
  👩 {selectedChat?.name || "Customer"}
</h2>
          <p className="text-sm text-green-100">
{selectedChat ? "Online" : "No customer selected"}
          </p>
        </div>

        <button className="text-2xl">
          ℹ️
        </button>

      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">

        <div className="flex justify-start">
          <div className="bg-white rounded-2xl px-4 py-3 max-w-[80%] shadow">
            Hi 👋
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-green-200 rounded-2xl px-4 py-3 max-w-[80%] shadow">
            Welcome to The Beaume 🌸
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-white rounded-2xl px-4 py-3 max-w-[80%] shadow">
            I want to book a Hair Spa.
          </div>
        </div>

      </div>

      {/* AI Suggestions */}
      <div className="px-3 py-2 bg-white border-t">

        <p className="text-xs text-gray-500 mb-2">
          🤖 AI Suggestions
        </p>

        <div className="flex gap-2 overflow-x-auto">

          <button className="bg-green-100 px-3 py-2 rounded-full whitespace-nowrap text-sm">
            📅 Book Appointment
          </button>

          <button className="bg-blue-100 px-3 py-2 rounded-full whitespace-nowrap text-sm">
            💰 Recommend Service
          </button>

          <button className="bg-yellow-100 px-3 py-2 rounded-full whitespace-nowrap text-sm">
            ⭐ Ask for Review
          </button>

        </div>

      </div>

      {/* Message Box */}
      <div className="bg-white border-t p-3 flex items-center gap-2">

        <button className="text-xl">😊</button>

        <input
          className="flex-1 border rounded-full px-4 py-2"
          placeholder="Type a message..."
        />

        <button className="bg-green-600 text-white rounded-full px-4 py-2">
          ➤
        </button>

      </div>

    </div>
  );
}
