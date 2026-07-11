import React from "react";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";

function RecentActivity({ customers }) {
  const settings = useBusinessSettings();

  const recentCustomers = [...customers]
    .sort(
      (a, b) =>
        new Date(b.lastVisit || 0) -
        new Date(a.lastVisit || 0)
    )
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold">
          Recent Activity
        </h2>

        <span className="text-sm text-purple-600 font-medium">
          Last 5 Visits
        </span>
      </div>

      {recentCustomers.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-4xl mb-2"></p>
          <p>No recent activity yet.</p>
        </div>
      ) : (
        <div className="space-y-4">

          {recentCustomers.map((c) => (

            <div
              key={c.id}
              className="flex items-center justify-between border-b last:border-0 pb-4"
            >

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                  
                </div>

                <div>

                  <h3 className="font-semibold">
                    {c.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {c.service}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Last Visit: {c.lastVisit || "N/A"}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-600">
                  {formatCurrency(
                    c.totalSpend || 0,
                    settings?.currency_symbol,
                    settings?.currency_position,
                    settings?.decimal_places
                  )}
                </p>

                <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  Completed
                </span>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default RecentActivity;
