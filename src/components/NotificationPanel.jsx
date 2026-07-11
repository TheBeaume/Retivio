import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function NotificationPanel({ onClose }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const today = new Date().toISOString().split("T")[0];

    const list = [];

    // Today's Follow-ups
    const { data: todayFollowups } = await supabase
      .from("follow_ups")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "Pending")
      .eq("followup_date", today);

    if (todayFollowups?.length) {
      list.push({
        icon: "",
        text: `${todayFollowups.length} Follow-ups due today`,
      });
    }

    // Overdue Follow-ups
    const { data: overdue } = await supabase
      .from("follow_ups")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "Pending")
      .lt("followup_date", today);

    if (overdue?.length) {
      list.push({
        icon: "⏰",
        text: `${overdue.length} Follow-ups overdue`,
      });
    }

    // Today's Appointments
    const { data: appointments } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id)
      .eq("appointment_date", today);

    if (appointments?.length) {
      list.push({
        icon: "",
        text: `${appointments.length} Appointments today`,
      });
    }

    if (list.length === 0) {
      list.push({
        icon: "",
        text: "No new notifications",
      });
    }

    setNotifications(list);
  }

  return (
    <div className="absolute right-4 top-16 w-80 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">

<div className="flex items-center justify-between p-4 border-b">
  <h2 className="font-bold text-lg text-gray-800">
     Notifications
  </h2>
        <button
          onClick={onClose}
className="text-xl text-gray-500 hover:text-black"
        >
          
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">

        {notifications.map((item, index) => (

          <div
            key={index}
className="p-4 border-b hover:bg-gray-50 text-gray-800 font-medium"
          >
            {item.icon} {item.text}
          </div>

        ))}

      </div>

    </div>
  );
}
