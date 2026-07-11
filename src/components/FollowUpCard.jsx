import React from "react";

export default function FollowUpCard({
  item,
  onWhatsApp,
  onCall,
  onDone,
}) {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-center shadow-sm">

      <div>
        <h3 className="font-bold text-lg">
           {item.customer_name}
        </h3>

        <p> {item.phone}</p>

        <p> {item.service}</p>

        <p> {item.followup_date}</p>

        <div className="flex gap-2 mt-4">

          <button
            onClick={() => onWhatsApp(item)}
            className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
          >
             WhatsApp
          </button>

          <button
            onClick={() => onCall(item)}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
          >
             Call
          </button>

          {item.status !== "Done" && (
            <button
              onClick={() => onDone(item.id)}
              className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm"
            >
               Done
            </button>
          )}

        </div>
      </div>

      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          item.status === "Done"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {item.status}
      </span>

    </div>
  );
}
