import React, { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <div className="text-2xl font-extrabold text-purple-700">
          Retivio
        </div>

        <div className="hidden lg:flex items-center gap-8">

          <a href="#features" className="hover:text-purple-700">
            Features
          </a>

          <a href="#beta" className="hover:text-purple-700">
            Beta
          </a>

          <a href="/login" className="hover:text-purple-700">
            Login
          </a>

          <button className="bg-purple-700 text-white px-5 py-2 rounded-xl hover:bg-purple-800 transition">
            Join Free Beta
          </button>

        </div>

        <button
          className="lg:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t">

          <a
            href="#features"
            className="block px-6 py-4 border-b"
          >
            Features
          </a>

          <a
            href="#beta"
            className="block px-6 py-4 border-b"
          >
            Beta
          </a>

          <a
            href="/login"
            className="block px-6 py-4 border-b"
          >
            Login
          </a>

          <div className="p-4">
            <button className="w-full bg-purple-700 text-white py-3 rounded-xl">
              Join Free Beta
            </button>
          </div>

        </div>
      )}
    </nav>
  );
}
