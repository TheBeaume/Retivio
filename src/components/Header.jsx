import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, Menu, UserRound } from "lucide-react";
import NotificationPanel from "./NotificationPanel";

function Header({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    loadNotificationCount();
  }, []);

  async function loadNotificationCount() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const today = new Date().toISOString().split("T")[0];
    let count = 0;

    const { data: todayFollowups } = await supabase
      .from("follow_ups")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "Pending")
      .eq("followup_date", today);

    if (todayFollowups?.length) count++;

    const { data: overdue } = await supabase
      .from("follow_ups")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "Pending")
      .lt("followup_date", today);

    if (overdue?.length) count++;

    const { data: appointments } = await supabase
      .from("appointments")
      .select("id")
      .eq("user_id", user.id)
      .eq("appointment_date", today);

    if (appointments?.length) count++;

    setNotificationCount(count);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <header className="bg-gradient-to-r from-purple-900 via-purple-700 to-purple-600 text-white shadow-xl px-5 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-white/10 border border-white/10 w-11 h-11 rounded-xl mr-3 flex items-center justify-center hover:bg-white/20 transition"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          <div>
            <h1 className="text-2xl font-extrabold tracking-wide">
              Retivio
            </h1>

            <p className="text-[11px] text-purple-200 tracking-wide">
              Turn Visitors into Regular Customers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
              className="relative bg-white/10 backdrop-blur-md border border-white/20 w-11 h-11 rounded-xl hover:bg-white/20 transition flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell size={21} />

              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <NotificationPanel
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

          <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2">
            <UserRound size={19} />

            <span className="font-medium">
              Owner
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 w-9 h-9 rounded-lg flex items-center justify-center transition"
              aria-label="Logout"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
