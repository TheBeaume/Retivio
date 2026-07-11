import React from "react";
import { Link } from "react-router-dom";

export default function BetaCTA() {
  return (
    <section
      id="beta"
      className="py-24 bg-gradient-to-r from-purple-900 via-purple-700 to-purple-600 text-white"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">

        <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm">
          🚀 Early Access
        </span>

        <h2 className="text-4xl lg:text-5xl font-extrabold mt-6">
          Start Your Free Beta Today
        </h2>

        <p className="mt-6 text-lg text-purple-100 max-w-2xl mx-auto">
          Join the first group of salon owners using Retivio.
          Your feedback will help us build the best Salon CRM.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/signup"
            className="bg-white text-purple-700 font-bold px-8 py-4 rounded-xl hover:scale-105 transition"
          >
            🚀 Start Free Beta
          </Link>

          <Link
            to="/login"
            className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-700 transition"
          >
            Login
          </Link>

        </div>

      </div>
    </section>
  );
}
