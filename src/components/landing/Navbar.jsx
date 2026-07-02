import React, { useState } from "react";
import { Link } from "react-router-dom";

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

          <Link
            to="/login"
            className="hover:text-purple-700"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-purple-700 text-white px-5 py-2 rounded-xl hover:bg-purple-800 transition"
          >
            Start Free Beta
          </Link>

<Link
  to="/features"
  className="hover:text-purple-600"
>
  Features
</Link>
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

          <Link
            to="/login"
            className="block px-6 py-4 border-b"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

          <div className="p-4">
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center bg-purple-700 text-white py-3 rounded-xl"
            >
              Start Free Beta
            </Link>
          </div>

        </div>
      )}
    </nav>
  );
}
