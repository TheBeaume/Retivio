import React from "react";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";

function TopCustomers({ customers }) {
  const settings = useBusinessSettings();

  const topCustomers = [...customers]
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">
        🏆 Top Customers
      </h2>

      <div className="space-y-3">

        {topCustomers.map((customer, index) => (
          <div
key={customer.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-semibold">
                {index === 0
                  ? "👑 "
                  : index === 1
                  ? "🥇 "
                  : index === 2
                  ? "🥈 "
                  : "⭐ "}
                {customer.name}
              </p>

              <p className="text-sm text-gray-500">
                {customer.visits} Visits
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">
{formatCurrency(
  customer.totalSpend,
  settings?.currency_symbol,
  settings?.currency_position,
  settings?.decimal_places
)}
              </p>

              <p className="text-sm text-gray-500">
                {customer.loyalty}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default TopCustomers;
