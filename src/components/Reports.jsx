import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Reports() {
const [filter, setFilter] = useState("today");
const [totalCustomers, setTotalCustomers] = useState(0);
useEffect(() => {
  loadCustomers();
}, []);

async function loadCustomers() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

const { data, error } = await supabase
  .from("customers")
  .select("*");

if (error) {
  console.log(error);
  return;
}

setTotalCustomers(data.length);
}
 return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
<div className="flex gap-2 overflow-x-auto pb-2">

  {[
    ["today", "Today"],
    ["week", "Week"],
    ["month", "Month"],
    ["year", "Year"],
  ].map(([value, label]) => (

    <button
      key={value}
      onClick={() => setFilter(value)}
className={`px-3 py-2 text-sm font-medium rounded-full whitespace-nowrap transition ${

        filter === value
          ? "bg-purple-600 text-white shadow"
          : "bg-white border border-gray-300 text-gray-700"
      }`}
    >
      {label}
    </button>

  ))}

</div>
        📈 Business Reports
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold mt-2">₹0</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Customers</p>
<h2 className="text-3xl font-bold mt-2">
  {totalCustomers}
</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Appointments</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Campaigns</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          📅 Appointment Summary
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Today's Appointments</h3>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Completed</h3>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Cancelled</h3>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>

        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          💇 Service Performance
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Service</th>
              <th className="text-left py-2">Bookings</th>
              <th className="text-left py-2">Revenue</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="py-2">Hair Spa</td>
              <td>0</td>
              <td>₹0</td>
            </tr>

            <tr>
              <td className="py-2">Facial</td>
              <td>0</td>
              <td>₹0</td>
            </tr>

            <tr>
              <td className="py-2">Hair Cut</td>
              <td>0</td>
              <td>₹0</td>
            </tr>
          </tbody>

        </table>

      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">

        <h2 className="text-xl font-bold">
          ✨ AI Insights
        </h2>

        <p className="mt-3 text-gray-700">
          AI insights will appear here after enough customer and appointment data is available.
        </p>

      </div>

    </div>
  );
}
