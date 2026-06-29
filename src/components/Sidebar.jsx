import React from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
function Sidebar({
  setSidebarOpen,
  activePage,
  setActivePage,
}) {
const navigate = useNavigate();

async function handleLogout() {
  await supabase.auth.signOut();
  navigate("/login");
}
  return (
    <div className="fixed top-0 left-0 z-50 w-64 h-screen overflow-y-auto bg-gradient-to-b from-purple-900 via-purple-700 to-purple-600 text-white p-6 shadow-2xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-2xl font-bold">
            Retivio
          </h2>

          <p className="text-sm text-purple-200">
Turn Visitors
into Regular Customers
          </p>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-xl transition"
        >
          ✕
        </button>

      </div>

      {/* Menu */}
<ul className="space-y-3 pb-6">
        <li
          onClick={() => {
            setActivePage("dashboard");
            setSidebarOpen(false);
          }}
          className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
            activePage === "dashboard"
              ? "bg-white/15 border-l-4 border-yellow-400 shadow-lg"
              : "hover:bg-white/10"
          }`}
        >
          📊 Dashboard
        </li>

        <li
          onClick={() => {
            setActivePage("customers");
            setSidebarOpen(false);
          }}
          className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
            activePage === "customers"
              ? "bg-white/15 border-l-4 border-yellow-400 shadow-lg"
              : "hover:bg-white/10"
          }`}
        >
          👥 Customers
        </li>

        <li
          onClick={() => {
            setActivePage("visit");
            setSidebarOpen(false);
          }}
          className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
            activePage === "visit"
              ? "bg-white/15 border-l-4 border-yellow-400 shadow-lg"
              : "hover:bg-white/10"
          }`}
        >
          📝 Visit Entry
        </li>

<li
  onClick={() => {
    setActivePage("followups");
    setSidebarOpen(false);
  }}
  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
    activePage === "followups"
      ? "bg-white/15 border-l-4 border-yellow-400 shadow-lg"
      : "hover:bg-white/10"
  }`}
>
  🔔 Follow-ups
</li>
        <li
          onClick={() => {
            setActivePage("campaigns");
            setSidebarOpen(false);
          }}
          className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
            activePage === "campaigns"
              ? "bg-white/15 border-l-4 border-yellow-400 shadow-lg"
              : "hover:bg-white/10"
          }`}
        >
          📢 Campaigns
        </li>

<li
  onClick={() => {
    setActivePage("appointments");
    setSidebarOpen(false);
  }}
  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
    activePage === "appointments"
      ? "bg-white/15 border-l-4 border-yellow-400 shadow-lg"
      : "hover:bg-white/10"
  }`}
>
  📅 Appointments
</li>
<li
  onClick={() => {
    setActivePage("whatsapp");
    setSidebarOpen(false);
  }}
  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
    activePage === "whatsapp"
      ? "bg-white/15 border-l-4 border-yellow-400 shadow-lg"
      : "hover:bg-white/10"
  }`}
>
  💬 WhatsApp Booking
</li>
        <li
          onClick={() => {
            setActivePage("reports");
            setSidebarOpen(false);
          }}
          className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
            activePage === "reports"
              ? "bg-white/15 border-l-4 border-yellow-400 shadow-lg"
              : "hover:bg-white/10"
          }`}

        >
          📈 Reports
        </li>

        <li
          onClick={() => {
            setActivePage("settings");
            setSidebarOpen(false);
          }}
          className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
            activePage === "settings"
              ? "bg-white/15 border-l-4 border-yellow-400 shadow-lg"
              : "hover:bg-white/10"
          }`}
        >
          ⚙️ Settings
        </li>

      </ul>

      {/* Bottom */}
   <div  className="mt-8 border-t border-white/20 pt-4">
        <div className="bg-white/10 rounded-xl p-3">

          <p className="text-sm text-purple-200">
            Logged in as
          </p>

          <h3 className="font-bold mt-1">
            👤 Owner
          </h3>

        </div>
<button
  onClick={handleLogout}
  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
>
  🚪 Logout
</button>
      </div>

    </div>
  );
}

export default Sidebar;
