import React, { useState } from "react";
import ConversationList from "./ConversationList";
import ChatScreen from "./ChatScreen";

export default function WhatsAppDashboard() {
const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Mobile View */}
<div className="block lg:hidden">
  {selectedChat ? (
    <ChatScreen />
  ) : (
    <ConversationList
      onSelectChat={setSelectedChat}
    />
  )}
</div>

      {/* Desktop View */}
      <div className="hidden lg:grid lg:grid-cols-3 h-screen">

        <div className="border-r">
<ConversationList
  onSelectChat={setSelectedChat}
/>
        </div>

        <div className="col-span-2">
          <ChatScreen />
        </div>

      </div>

    </div>
  );
}
