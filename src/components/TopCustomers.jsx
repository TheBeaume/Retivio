import React from "react";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";

function TopCustomers({ customers }) {
  const settings = useBusinessSettings();

  const topCustomers = [...customers]
    .sort((a, b) => (b.totalSpend || 0) - (a.totalSpend || 0))
    .slice(0, 5);

  const badge = (index) => {
    if (index === 0) return "";
    if (index === 1) return "";
    if (index === 2) return "";
    return "⭐";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold">
          Top Customers
        </h2>

        <span className="text-sm text-purple-600 font-medium">
          Top 5
        </span>
      </div>

      {topCustomers.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-4xl mb-2"></p>
          <p>No customer data available.</p>
        </div>
      ) : (
        <div className="space-y-4">

          {topCustomers.map((customer, index) => (

            <div
              key={customer.id}
              className="flex items-center justify-between border-b last:border-0 pb-4"
            >

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
                  {badge(index)}
                </div>

                <div>

                  <h3 className="font-semibold">
                    {customer.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {customer.visits || 0} Visits
                  </p>

                  <span className="inline-block mt-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {customer.loyalty || "Regular"}
                  </span>

                </div>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-600">
                  {formatCurrency(
                    customer.totalSpend || 0,
                    settings?.currency_symbol,
                    settings?.currency_position,
                    settings?.decimal_places
                  )}
                </p>

                <p className="text-xs text-gray-400">
                  Lifetime Spend
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default TopCustomers;
