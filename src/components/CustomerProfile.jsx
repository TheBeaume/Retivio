import React, { useEffect, useState } from "react";
import { getCustomerVisits } from "../services/customerVisitService";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";

export default function CustomerProfile({ customer, onClose }) {
  const [visits, setVisits] = useState([]);
const settings = useBusinessSettings();

  useEffect(() => {
    async function loadVisits() {
      if (!customer?.id) return;

      try {
        const data = await getCustomerVisits(customer.id);
        setVisits(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadVisits();
  }, [customer]);
useEffect(() => {
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "auto";
  };
}, []);

  if (!customer) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">

      <div className="bg-white w-full md:w-[420px] h-full overflow-y-auto">

        <div className="bg-purple-700 text-white p-5 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold">
              {customer.name}
            </h2>

            <p className="text-purple-100">
              {customer.phone}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            
          </button>

        </div>

        <div className="p-5 space-y-6">

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Total Visits
              </p>

              <h3 className="text-2xl font-bold">
                {customer.visits}
              </h3>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Lifetime Spend
              </p>

              <h3 className="text-2xl font-bold">
{formatCurrency(
  customer.totalSpend,
  settings?.currency_symbol,
  settings?.currency_position,
  settings?.decimal_places
)}
              </h3>
            </div>

          </div>
<div>

            <h3 className="font-bold mb-3">
              Customer Details
            </h3>

            <div className="space-y-2">

              <p> Service: {customer.service}</p>

              <p> Last Visit: {customer.lastVisit}</p>

              <p> Next Due: {customer.nextDue}</p>

              <p>⭐ Loyalty: {customer.loyalty}</p>

              <p> Status: {customer.status}</p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-3">

            <button
              onClick={() =>
                window.open(
                  `https://wa.me/91${customer.phone.replace(/\D/g, "")}`,
                  "_blank"
                )
              }
              className="bg-green-600 text-white py-3 rounded-xl"
            >
               WhatsApp
            </button>

            <button
              onClick={() =>
                (window.location.href = `tel:${customer.phone}`)
              }
              className="bg-blue-600 text-white py-3 rounded-xl"
            >
               Call
            </button>

          </div>
<div>

            <h3 className="font-bold mb-3">
               Visit History
            </h3>

            {visits.length === 0 ? (

              <p className="text-gray-500">
                No visits found.
              </p>

            ) : (

              <div className="space-y-3">

                {visits.map((visit) => (

                  <div
                    key={visit.id}
                    className="border rounded-xl p-3"
                  >
                    <p className="font-semibold">
                      {visit.service}
                    </p>

                    <p className="text-sm text-gray-600">
{formatCurrency(
  visit.amount,
  settings?.currency_symbol,
  settings?.currency_position,
  settings?.decimal_places
)}
                    </p>

                    <p className="text-xs text-gray-500">
                      {visit.visit_date}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

