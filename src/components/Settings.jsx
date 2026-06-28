import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Settings() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    business_name: "",
    whatsapp: "",
    email: "",
    address: "",
    instagram: "",
    website: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("business_settings")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (data) {
      setForm({
        business_name: data.business_name || "",
        whatsapp: data.whatsapp || "",
        email: data.email || "",
        address: data.address || "",
        instagram: data.instagram || "",
        website: data.website || "",
      });
    }
  }

  async function saveSettings() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

if (!user) {
  alert("User is null");
  setLoading(false);
  return;
}

const { error } = await supabase
  .from("business_settings")
  .upsert(
    {
      user_id: user.id,
      ...form,
    },
    {
      onConflict: "user_id",
    }
  );
if (error) {
  alert(error.message);
} else {
  alert("Business settings saved successfully.");
}

    setLoading(false);
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Business Settings
      </h2>

      <div className="grid gap-4">

        <input
          className="border p-3 rounded"
          placeholder="Business Name"
          value={form.business_name}
          onChange={(e) =>
            setForm({
              ...form,
              business_name: e.target.value,
            })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="WhatsApp Number"
          value={form.whatsapp}
          onChange={(e) =>
            setForm({
              ...form,
              whatsapp: e.target.value,
            })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Instagram"
          value={form.instagram}
          onChange={(e) =>
            setForm({
              ...form,
              instagram: e.target.value,
            })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Website"
          value={form.website}
          onChange={(e) =>
            setForm({
              ...form,
              website: e.target.value,
            })
          }
        />

        <button
          onClick={saveSettings}
          disabled={loading}
          className="bg-purple-600 text-white rounded-lg p-3"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>

      </div>

    </div>
  );
}
