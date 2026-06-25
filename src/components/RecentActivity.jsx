import React from "react";

function RecentActivity({ customers }) {
  const recentCustomers = [...customers]
    .reverse()
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
                ₹{c.totalSpend}
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
