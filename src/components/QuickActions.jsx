import React from "react";

function QuickActions({ setActivePage }) {
  const actions = [
    {
      title: "Add Customer",
      icon: "",
      page: "visit",
      color: "bg-green-50 border-green-100",
    },
    {
      title: "Add Visit",
      icon: "",
      page: "visit",
      color: "bg-blue-50 border-blue-100",
    },
    {
      title: "Campaigns",
      icon: "",
      page: "campaigns",
      color: "bg-purple-50 border-purple-100",
    },
    {
      title: "Reports",
      icon: "",
      page: "reports",
      color: "bg-orange-50 border-orange-100",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 mt-6">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold">
          Quick Actions
        </h2>

        <span className="text-sm text-purple-600 font-medium">
          One Click Access
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {actions.map((action) => (

          <button
            key={action.title}
            onClick={() => setActivePage(action.page)}
            className={`${action.color} border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
          >

            <div className="text-4xl">
              {action.icon}
            </div>

            <h3 className="font-bold mt-4">
              {action.title}
            </h3>

          </button>

        ))}

      </div>

    </div>
  );
}

export default QuickActions;
