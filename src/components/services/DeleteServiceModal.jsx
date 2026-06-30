import React from "react";

export default function DeleteServiceModal({
  service,
  onCancel,
  onConfirm,
}) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold mb-3">
          Delete Service
        </h2>

        <p className="text-gray-600">
          Are you sure you want to delete
          <span className="font-bold">
            {" "}{service.name}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onCancel}
            className="border rounded-xl px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-5 py-2"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}
