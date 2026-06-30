import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function BetaModal({ onClose }) {
  const [form, setForm] = useState({
    user_name: "",
    salon_name: "",
    mobile: "",
    city: "",
    salon_size: "1-2 Chairs",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("beta_requests")
      .insert(form);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      onClose();
    }, 1800);
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 w-11/12 max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold">
            You're on the Beta List!
          </h2>
          <p className="text-gray-600 mt-3">
            Thank you for joining Retivio Beta.
            We'll contact you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-8 w-full max-w-lg space-y-4"
      >
        <h2 className="text-3xl font-bold">
          🚀 Join Free Beta
        </h2>

        <input
          placeholder="Owner Name"
          className="w-full border rounded-xl p-3"
          value={form.user_name}
          onChange={(e) =>
            setForm({ ...form, user_name: e.target.value })
          }
          required
        />

        <input
          placeholder="Salon Name"
          className="w-full border rounded-xl p-3"
          value={form.salon_name}
          onChange={(e) =>
            setForm({ ...form, salon_name: e.target.value })
          }
          required
        />

        <input
          placeholder="Mobile Number"
          className="w-full border rounded-xl p-3"
          value={form.mobile}
          onChange={(e) =>
            setForm({ ...form, mobile: e.target.value })
          }
          required
        />

        <input
          placeholder="City"
          className="w-full border rounded-xl p-3"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
        />

        <select
          className="w-full border rounded-xl p-3"
          value={form.salon_size}
          onChange={(e) =>
            setForm({ ...form, salon_size: e.target.value })
          }
        >
          <option>Home Salon</option>
          <option>1-2 Chairs</option>
          <option>3-5 Chairs</option>
          <option>5+ Chairs</option>
        </select>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border rounded-xl py-3"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="flex-1 bg-purple-700 text-white rounded-xl py-3"
          >
            {loading ? "Submitting..." : "Join Beta"}
          </button>
        </div>
      </form>
    </div>
  );
}
