import React from "react";

function ResultCard({ business, onSave }) {
  const mapQuery =
    business.latitude && business.longitude
      ? `${business.latitude},${business.longitude}`
      : `${business.name} ${business.address || ""}`;

  const mapUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  const cleanPhone = (business.phone || "").replace(/\D/g, "");

  return (
    <div className="bg-gray-900 border border-white/10 rounded-2xl p-5">
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-bold">
            {business.name}
          </h3>

          <p className="text-gray-400 mt-1">
            {business.category}
          </p>

          {business.address && (
            <p className="text-sm text-gray-500 mt-2">
              {business.address}
            </p>
          )}

          {business.phone && (
            <p className="text-sm text-gray-300 mt-2">
              {business.phone}
            </p>
          )}

          {business.email && (
            <p className="text-sm text-gray-300 mt-2">
              {business.email}
            </p>
          )}

          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-purple-400 text-sm mt-2"
            >
              Visit Website
            </a>
          )}
        </div>

        <span className="bg-gray-950 border border-white/10 text-purple-400 px-3 py-1 rounded-full text-xs font-semibold">
          Lead
        </span>
      </div>

      <div className="flex flex-wrap gap-3 mt-5">
        {business.phone && (
          <a
            href={`tel:${business.phone}`}
            className="bg-gray-950 border border-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm"
          >
            Call
          </a>
        )}

        {cleanPhone && (
          <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noreferrer"
            className="bg-gray-950 border border-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm"
          >
            WhatsApp
          </a>
        )}

        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-gray-950 border border-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm"
        >
          View Map
        </a>

        <button
          onClick={() => onSave(business)}
          className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm"
        >
          Save Lead
        </button>
      </div>
    </div>
  );
}

export default ResultCard;
