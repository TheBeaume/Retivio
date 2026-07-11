import React from "react";
import useBusinessSettings from "../../hooks/useBusinessSettings";
import { formatCurrency } from "../../utils/formatCurrency";

export default function CustomerInfo() {
const settings = useBusinessSettings();
  return (
    <div className="bg-white rounded-2xl shadow p-5 h-full">

      <div className="text-center">

        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-3xl mx-auto">
          
        </div>

        <h2 className="mt-4 text-xl font-bold">
          Priya Sharma
        </h2>

        <p className="text-gray-500">
           +91 98765 43210
        </p>

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">
          <span>⭐ Loyalty</span>
          <span className="font-semibold text-yellow-600">
            Gold
          </span>
        </div>

        <div className="flex justify-between">
          <span> Last Service</span>
          <span>Hair Spa</span>
        </div>

        <div className="flex justify-between">
          <span> Last Visit</span>
          <span>20 Jun 2026</span>
        </div>

        <div className="flex justify-between">
          <span> Total Spend</span>
<span>
  {formatCurrency(
    12500,
    settings?.currency_symbol,
    settings?.currency_position,
    settings?.decimal_places
  )}
</span>

        </div>

        <div className="flex justify-between">
          <span> Birthday</span>
          <span>26 Apr</span>
        </div>

      </div>

    </div>
  );
}
