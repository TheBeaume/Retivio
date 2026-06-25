import React from "react";

function QuickActions({ setActivePage }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <button
          onClick={() => setActivePage("visit")}
          className="bg-green-100 hover:bg-green-200 p-4 rounded-lg"
        >
          <div className="text-3xl">➕</div>
          <p className="font-semibold mt-2">
            Add Customer
          </p>
        </button>

        <button
          onClick={() => setActivePage("visit")}
          className="bg-blue-100 hover:bg-blue-200 p-4 rounded-lg"
        >
          <div className="text-3xl">📝</div>
          <p className="font-semibold mt-2">
            Add Visit
          </p>
        </button>

        <button
          onClick={() => setActivePage("campaigns")}
          className="bg-purple-100 hover:bg-purple-200 p-4 rounded-lg"
        >
          <div className="text-3xl">📢</div>
          <p className="font-semibold mt-2">
            Campaigns
          </p>
        </button>

        <button
          onClick={() => setActivePage("reports")}
          className="bg-orange-100 hover:bg-orange-200 p-4 rounded-lg"
        >
          <div className="text-3xl">📈</div>
          <p className="font-semibold mt-2">
            Reports
          </p>
        </button>

      </div>
    </div>
  );
}

export default QuickActions;
