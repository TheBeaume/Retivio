import React from "react";

function ResultCard({ business, onSave }) {
  return (
    <div className="bg-white rounded-2xl shadow border p-5">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-xl font-bold">
            {business.name}
          </h3>

          <p className="text-gray-500 mt-1">
            {business.category}
          </p>

          {business.address && (
            <p className="text-sm text-gray-500 mt-2">
              📍 {business.address}
            </p>
          )}

          {business.phone && (
            <p className="text-sm mt-2">
              📞 {business.phone}
            </p>
          )}

          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm"
            >
              🌐 Website
            </a>
          )}

        </div>

        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
          Lead
        </span>

      </div>

      <div className="flex flex-wrap gap-3 mt-5">

        {business.phone && (
          <a
            href={`tel:${business.phone}`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            📞 Call
          </a>
        )}

        {business.phone && (
          <a
            href={`https://wa.me/${business.phone}`}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            💬 WhatsApp
          </a>
        )}

        <a
          href={`https://maps.google.com/?q=${business.latitude},${business.longitude}`}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          🗺 Maps
        </a>

        <button
          onClick={() => onSave(business)}
          className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          💾 Save Lead
        </button>

      </div>

    </div>
  );
}

export default ResultCard;
