import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10">

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-6">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Retivio
          </h2>

          <p className="mt-2 text-gray-400">
            Turn Visitors into Regular Customers.
          </p>

        </div>

        <div className="flex gap-8">

          <a href="#features" className="hover:text-white">
            Features
          </a>

          <a href="#beta" className="hover:text-white">
            Beta
          </a>

          <a href="/login" className="hover:text-white">
            Login
          </a>

        </div>

      </div>

      <p className="text-center text-gray-500 mt-8">
        © 2026 Retivio. All rights reserved.
      </p>

    </footer>
  );
}
