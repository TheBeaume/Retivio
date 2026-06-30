import React from "react";
import { Link } from "react-router-dom";

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

<div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">

  <div>
    <h3 className="text-white font-semibold mb-3">Company</h3>

    <div className="flex flex-col gap-2">
      <Link to="/about" className="hover:text-white">
        About Us
      </Link>

      <Link to="/contact" className="hover:text-white">
        Contact Us
      </Link>

      <Link to="/login" className="hover:text-white">
        Login
      </Link>
    </div>
  </div>

  <div>
    <h3 className="text-white font-semibold mb-3">Legal</h3>

    <div className="flex flex-col gap-2">
      <Link to="/privacy-policy" className="hover:text-white">
        Privacy Policy
      </Link>

      <Link to="/terms" className="hover:text-white">
        Terms & Conditions
      </Link>

      <Link to="/refund-policy" className="hover:text-white">
        Refund Policy
      </Link>
    </div>
  </div>

  <div>
    <h3 className="text-white font-semibold mb-3">Support</h3>

    <div className="flex flex-col gap-2">
      <a
        href="mailto:retivio.support@gmail.com"
        className="hover:text-white"
      >
        retivio.support@gmail.com
      </a>

      <a
        href="https://retivio.in"
        className="hover:text-white"
      >
        retivio.in
      </a>
    </div>
  </div>

        </div>

      </div>

<div className="text-center text-gray-500 mt-10 text-sm">
  <p>© 2026 Retivio. All rights reserved.</p>
  <p className="mt-2">
    Made with ❤️ in India for Salon Professionals.
  </p>
</div>
    </footer>
  );
}
