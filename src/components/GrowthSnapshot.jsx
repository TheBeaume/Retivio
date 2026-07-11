import React from "react";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";

function GrowthSnapshot({ customers }) {
  const settings = useBusinessSettings();

  const totalCustomers = customers.length;

  const totalVisits = customers.reduce(
    (sum, c) => sum + (Number(c.visits) || 0),
    0
  );

  const totalRevenue = customers.reduce(
    (sum, c) => sum + (Number(c.totalSpend) || 0),
    0
  );

  const avgSpend =
    totalCustomers > 0
      ? totalRevenue / totalCustomers
      : 0;

  const repeatRate =
    totalCustomers > 0
      ? Math.round(
          (customers.filter(
            (c) => (c.visits || 0) > 1
          ).length /
            totalCustomers) *
            100
        )
      : 0;

  const stats = [
    {
      icon: "",
      title: "Customers",
      value: totalCustomers,
      color: "bg-blue-50 border-blue-100",
    },
    {
      icon: "",
      title: "Visits",
      value: totalVisits,
      color: "bg-green-50 border-green-100",
    },
    {
      icon: "",
      title: "Avg Spend",
      value: formatCurrency(
        avgSpend,
        settings?.currency_symbol,
        settings?.currency_position,
        settings?.decimal_places
      ),
      color: "bg-yellow-50 border-yellow-100",
    },
    {
      icon: "",
      title: "Repeat Rate",
      value: `${repeatRate}%`,
      color: "bg-purple-50 border-purple-100",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold">
          Growth Snapshot
        </h2>

        <span className="text-sm text-purple-600 font-medium">
          Business Overview
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {stats.map((stat, index) => (

          <div
            key={index}
            className={`${stat.color} border rounded-2xl p-5 hover:shadow-md transition`}
          >

            <div className="text-3xl">
              {stat.icon}
            </div>

            <p className="text-sm text-gray-500 mt-3">
              {stat.title}
            </p>

            <h3 className="text-2xl font-bold mt-1">
              {stat.value}
            </h3>

          </div>

        ))}

      </div>

    </div>
  );
}

export default GrowthSnapshot;
