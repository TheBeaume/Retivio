import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function BusinessSettings() {
  const [businessName, setBusinessName] = useState("");
  const [signature, setSignature] = useState("");
  const [followupDays, setFollowupDays] = useState(30);
  const [loading, setLoading] = useState(false);

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
      setBusinessName(data.business_name || "");
      setSignature(data.signature || "");
      setFollowupDays(data.default_followup_days || 30);
    }
  }

  async function saveSettings() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("business_settings")
      .upsert({
        user_id: user.id,
        business_name: businessName,
        signature: signature,
        default_followup_days: followupDays,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Settings Saved!");
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        ⚙ Business Settings
      </h2>

      <div className="space-y-4">

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg p-3"
          rows="4"
          placeholder="WhatsApp Signature"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />

        <input
          type="number"
          className="w-full border rounded-lg p-3"
          value={followupDays}
          onChange={(e) =>
            setFollowupDays(Number(e.target.value))
          }
        />

        <button
          onClick={saveSettings}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>

      </div>
    </div>
  );
}
