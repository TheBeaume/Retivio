import React from "react";
import {
  Users,
  IndianRupee,
  Repeat2,
  TrendingUp,
} from "lucide-react";
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
      icon: Users,
      color: "bg-blue-50 border-blue-100",
      iconStyle: "bg-blue-100 text-blue-700",
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
      icon: IndianRupee,
      color: "bg-green-50 border-green-100",
      iconStyle: "bg-green-100 text-green-700",
    },
    {
      title: "Repeat Customers",
      value: repeatCustomers,
      subtitle: "Visited more than once",
      icon: Repeat2,
      color: "bg-yellow-50 border-yellow-100",
      iconStyle: "bg-yellow-100 text-yellow-700",
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
      icon: TrendingUp,
      color: "bg-purple-50 border-purple-100",
      iconStyle: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`${card.color} border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300`}
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.iconStyle}`}
            >
              <Icon size={22} strokeWidth={2.2} />
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
        );
      })}
    </div>
  );
}

export default AnalyticsSummary;
