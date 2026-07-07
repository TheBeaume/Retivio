import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Country, State, City } from "country-state-city";
import { countryConfig } from "../data/countryConfig";
export default function Settings() {
  const [loading, setLoading] = useState(false);
const countries = Country.getAllCountries();
const [form, setForm] = useState({
  business_name: "",
state: "",
city: "",
  whatsapp: "",
  email: "",
  address: "",
  instagram: "",
  website: "",

  country: "India",
  currency: "INR",
  timezone: "Asia/Kolkata",
  date_format: "DD/MM/YYYY",
  time_format: "12 Hours",
  phone_code: "+91",
currency_symbol: "₹",
tax_name: "GST",
tax_percentage: 0,
currency_position: "before",
decimal_places: 2,
  default_duration: 30,
  allow_double_booking: false,
});
const states = form.country
  ? State.getStatesOfCountry(
      countries.find((c) => c.name === form.country)?.isoCode
    )
  : [];

const cities = form.state
  ? City.getCitiesOfState(
      countries.find((c) => c.name === form.country)?.isoCode,
      states.find((s) => s.name === form.state)?.isoCode
    )
  : [];
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

country: data.country || "India",
state: data.state || "",
city: data.city || "",

phone_code: data.phone_code || "+91",

currency: data.currency || "INR",
currency_symbol: data.currency_symbol || "₹",

timezone: data.timezone || "Asia/Kolkata",

tax_name: data.tax_name || "GST",
tax_percentage: data.tax_percentage || 0,

currency_position: data.currency_position || "before",
decimal_places: data.decimal_places || 2,

date_format: data.date_format || "DD/MM/YYYY",

time_format: data.time_format || "12 Hours",

default_duration: data.default_duration || 30,
allow_double_booking: data.allow_double_booking || false,
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

console.log("Saving settings:", form);
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
<h3 className="text-lg font-semibold mt-6 mb-2">
  🌍 Regional Settings
</h3>

<div className="grid md:grid-cols-2 gap-4">

  <div>
    <label className="text-sm font-medium">Country</label>

    <select
      className="border p-3 rounded w-full"
      value={form.country}
      onChange={(e) => {
const selected = countries.find(
  (c) => c.name === e.target.value
);

const config = countryConfig[selected?.isoCode];
console.log(
  "ISO:",
  selected?.isoCode,
  "Country:",
  selected?.name,
  "Config:",
  countryConfig[selected?.isoCode]
);
setForm({
  ...form,

  country: selected?.name || "",

  phone_code: config?.phoneCode || "",

  currency: config?.currency || "",

  currency_symbol: config?.symbol || "",

  timezone: config?.timezone || "",

  tax_name: config?.taxName || "",

  date_format: config?.dateFormat || "DD/MM/YYYY",

  time_format: config?.timeFormat || "12 Hours",
});

      }}
    >
      <option value="">Select Country</option>

      {countries.map((country) => (
        <option
          key={country.isoCode}
          value={country.name}
        >
          {country.name}
        </option>
      ))}
    </select>

  </div>
<div>
  <label className="text-sm font-medium">
    State / Province
  </label>

  <select
    className="border p-3 rounded w-full"
    value={form.state}
    onChange={(e) =>
      setForm({
        ...form,
        state: e.target.value,
        city: "",
      })
    }
  >
    <option value="">Select State</option>

    {states.map((state) => (
      <option
        key={state.isoCode}
        value={state.name}
      >
        {state.name}
      </option>
    ))}
  </select>
</div>
  <div>

    <label className="text-sm font-medium">
      Phone Code
    </label>

    <input
      className="border p-3 rounded w-full"
      value={form.phone_code}
      readOnly
    />

  </div>
<div>
  <label className="text-sm font-medium">
    City
  </label>

  <select
    className="border p-3 rounded w-full"
    value={form.city}
    onChange={(e) =>
      setForm({
        ...form,
        city: e.target.value,
      })
    }
  >
    <option value="">Select City</option>

    {cities.map((city) => (
      <option
        key={city.name}
        value={city.name}
      >
        {city.name}
      </option>
    ))}
  </select>
</div>
</div>
<input
  className="border p-3 rounded"
  placeholder="Currency"
  value={form.currency}
  readOnly
/>

<input
  className="border p-3 rounded"
  placeholder="Currency Symbol"
  value={form.currency_symbol}
  readOnly
/>

<input
  className="border p-3 rounded"
  placeholder="Timezone"
  value={form.timezone}
  readOnly
/>

<input
  className="border p-3 rounded"
  placeholder="Tax Name"
  value={form.tax_name}
  readOnly
/>
<h3 className="text-lg font-semibold mt-8 mb-3">
  💰 Financial Settings
</h3>

<div className="grid md:grid-cols-2 gap-4">

  <input
    className="border p-3 rounded"
    type="number"
    placeholder="Tax Percentage"
    value={form.tax_percentage}
    onChange={(e) =>
      setForm({
        ...form,
        tax_percentage: e.target.value,
      })
    }
  />

  <select
    className="border p-3 rounded"
    value={form.currency_position}
    onChange={(e) =>
      setForm({
        ...form,
        currency_position: e.target.value,
      })
    }
  >

<option value="before">
  {form.currency_symbol}100
</option>

<option value="after">
  100{form.currency_symbol}
</option>
  </select>

  <select
    className="border p-3 rounded"
    value={form.decimal_places}
    onChange={(e) =>
      setForm({
        ...form,
        decimal_places: Number(e.target.value),
      })
    }
  >
    <option value={0}>0 Decimal</option>
    <option value={2}>2 Decimals</option>
    <option value={3}>3 Decimals</option>
  </select>

</div>
<div className="border rounded-lg p-4 bg-gray-50">
  <p className="text-sm text-gray-500 mb-1">
    Price Preview
  </p>

  <p className="text-2xl font-bold">
    {form.currency_position === "before"
      ? `${form.currency_symbol}250${form.decimal_places ? ".00" : ""}`
      : `250${form.decimal_places ? ".00" : ""}${form.currency_symbol}`}
  </p>
</div>
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
