import React from "react";

export default function CustomerSelectionList({
  customers,
  selectedCustomers,
  toggleCustomer,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">
      <h3 className="text-xl font-bold mb-4">
        👥 Customers
      </h3>

      {customers.length === 0 ? (
        <p className="text-gray-500">
          No customers found.
        </p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {customers.map((customer) => (
            <label
              key={customer.id}
              className="flex items-center justify-between border rounded-lg p-3 cursor-pointer"
            >
              <div>
                <p className="font-semibold">
                  {customer.name}
                </p>

                <p className="text-sm text-gray-500">
                  {customer.phone}
                </p>

                <p className="text-sm text-purple-600">
                  {customer.service}
                </p>
              </div>

              <input
                type="checkbox"
                checked={selectedCustomers.includes(customer.id)}
                onChange={() =>
                  toggleCustomer(customer.id)
                }
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
