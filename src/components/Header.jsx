import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import NotificationPanel from "./NotificationPanel";
function Header({ setSidebarOpen }) {
const navigate = useNavigate();
const [showNotifications, setShowNotifications] = useState(false);
const [notificationCount, setNotificationCount] = useState(3);
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

  // Today's Follow-ups
  const { data: todayFollowups } = await supabase
    .from("follow_ups")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "Pending")
    .eq("followup_date", today);

  if (todayFollowups?.length) count++;

  // Overdue Follow-ups
  const { data: overdue } = await supabase
    .from("follow_ups")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "Pending")
    .lt("followup_date", today);

  if (overdue?.length) count++;

  // Today's Appointments
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

        {/* Left */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-purple-900 p-2 rounded-lg mr-3"
          >
            
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
        {/* Right */}
        <div className="flex items-center gap-3">

<div className="relative">
  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="bg-white/10 backdrop-blur-md border border-white/20 w-10 h-10 rounded-xl hover:bg-white/20 transition"
  >
<div className="relative">
  

  {notificationCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
      {notificationCount}
    </span>
  )}
</div>   

  </button>

  {showNotifications && (
    <NotificationPanel
      onClose={() => setShowNotifications(false)}
    />
  )}
</div>
          <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2">
            
            <span className="ml-2">
              Owner
<button
  onClick={handleLogout}
  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold"
>
  Logout
</button> 

           </span>
          </div>

        </div>

      </div>
    </header>
  );
}

export default Header;
