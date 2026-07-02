import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function BusinessSettings() {
  const [businessName, setBusinessName] = useState("");
  const [signature, setSignature] = useState("");
  const [followupDays, setFollowupDays] = useState(30);
  const [loading, setLoading] = useState(false);
const [country, setCountry] = useState("India");
const [currency, setCurrency] = useState("INR");
const [timezone, setTimezone] = useState("Asia/Kolkata");
const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
const [timeFormat, setTimeFormat] = useState("12 Hours");
const [phoneCode, setPhoneCode] = useState("+91");
const [allowDoubleBooking, setAllowDoubleBooking] = useState(false);
const [appointmentDuration, setAppointmentDuration] = useState(30);
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
setCountry(data.country || "India");
setCurrency(data.currency || "INR");
setTimezone(data.timezone || "Asia/Kolkata");
setDateFormat(data.date_format || "DD/MM/YYYY");
setTimeFormat(data.time_format || "12 Hours");
setPhoneCode(data.phone_code || "+91");
setAllowDoubleBooking(data.allow_double_booking || false);
setAppointmentDuration(data.default_duration || 30);

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
country: country,
currency: currency,
timezone: timezone,
date_format: dateFormat,
time_format: timeFormat,
phone_code: phoneCode,
allow_double_booking: allowDoubleBooking,
default_duration: appointmentDuration,
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
<h3 className="text-lg font-semibold mt-6">
  🌍 Regional Settings
</h3>

<div className="grid md:grid-cols-2 gap-4">

  <select
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    className="border rounded-lg p-3"
  >
    <option>India</option>
    <option>United States</option>
    <option>United Kingdom</option>
    <option>Canada</option>
    <option>Australia</option>
    <option>UAE</option>
  </select>

  <select
    value={currency}
    onChange={(e) => setCurrency(e.target.value)}
    className="border rounded-lg p-3"
  >
    <option>INR</option>
    <option>USD</option>
    <option>GBP</option>
    <option>CAD</option>
    <option>AED</option>
    <option>AUD</option>
  </select>

  <input
    value={timezone}
    onChange={(e) => setTimezone(e.target.value)}
    placeholder="Timezone"
    className="border rounded-lg p-3"
  />

  <select
    value={dateFormat}
    onChange={(e) => setDateFormat(e.target.value)}
    className="border rounded-lg p-3"
  >
    <option>DD/MM/YYYY</option>
    <option>MM/DD/YYYY</option>
    <option>YYYY-MM-DD</option>
  </select>

  <select
    value={timeFormat}
    onChange={(e) => setTimeFormat(e.target.value)}
    className="border rounded-lg p-3"
  >
    <option>12 Hours</option>
    <option>24 Hours</option>
  </select>

  <input
    value={phoneCode}
    onChange={(e) => setPhoneCode(e.target.value)}
    placeholder="+91"
    className="border rounded-lg p-3"
  />

</div>

<h3 className="text-lg font-semibold mt-6">
  📅 Appointment Settings
</h3>

<div className="grid md:grid-cols-2 gap-4">

  <select
    value={appointmentDuration}
    onChange={(e) =>
      setAppointmentDuration(Number(e.target.value))
    }
    className="border rounded-lg p-3"
  >
    <option value={15}>15 Minutes</option>
    <option value={30}>30 Minutes</option>
    <option value={45}>45 Minutes</option>
    <option value={60}>60 Minutes</option>
    <option value={90}>90 Minutes</option>
  </select>

  <label className="flex items-center gap-3 border rounded-lg p-3">
    <input
      type="checkbox"
      checked={allowDoubleBooking}
      onChange={(e) =>
        setAllowDoubleBooking(e.target.checked)
      }
    />
    Allow Double Booking
  </label>

</div>

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
