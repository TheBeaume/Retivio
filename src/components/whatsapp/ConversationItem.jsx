import React from "react";

export default function ConversationItem({
  name,
  message,
  time,
  unread,
  active,
  onClick,
}) {
  return (
    <div
  onClick={onClick}
      className={`flex items-center gap-3 p-4 border-b cursor-pointer ${
        active ? "bg-green-50" : "bg-white"
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
        👩
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">
          {name}
        </h3>

        <p className="text-sm text-gray-500 truncate">
          {message}
        </p>
      </div>

      <div className="text-right">

        <p className="text-xs text-gray-400">
          {time}
        </p>

        {unread > 0 && (
          <div className="mt-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs">
            {unread}
          </div>
        )}

      </div>
    </div>
  );
}
