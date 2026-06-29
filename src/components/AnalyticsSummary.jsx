import React from "react";

function AnalyticsSummary({ customers }) {
  const totalCustomers = customers.length;

  const totalRevenue = customers.reduce(
    (sum, c) => sum + (c.totalSpend || 0),
    0
  );

  const goldMembers = customers.filter(
    (c) => c.loyalty === "Gold"
  ).length;

  const vipMembers = customers.filter(
    (c) => c.loyalty === "VIP"
  ).length;

  const cards = [
    {
      title: "Customers",
      value: totalCustomers,
      icon: "👥",
      color: "bg-blue-50",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue}`,
      icon: "💰",
      color: "bg-green-50",
    },
    {
      title: "Gold Members",
      value: goldMembers,
      icon: "🥇",
      color: "bg-yellow-50",
    },
    {
      title: "VIP Members",
      value: vipMembers,
      icon: "👑",
      color: "bg-purple-50",
    },
  ];

  return (
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} rounded-2xl shadow p-4 border`}
        >
          <div className="flex items-center justify-between">
            <span className="text-3xl">
              {card.icon}
            </span>

          </div>

          <p className="text-gray-500 text-sm mt-3">
            {card.title}
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsSummary;
