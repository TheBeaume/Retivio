import React, { useEffect, useState } from "react";

export default function DashboardPreview() {
const [stats, setStats] = useState({
  customers: 0,
  appointments: 0,
  revenue: 0,
  followups: 0,
});

useEffect(() => {
const target = {
  customers: 248,
  appointments: 12,
  revenue: 48500,
  followups: 8,
};

  const timer = setInterval(() => {
    setStats((prev) => ({
      customers: prev.customers < target.customers ? prev.customers + 4 : target.customers,
      appointments: prev.appointments < target.appointments ? prev.appointments + 1 : target.appointments,
      revenue: prev.revenue < target.revenue ? prev.revenue + 800 : target.revenue,
      followups: prev.followups < target.followups ? prev.followups + 1 : target.followups,
    }));
  }, 25);

  return () => clearInterval(timer);
}, []);
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-purple-600 font-semibold uppercase tracking-widest">
            Dashboard
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold mt-3">
            Everything You Need.
            <br />
            One Beautiful Dashboard.
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Manage your salon effortlessly with customers,
            appointments, follow-ups, revenue and business insights
            in one place.
          </p>

        </div>

        <div className="mt-16 bg-gradient-to-br from-purple-700 to-purple-900 rounded-3xl p-8 shadow-2xl">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="bg-white rounded-2xl p-6">
              <p className="text-gray-500">👥 Customers</p>
              <h3 className="text-4xl font-bold mt-3">{stats.customers}</h3>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <p className="text-gray-500">📅 Appointments</p>
              <h3 className="text-4xl font-bold mt-3">{stats.appointments}</h3>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <p className="text-gray-500">💰 Revenue</p>
              <h3 className="text-4xl font-bold mt-3">₹{stats.revenue.toLocaleString()}</h3>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <p className="text-gray-500">🔔 Follow-ups</p>
              <h3 className="text-4xl font-bold mt-3">{stats.followups}</h3>
            </div>

          </div>

          <div className="mt-8 bg-white rounded-2xl p-8">

            <h3 className="font-bold text-xl">
              Business Growth
            </h3>

            <div className="mt-8 flex items-end gap-4 h-48">

              <div className="bg-purple-500 w-full rounded-t-xl h-20"></div>
              <div className="bg-purple-500 w-full rounded-t-xl h-28"></div>
              <div className="bg-purple-500 w-full rounded-t-xl h-24"></div>
              <div className="bg-purple-500 w-full rounded-t-xl h-40"></div>
              <div className="bg-purple-500 w-full rounded-t-xl h-32"></div>
              <div className="bg-purple-500 w-full rounded-t-xl h-44"></div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
