import React from "react";
import { Award, Crown, Medal, Trophy } from "lucide-react";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";

function TopCustomers({ customers }) {
  const settings = useBusinessSettings();

  const topCustomers = [...customers]
    .sort(
      (a, b) =>
        (Number(b.totalSpend) || 0) -
        (Number(a.totalSpend) || 0)
    )
    .slice(0, 5);

  function getRank(index) {
    if (index === 0) {
      return {
        Icon: Crown,
        style: "bg-yellow-100 text-yellow-700",
      };
    }

    if (index === 1) {
      return {
        Icon: Trophy,
        style: "bg-gray-100 text-gray-600",
      };
    }

    if (index === 2) {
      return {
        Icon: Medal,
        style: "bg-orange-100 text-orange-700",
      };
    }

    return {
      Icon: Award,
      style: "bg-purple-100 text-purple-700",
    };
  }

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
          <Trophy
            size={34}
            className="mx-auto mb-3 text-gray-300"
          />
          <p>No customer data available.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {topCustomers.map((customer, index) => {
            const { Icon, style } = getRank(index);

            return (
              <div
                key={customer.id}
                className="flex items-center justify-between border-b last:border-0 pb-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${style}`}
                  >
                    <Icon size={21} strokeWidth={2.2} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">
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

                <div className="text-right shrink-0 ml-3">
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
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TopCustomers;
