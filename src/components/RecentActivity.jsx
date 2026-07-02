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
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">
        🕒 Recent Activity
      </h2>

      <div className="space-y-3">
        {recentCustomers.map((c, index) => (
          <div
            key={index}
            className="flex justify-between border-b pb-2"
          >
            <div>
              <p className="font-semibold">
                {c.name}
              </p>

              <p className="text-sm text-gray-500">
                {c.service}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">
{formatCurrency(
  c.totalSpend,
  settings?.currency_symbol,
  settings?.currency_position,
  settings?.decimal_places
)}
              </p>

              <p className="text-sm text-gray-500">
                {c.lastVisit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
