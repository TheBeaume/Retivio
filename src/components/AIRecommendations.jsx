import React from "react";

function AIRecommendations({ customers }) {
  const recommendations = [];

  customers.forEach((c) => {
    // VIP Suggestion
    if (c.visits >= 8 && c.loyalty !== "VIP") {
      recommendations.push({
        icon: "👑",
        title: `${c.name} qualifies for VIP Membership`,
        action: "Upgrade to VIP",
      });
    }

    // Gold Offer
    else if (c.visits >= 5) {
      recommendations.push({
        icon: "🟡",
        title: `${c.name} is a loyal customer`,
        action: "Offer 10% Discount",
      });
    }

    // Reactivation
    if (c.status === "Inactive") {
      recommendations.push({
        icon: "🔴",
        title: `${c.name} hasn't visited recently`,
        action: "Send Comeback Offer",
      });
    }

    // Birthday
    if (c.birthdayToday) {
      recommendations.push({
        icon: "🎂",
        title: `${c.name}'s birthday today`,
        action: "Send Birthday Offer",
      });
    }
  });

  return (
    <div className="bg-white rounded-xl shadow p-5 mt-6">
      <h2 className="text-xl font-bold mb-4">
        🧠 AI Recommendations
      </h2>

      {recommendations.length === 0 ? (
        <p className="text-gray-500">
          No recommendations available.
        </p>
      ) : (
        recommendations.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b py-4"
          >
            <div>
              <p className="font-semibold">
                {item.icon} {item.title}
              </p>

              <p className="text-sm text-gray-500">
                {item.action}
              </p>
            </div>

            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              Take Action
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AIRecommendations;
