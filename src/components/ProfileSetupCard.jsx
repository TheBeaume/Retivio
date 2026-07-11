import React, { useState } from "react";

function ProfileSetupCard({ profile, setActivePage }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const incomplete =
    !profile?.country ||
    !profile?.currency_symbol ||
    !profile?.timezone;

  if (!incomplete) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-lg font-bold text-amber-800">
             Complete Your Business Setup
          </h2>

          <p className="text-amber-700 mt-2">
            Please select your country, currency and timezone
            before using all Retivio features.
          </p>

          <button
            onClick={() => setActivePage("settings")}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition"
          >
             Go to Settings
          </button>

        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-gray-500 hover:text-black text-xl"
        >
          
        </button>

      </div>

    </div>
  );
}

export default ProfileSetupCard;
