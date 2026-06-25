import React from "react";

function GrowthSnapshot({ customers }) {
  const totalCustomers = customers.length;

  const totalVisits = customers.reduce(
    (sum, c) => sum + c.visits,
    0
  );

  const totalRevenue = customers.reduce(
    (sum, c) => sum + c.totalSpend,
    0
  );

  const avgSpend =
    totalCustomers > 0
      ? Math.round(totalRevenue / totalCustomers)
      : 0;

  const repeatRate =
    totalCustomers > 0
      ? Math.round(
          (customers.filter(
            (c) => c.visits > 1
          ).length /
            totalCustomers) *
            100
        )
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">
        📈 Growth Snapshot
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Customers
          </p>

          <h3 className="text-2xl font-bold">
            {totalCustomers}
          </h3>
        </div>

        <div className="bg-green-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Visits
          </p>

          <h3 className="text-2xl font-bold">
            {totalVisits}
          </h3>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Avg Spend
          </p>

          <h3 className="text-2xl font-bold">
            ₹{avgSpend}
          </h3>
        </div>

        <div className="bg-purple-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Repeat Rate
          </p>

          <h3 className="text-2xl font-bold">
            {repeatRate}%
          </h3>
        </div>

      </div>
    </div>
  );
}

export default GrowthSnapshot;
