import React from "react";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";

function AnalyticsSummary({ customers }) {
  const settings = useBusinessSettings();

  const totalCustomers = customers.length;

  const totalRevenue = customers.reduce(
    (sum, c) => sum + (Number(c.totalSpend) || 0),
    0
  );

  const repeatCustomers = customers.filter(
    (c) => (c.visits || 0) > 1
  ).length;

  const averageSpend =
    totalCustomers > 0
      ? totalRevenue / totalCustomers
      : 0;

  const cards = [
    {
      title: "Customers",
      value: totalCustomers,
subtitle: "Registered customers",
      icon: "",
      color: "bg-blue-50 border-blue-100",
    },
    {
      title: "Revenue",
      value: formatCurrency(
        totalRevenue,
        settings?.currency_symbol,
        settings?.currency_position,
        settings?.decimal_places
      ),
subtitle: "Total revenue earned",
      icon: "",
      color: "bg-green-50 border-green-100",
    },
    {
      title: "Repeat Customers",
      value: repeatCustomers,
subtitle: "Visited more than once",
      icon: "",
      color: "bg-yellow-50 border-yellow-100",
    },
    {
      title: "Average Spend",
      value: formatCurrency(
        averageSpend,
        settings?.currency_symbol,
        settings?.currency_position,
        settings?.decimal_places
      ),
subtitle: "Revenue per customer",
      icon: "⭐",
      color: "bg-purple-50 border-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <div className="text-4xl">{card.icon}</div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            {card.title}
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-900">
            {card.value}
          </h2>

          <p className="text-xs text-gray-400 mt-2">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsSummary;
