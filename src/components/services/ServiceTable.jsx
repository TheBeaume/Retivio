import React from "react";
import useBusinessSettings from "../../hooks/useBusinessSettings";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ServiceTable({
  loading,
  services,
  onEdit,
  onDelete,
}) {
const settings = useBusinessSettings();

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        Loading services...
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        <div className="text-5xl mb-3">💇</div>
        <h2 className="text-xl font-bold">
          No Services Found
        </h2>

        <p className="mt-2">
          Click <strong>Add Service</strong> to create your first service.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">Service</th>

            <th className="text-left p-4">Category</th>

            <th className="text-left p-4">Price</th>

            <th className="text-left p-4">Duration</th>

            <th className="text-left p-4">Status</th>

            <th className="text-center p-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {services.map((service) => (

            <tr
              key={service.id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-4 font-semibold">
                {service.name}
              </td>

              <td className="p-4">
                {service.category}
              </td>

              <td className="p-4">
{formatCurrency(
  Number(service.price),
  settings?.currency_symbol,
  settings?.currency_position,
  settings?.decimal_places
)}
              </td>

              <td className="p-4">
                {service.duration} min
              </td>

              <td className="p-4">

                {service.is_active ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    Inactive
                  </span>
                )}

              </td>

              <td className="p-4">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onEdit(service)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => onDelete(service)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                  >
                    🗑️
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
