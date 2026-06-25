import React from "react";

function ActionModal({
  customer,
  onClose,
  onSend,
}) {
  if (!customer) return null;

  const message = `Hi ${customer.name}! 🌸

It's been a while since your last ${customer.service}.

Book your next appointment this week and enjoy a special offer!

- Team Retivio`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-md p-5">

        <h2 className="text-xl font-bold mb-4">
          Send WhatsApp
        </h2>

        <p className="font-semibold">
          Customer
        </p>

        <p className="mb-3">
          {customer.name}
        </p>

        <textarea
          readOnly
          value={message}
          className="w-full border rounded-lg p-3 h-40"
        />

        <div className="flex justify-end gap-3 mt-5">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSend(customer, message)
            }
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            📱 Send WhatsApp
          </button>

        </div>

      </div>

    </div>
  );
}

export default ActionModal;
