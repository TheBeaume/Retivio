import React from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Bell,
  Megaphone,
  CalendarDays,
  Scissors,
  MessageCircle,
  BarChart3,
  ReceiptText,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
  },
  {
    id: "visit",
    label: "Visit Entry",
    icon: ClipboardList,
  },
  {
    id: "followups",
    label: "Follow-ups",
    icon: Bell,
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: Megaphone,
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: CalendarDays,
  },
  {
    id: "services",
    label: "Services",
    icon: Scissors,
  },
  {
    id: "whatsapp",
    label: "WhatsApp Booking",
    icon: MessageCircle,
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
  },
  {
    id: "billing",
    label: "Billing & Invoices",
    icon: ReceiptText,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

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
    <div className="fixed top-5 left-5 z-50 w-72 h-[calc(100vh-40px)] rounded-3xl bg-white border border-gray-200 shadow-2xl flex flex-col">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
            R
          </div>

          <div>

            <h2 className="text-2xl font-extrabold tracking-tight text-purple-700">
              RETIVIO
            </h2>

            <p className="text-sm text-gray-500">
              Business Operating System
            </p>

          </div>

        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-all"
        >
          <X size={20} />
        </button>

      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-4 py-5">

        <ul className="space-y-2">
{menuItems.map((item) => {
  const Icon = item.icon;

  return (
    <li
      key={item.id}
      onClick={() => {
        setActivePage(item.id);
        setSidebarOpen(false);
      }}
      className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 ${
        activePage === item.id
          ? "bg-purple-600 text-white shadow-lg"
          : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
      }`}
    >
      <Icon size={20} strokeWidth={2} />

      <span className="font-medium">
        {item.label}
      </span>
    </li>
  );
})}
        </ul>

      </div>
      {/* Bottom */}

      <div className="border-t border-gray-200 p-5">

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">

          <p className="text-xs uppercase tracking-wider text-gray-500">
            Logged in as
          </p>

          <h3 className="mt-2 text-lg font-semibold text-gray-900">
            Owner
          </h3>

          <p className="mt-1 text-sm text-purple-600">
            Retivio Pro
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white py-3 font-semibold transition-all duration-300"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;
