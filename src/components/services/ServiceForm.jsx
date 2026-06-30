import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

const categories = [
  "Hair",
  "Skin",
  "Nails",
  "Makeup",
  "Spa",
  "Bridal",
  "Other",
];

export default function ServiceForm({
  service,
  onClose,
  onSaved,
}) {
  const [form, setForm] = useState({
    name: service?.name || "",
    category: service?.category || "Hair",
    price: service?.price || "",
    duration: service?.duration || 30,
    description: service?.description || "",
    is_active:
      service?.is_active === undefined
        ? true
        : service.is_active,
  });

  const [saving, setSaving] = useState(false);

  async function saveService() {
    if (!form.name.trim()) {
      alert("Service name is required.");
      return;
    }

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("User not found.");
      setSaving(false);
      return;
    }

    const payload = {
      user_id: user.id,
      name: form.name,
      category: form.category,
      price: Number(form.price),
      duration: Number(form.duration),
      description: form.description,
      is_active: form.is_active,
    };

    let error;

    if (service) {
      ({ error } = await supabase
        .from("services")
        .update(payload)
        .eq("id", service.id));
    } else {
      ({ error } = await supabase
        .from("services")
        .insert(payload));
    }

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    onSaved();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          {service ? "Edit Service" : "Add Service"}
        </h2>

        <div className="space-y-4">

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Service Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <select
            className="w-full border rounded-xl p-3"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          >
            {categories.map((c) => (
              <option key={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="w-full border rounded-xl p-3"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
          />

          <input
            type="number"
            className="w-full border rounded-xl p-3"
            placeholder="Duration (minutes)"
            value={form.duration}
            onChange={(e) =>
              setForm({
                ...form,
                duration: e.target.value,
              })
            }
          />

          <textarea
            rows="4"
            className="w-full border rounded-xl p-3"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_active: e.target.checked,
                })
              }
            />

            Active Service

          </label>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={saveService}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl"
          >
            {saving ? "Saving..." : "Save Service"}
          </button>

        </div>

      </div>

    </div>
  );
}
