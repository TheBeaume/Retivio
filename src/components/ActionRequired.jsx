import React from "react";

function ActionRequired() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">
        ⚠ Action Required
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <p className="font-semibold">
              12 Customers Due
            </p>

            <p className="text-sm text-gray-500">
              Need follow-up this week
            </p>
          </div>

          <button className="bg-purple-600 text-white px-3 py-1 rounded">
            View
          </button>
        </div>

        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <p className="font-semibold">
              3 VIP Customers Inactive
            </p>

            <p className="text-sm text-gray-500">
              Not visited in 60+ days
            </p>
          </div>

          <button className="bg-purple-600 text-white px-3 py-1 rounded">
            View
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">
              2 Birthdays Today
            </p>

            <p className="text-sm text-gray-500">
              Send wishes & offers
            </p>
          </div>

          <button className="bg-purple-600 text-white px-3 py-1 rounded">
            View
          </button>
        </div>

      </div>

      <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg">
        Send Reminder Campaign
      </button>
    </div>
  );
}

export default ActionRequired;
