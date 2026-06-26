import React from "react";

function Sidebar({
  setSidebarOpen,
  activePage,
  setActivePage,
}) {
  return (
    <div className="fixed top-0 left-0 z-50 w-72 h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-purple-600 text-white p-6 shadow-2xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-2xl font-bold">
            Retivio
          </h2>

          <p className="text-sm text-purple-200">
            Salon Growth AI
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
      <ul className="space-y-3">

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
            setActivePage("sites");
            setSidebarOpen(false);
          }}
          className={`p-4 rounded-xl cursor-pointer transition-all dur>
            activePage === "sites"
              ? "bg-white/15 border-l-4 border-yellow-400 shadow-lg"
              : "hover:bg-white/10"
          }`}
        >
          🌐 Retivio Sites
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
      <div className="absolute bottom-6 left-6 right-6 border-t border-white/20 pt-4">

        <div className="bg-white/10 rounded-xl p-3">

          <p className="text-sm text-purple-200">
            Logged in as
          </p>

          <h3 className="font-bold mt-1">
            👤 Owner
          </h3>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;
