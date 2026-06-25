import React from "react";

function CampaignPerformance() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">
        📢 Campaign Performance
      </h2>

      <div className="space-y-4">

        <div className="border rounded-lg p-3">
          <h3 className="font-semibold">
            🎂 Birthday Campaign
          </h3>

          <div className="grid grid-cols-3 gap-3 mt-3">
            <div>
              <p className="text-gray-500 text-sm">
                Sent
              </p>
              <p className="font-bold">
                20
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Opened
              </p>
              <p className="font-bold">
                15
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Booked
              </p>
              <p className="font-bold text-green-600">
                4
              </p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-3">
          <h3 className="font-semibold">
            🔄 Reactivation Campaign
          </h3>

          <div className="grid grid-cols-3 gap-3 mt-3">
            <div>
              <p className="text-gray-500 text-sm">
                Sent
              </p>
              <p className="font-bold">
                35
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Opened
              </p>
              <p className="font-bold">
                22
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Booked
              </p>
              <p className="font-bold text-green-600">
                6
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CampaignPerformance;
