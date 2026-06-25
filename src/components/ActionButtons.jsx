import React, { useState } from "react";

function ActionButtons() {
const [message, setMessage] = useState("");
const openWhatsApp = (phone) => {
  if (!message) return;

  const cleaned = phone.replace(/\D/g, "");

  window.open(
    `https://wa.me/91${cleaned}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

return (
<>
<div className="mt-6 flex gap-4 flex-wrap">

    <button
      onClick={() =>
        setMessage(
          "Hi Priya 🌸\n\nIt's been 30 days since your Hair Spa.\nBook your next appointment this week and enjoy 10% OFF.\n\nReply YES to book."
        )
      }
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Send Follow-Up
    </button>

    <button
      onClick={() =>
        setMessage(
          "Hi Neha 👋\n\nWe miss you at our salon.\nIt's been over 60 days since your last visit.\nCome back this week and get 15% OFF."
        )
      }
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Reactivate Clients
    </button>

    <button
      onClick={() =>
        setMessage(
          "🎂 Happy Birthday!\n\nEnjoy a complimentary salon service on your special day.\nWe look forward to seeing you."
        )
      }
      className="bg-purple-600 text-white px-4 py-2 rounded"
    >
      Birthday Campaign
    </button>

  </div>

  {message && (
    <div className="bg-white p-4 mt-4 rounded shadow">
      <h3 className="font-bold mb-2">
        Generated WhatsApp Message
      </h3>

      <pre className="whitespace-pre-wrap">
        {message}
      </pre>
<button
  onClick={() => openWhatsApp("7082101255")}
  className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
>
  Open in WhatsApp
</button>


  </div>
  )}
</>

);
}

export default ActionButtons;
