import React from "react";

function StatsCards({
  total,
  phoneCount,
  websiteCount,
  currentPage,
  totalPages,
}) {
  const cards = [
    {
      title: "Businesses",
      value: total,
    },
    {
      title: "Phone",
      value: phoneCount,
    },
    {
      title: "Website",
      value: websiteCount,
    },
    {
      title: "Page",
      value: `${currentPage}/${totalPages || 1}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-2xl border shadow p-5"
        >

          <p className="text-sm text-gray-500">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {card.value}
          </h2>

        </div>

      ))}

    </div>
  );
}

export default StatsCards;
