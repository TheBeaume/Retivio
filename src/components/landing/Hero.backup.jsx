import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
<section
  aria-labelledby="hero-title"
  className="bg-gradient-to-br from-purple-900 via-purple-700 to-purple-800"
>
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
              🚀 Early Beta Now Open
            </span>

<h1
  id="hero-title"
  className="text-5xl lg:text-7xl font-extrabold leading-tight"
>
              Turn Visitors
              <br />
              into
              <br />
              Regular Customers
            </h1>

            <p className="mt-8 text-lg text-purple-100 max-w-xl">
              AI-powered Salon CRM to manage customers,
              appointments, follow-ups, WhatsApp booking and
              business growth from one beautiful dashboard.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <Link
                to="/signup"
                className="bg-white text-purple-700 font-bold px-8 py-4 rounded-xl hover:scale-105 transition text-center"
              >
                🚀 Start Free Beta
              </Link>

              <Link
                to="/login"
                className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-700 transition text-center"
              >
                🔑 Login
              </Link>

            </div>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">

            <h2 className="text-black text-2xl font-bold mb-6">
              Dashboard Preview
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-blue-50 rounded-2xl p-5">
                <p className="text-gray-500">Customers</p>
                <h3 className="text-3xl font-bold text-black">248</h3>
              </div>

              <div className="bg-green-50 rounded-2xl p-5">
                <p className="text-gray-500">Revenue</p>
                <h3 className="text-3xl font-bold text-black">₹48.5K</h3>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-5">
                <p className="text-gray-500">Appointments</p>
                <h3 className="text-3xl font-bold text-black">12</h3>
              </div>

              <div className="bg-red-50 rounded-2xl p-5">
                <p className="text-gray-500">Follow-ups</p>
                <h3 className="text-3xl font-bold text-black">8</h3>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
