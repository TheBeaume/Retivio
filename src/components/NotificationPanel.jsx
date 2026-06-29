import React from "react";

export default function NotificationPanel({ onClose }) {
  return (
    <div className="absolute right-4 top-16 w-80 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">

      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-bold text-lg text-gray-800">
          🔔 Notifications
        </h2>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>

<div className="max-h-96 overflow-y-auto">

  <div className="p-4 border-b hover:bg-gray-50 text-gray-800 font-medium">
    📅 3 Follow-ups due today
  </div>

  <div className="p-4 border-b hover:bg-gray-50 text-gray-800 font-medium">
    ⏰ 2 Follow-ups overdue
  </div>

  <div className="p-4 border-b hover:bg-gray-50 text-gray-800 font-medium">
    👤 New customer added today
  </div>

  <div className="p-4 hover:bg-gray-50 text-gray-800 font-medium">
    💇 4 Appointments today
  </div>

      </div>

    </div>
  );
}
