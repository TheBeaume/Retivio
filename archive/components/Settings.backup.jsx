import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { supabase } from "../lib/supabase";
import { countryConfig } from "../data/countryConfig";

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition";

function Field({ label, children, description }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {children}

      {description && (
        <p className="text-xs text-gray-500 mt-2">
          {description}
        </p>
      )}
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <section className="border border-gray-200 rounded-2xl p-5 md:p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}

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
    signature: "",
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

  const selectedCountry = countries.find(
    (country) => country.name === form.country
  );

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  const selectedState = states.find(
    (state) => state.name === form.state
  );

  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(
          selectedCountry.isoCode,
          selectedState.isoCode
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

    const { data, error } = await supabase
      .from("business_settings")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Settings load error:", error);
      return;
    }

    if (data) {
      setForm((current) => ({
        ...current,
        business_name: data.business_name || "",
        whatsapp: data.whatsapp || "",
        email: data.email || "",
        address: data.address || "",
        instagram: data.instagram || "",
        website: data.website || "",
        signature: data.signature || "",
        country: data.country || "India",
        state: data.state || "",
        city: data.city || "",
        phone_code: data.phone_code || "+91",
        currency: data.currency || "INR",
        currency_symbol: data.currency_symbol || "₹",
        timezone: data.timezone || "Asia/Kolkata",
        tax_name: data.tax_name || "GST",
        tax_percentage: data.tax_percentage ?? 0,
        currency_position:
          data.currency_position || "before",
        decimal_places: data.decimal_places ?? 2,
        date_format:
          data.date_format || "DD/MM/YYYY",
        time_format:
          data.time_format || "12 Hours",
        default_duration:
          data.default_duration || 30,
        allow_double_booking:
          data.allow_double_booking || false,
      }));
    }
  }

  async function saveSettings() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please sign in again.");
        return;
      }

      const { error } = await supabase
        .from("business_settings")
        .upsert(
          {
            user_id: user.id,
            ...form,
            tax_percentage:
              Number(form.tax_percentage) || 0,
            decimal_places:
              Number(form.decimal_places) || 0,
            default_duration:
              Number(form.default_duration) || 30,
          },
          {
            onConflict: "user_id",
          }
        );

      if (error) {
        alert(error.message);
        return;
      }

      alert("Business settings saved.");
    } finally {
      setLoading(false);
    }
  }

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const priceValue = Number(250).toFixed(
    Number(form.decimal_places)
  );

  const pricePreview =
    form.currency_position === "before"
      ? `${form.currency_symbol}${priceValue}`
      : `${priceValue}${form.currency_symbol}`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <p className="text-sm font-medium text-purple-600">
          BUSINESS CONFIGURATION
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-2">
          Business Settings
        </h2>

        <p className="text-gray-500 mt-2">
          Manage your business profile, regional preferences,
          pricing and appointment behaviour.
        </p>
      </div>

      <div className="space-y-5">
        <Section
          title="Business Details"
          description="Information used across your Retivio workspace."
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Business Name">
              <input
                className={inputClass}
                value={form.business_name}
                onChange={(e) =>
                  updateField(
                    "business_name",
                    e.target.value
                  )
                }
                placeholder="Enter business name"
              />
            </Field>

            <Field label="WhatsApp Number">
              <input
                className={inputClass}
                value={form.whatsapp}
                onChange={(e) =>
                  updateField("whatsapp", e.target.value)
                }
                placeholder="Business WhatsApp number"
              />
            </Field>

            <Field label="Business Email">
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
                placeholder="Business email"
              />
            </Field>

            <Field label="Website">
              <input
                className={inputClass}
                value={form.website}
                onChange={(e) =>
                  updateField("website", e.target.value)
                }
                placeholder="Website address"
              />
            </Field>

            <Field label="Instagram">
              <input
                className={inputClass}
                value={form.instagram}
                onChange={(e) =>
                  updateField("instagram", e.target.value)
                }
                placeholder="Instagram profile"
              />
            </Field>

            <Field label="Business Address">
              <input
                className={inputClass}
                value={form.address}
                onChange={(e) =>
                  updateField("address", e.target.value)
                }
                placeholder="Business address"
              />
            </Field>
          </div>
        </Section>

        <Section
          title="Report Signature"
          description="This signature will appear on downloaded business reports."
        >
          <Field label="Salon Signature">
            <textarea
              className={inputClass}
              rows={4}
              value={form.signature}
              onChange={(e) =>
                updateField("signature", e.target.value)
              }
              placeholder={"Authorized Signatory\nBusiness Owner"}
            />
          </Field>
        </Section>

        <Section
          title="Regional Settings"
          description="Country settings automatically configure regional defaults."
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Country">
              <select
                className={inputClass}
                value={form.country}
                onChange={(e) => {
                  const selected = countries.find(
                    (country) =>
                      country.name === e.target.value
                  );

                  const config =
                    countryConfig[selected?.isoCode];

                  setForm((current) => ({
                    ...current,
                    country: selected?.name || "",
                    state: "",
                    city: "",
                    phone_code:
                      config?.phoneCode || "",
                    currency:
                      config?.currency || "",
                    currency_symbol:
                      config?.symbol || "",
                    timezone:
                      config?.timezone || "",
                    tax_name:
                      config?.taxName || "",
                    date_format:
                      config?.dateFormat ||
                      "DD/MM/YYYY",
                    time_format:
                      config?.timeFormat ||
                      "12 Hours",
                  }));
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
            </Field>

            <Field label="State / Province">
              <select
                className={inputClass}
                value={form.state}
                disabled={!form.country}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    state: e.target.value,
                    city: "",
                  }))
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
            </Field>

            <Field label="City">
              <select
                className={inputClass}
                value={form.city}
                disabled={!form.state}
                onChange={(e) =>
                  updateField("city", e.target.value)
                }
              >
                <option value="">Select City</option>

                {cities.map((city) => (
                  <option
                    key={`${city.name}-${city.latitude}-${city.longitude}`}
                    value={city.name}
                  >
                    {city.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Phone Code">
              <input
                className={`${inputClass} bg-gray-50`}
                value={form.phone_code}
                readOnly
              />
            </Field>

            <Field label="Currency">
              <input
                className={`${inputClass} bg-gray-50`}
                value={form.currency}
                readOnly
              />
            </Field>

            <Field label="Timezone">
              <input
                className={`${inputClass} bg-gray-50`}
                value={form.timezone}
                readOnly
              />
            </Field>
          </div>
        </Section>

        <Section
          title="Tax and Currency"
          description="Control how prices and tax information are displayed."
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Tax Name">
              <input
                className={`${inputClass} bg-gray-50`}
                value={form.tax_name}
                readOnly
              />
            </Field>

            <Field label="Tax Percentage">
              <input
                type="number"
                min="0"
                className={inputClass}
                value={form.tax_percentage}
                onChange={(e) =>
                  updateField(
                    "tax_percentage",
                    e.target.value
                  )
                }
              />
            </Field>

            <Field label="Currency Position">
              <select
                className={inputClass}
                value={form.currency_position}
                onChange={(e) =>
                  updateField(
                    "currency_position",
                    e.target.value
                  )
                }
              >
                <option value="before">
                  Before amount
                </option>
                <option value="after">
                  After amount
                </option>
              </select>
            </Field>

            <Field label="Decimal Places">
              <select
                className={inputClass}
                value={form.decimal_places}
                onChange={(e) =>
                  updateField(
                    "decimal_places",
                    Number(e.target.value)
                  )
                }
              >
                <option value={0}>0 decimals</option>
                <option value={2}>2 decimals</option>
                <option value={3}>3 decimals</option>
              </select>
            </Field>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mt-5">
            <p className="text-sm text-gray-500">
              Price Preview
            </p>

            <p className="text-2xl font-bold text-gray-900 mt-1">
              {pricePreview}
            </p>
          </div>
        </Section>

        <Section
          title="Appointment Preferences"
          description="Set default appointment behaviour for your business."
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Default Appointment Duration">
              <select
                className={inputClass}
                value={form.default_duration}
                onChange={(e) =>
                  updateField(
                    "default_duration",
                    Number(e.target.value)
                  )
                }
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
              </select>
            </Field>

            <Field
              label="Double Booking"
              description="Allow more than one appointment in the same time slot."
            >
              <label className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 min-h-[50px]">
                <span className="text-sm text-gray-700">
                  Allow double booking
                </span>

                <input
                  type="checkbox"
                  checked={form.allow_double_booking}
                  onChange={(e) =>
                    updateField(
                      "allow_double_booking",
                      e.target.checked
                    )
                  }
                  className="h-5 w-5 accent-purple-600"
                />
              </label>
            </Field>
          </div>
        </Section>

        <div className="flex justify-end pt-2">
          <button
            onClick={saveSettings}
            disabled={loading}
            className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium px-7 py-3 rounded-xl transition"
          >
            {loading
              ? "Saving Settings..."
              : "Save Business Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
