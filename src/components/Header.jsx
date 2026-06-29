import React from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function Header({ setSidebarOpen }) {
const navigate = useNavigate();

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
            ☰
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

          <button className="bg-white/10 backdrop-blur-md border border-white/20 w-10 h-10 rounded-xl hover:bg-white/20 transition">
            🔔
          </button>

          <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2">
            👤
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
