import React, { useState, useMemo, useEffect } from "react";
import { supabase } from "../lib/supabase";
import CustomerSelectionList from "./CustomerSelectionList";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";

export default function CampaignBuilder({ customers = [] }) {
const settings = useBusinessSettings(); 
 const [campaignType, setCampaignType] = useState("Reactivation");
  const [offer, setOffer] = useState("No Offer");
  const [customOffer, setCustomOffer] = useState("");
  const [tone, setTone] = useState("Friendly");



const [filters, setFilters] = useState({
  due: false,

  inactive30: false,
  inactive60: false,
  inactive90: false,

  vip: false,
  gold: false,

  hairSpa: false,
  facial: false,
  haircut: false,
});
const [businessName, setBusinessName] = useState("Your Salon");
const [selectedCustomers, setSelectedCustomers] = useState([]);
const [campaignQueue, setCampaignQueue] = useState([]);
const [currentCampaignIndex, setCurrentCampaignIndex] = useState(0);
const [conversionRate, setConversionRate] = useState(30);
const [averageBill, setAverageBill] = useState(700);
const [showPreview, setShowPreview] = useState(false);
  const toggleFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
function toggleCustomer(id) {
  setSelectedCustomers((prev) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
  );
}
  const filteredCustomers = useMemo(() => {
    const today = new Date();
const hasFilter = Object.values(filters).some(Boolean);

if (!hasFilter) {
  return [];
}
    return customers.filter((c) => {
      if (filters.due) {
        if (!c.nextDue) return false;

        if (new Date(c.nextDue) > today)
          return false;
      }

if (filters.inactive30) {
  if (!c.lastVisit) return false;

  const days =
    (today - new Date(c.lastVisit)) /
    (1000 * 60 * 60 * 24);

  if (days < 30 || days >= 60) return false;
}
if (filters.inactive60) {
  if (!c.lastVisit) return false;

  const days =
    (today - new Date(c.lastVisit)) /
    (1000 * 60 * 60 * 24);

if (days < 60 || days >= 90) return false;
}

if (filters.inactive90) {
  if (!c.lastVisit) return false;

  const days =
    (today - new Date(c.lastVisit)) /
    (1000 * 60 * 60 * 24);

  if (days < 90) return false;
}
      if (filters.vip && c.loyalty !== "VIP")
        return false;

      if (filters.gold && c.loyalty !== "Gold")
        return false;

      if (filters.hairSpa && c.service !== "Hair Spa")
        return false;

      if (filters.facial && c.service !== "Facial")
        return false;

      if (filters.haircut && c.service !== "Hair Cut")
        return false;

      return true;
    });
  }, [customers, filters]);

const estimatedRevenue = Math.round(
  selectedCustomers.length *
  ((Number(conversionRate) || 0) / 100) *
  (Number(averageBill) || 0)
);
const previewCustomer =
  filteredCustomers.find((c) =>
    selectedCustomers.includes(c.id)
) || filteredCustomers[0];
useEffect(() => {
  loadBusinessName();
}, []);

async function loadBusinessName() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("business_settings")
    .select("business_name")
    .eq("user_id", user.id)
    .single();

  if (!error && data?.business_name) {
    setBusinessName(data.business_name);
  }
}
function generateMessage(customer) {
  if (!customer) return "";

  const offerText =
    offer === "No Offer"
      ? ""
      : offer === "Custom"
      ? customOffer
      : `Enjoy ${offer} on your next visit.`;

  let greeting = `Hi ${customer.name} 👋`;
  let closing = `Regards,\n\n${businessName}`;

  if (tone === "Professional") {
    greeting = `Dear ${customer.name},`;
    closing = `Kind Regards,\n\n${businessName}`;
  } else if (tone === "Luxury") {
    greeting = `✨ Dear ${customer.name},`;
    closing = `Warm Regards,\n\n${businessName}`;
  }

  switch (campaignType) {
    case "Birthday":
      return `${greeting}

🎉 Happy Birthday!

Wishing you happiness, health and beauty always.

${offerText}

${closing}`;

    case "Festival":
      return `${greeting}

🌸 Warm wishes from ${businessName}!

${offerText}

We look forward to seeing you soon.

${closing}`;

    case "VIP":
      return `${greeting}

💎 Thank you for being one of our valued VIP customers.

${offerText}

We can't wait to welcome you again.

${closing}`;

    default:
      return `${greeting}

We hope you're doing well.

It's time for your ${customer.service}.

${offerText}

${closing}`;
  }
}
const openWhatsApp = () => {
  const customersToSend = filteredCustomers.filter((customer) =>
    selectedCustomers.includes(customer.id)
  );

  if (customersToSend.length === 0) {
    alert("Please select at least one customer.");
    return;
  }

  setCampaignQueue(customersToSend);
  setCurrentCampaignIndex(0);

  openCustomerWhatsApp(customersToSend[0]);
};

function openCustomerWhatsApp(customer) {
  if (!customer?.phone) {
    alert("Customer phone number not found.");
    return;
  }

  let phone = customer.phone.replace(/\D/g, "");

  if (phone.length === 10) {
    phone = `91${phone}`;
  }

  const message = generateMessage(customer);

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

const openNextCustomer = () => {
  const nextIndex = currentCampaignIndex + 1;

  if (nextIndex >= campaignQueue.length) {
    alert("Campaign queue completed.");
    setCampaignQueue([]);
    setCurrentCampaignIndex(0);
    return;
  }

  setCurrentCampaignIndex(nextIndex);
  openCustomerWhatsApp(campaignQueue[nextIndex]);
};
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-2xl font-bold mb-6">
        📢 Campaign Builder
      </h2>
<div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="font-semibold">Campaign Type</label>

          <select
            value={campaignType}
            onChange={(e) => setCampaignType(e.target.value)}
            className="w-full border rounded-lg p-2 mt-2"
          >
            <option>Reactivation</option>
            <option>Birthday</option>
            <option>Festival</option>
            <option>VIP</option>
            <option>New Launch</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Offer</label>

          <select
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            className="w-full border rounded-lg p-2 mt-2"
          >
            <option>No Offer</option>
<option>{settings?.currency_symbol || "₹"}100 OFF</option>
<option>{settings?.currency_symbol || "₹"}200 OFF</option>
            <option>10% OFF</option>
            <option>15% OFF</option>
            <option>20% OFF</option>
            <option>Free Hair Wash</option>
            <option>Free Head Massage</option>
            <option>Custom</option>
          </select>
        </div>

      </div>

      {offer === "Custom" && (
        <textarea
          value={customOffer}
          onChange={(e) => setCustomOffer(e.target.value)}
          placeholder="Enter custom offer..."
          className="w-full border rounded-lg p-3 mt-4"
        />
      )}

      <div className="mt-6">

        <label className="font-semibold">
          Message Tone
        </label>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full border rounded-lg p-2 mt-2"
        >
          <option>Friendly</option>
          <option>Professional</option>
          <option>Luxury</option>
          <option>Festival</option>
        </select>

      </div>

      <div className="mt-8">

        <h3 className="font-bold text-lg mb-4">
          Target Customers
        </h3>

        <div className="grid grid-cols-2 gap-3">

          <label>
            <input
              type="checkbox"
              checked={filters.due}
              onChange={() => toggleFilter("due")}
            />{" "}
            Due Customers
          </label>
<label>
  <input
    type="checkbox"
    checked={filters.inactive30}
    onChange={() => toggleFilter("inactive30")}
  />{" "}
  30+ Days Inactive
</label>

<label>
  <input
    type="checkbox"
    checked={filters.inactive60}
    onChange={() => toggleFilter("inactive60")}
  />{" "}
  60+ Days Inactive
</label>

<label>
  <input
    type="checkbox"
    checked={filters.inactive90}
    onChange={() => toggleFilter("inactive90")}
  />{" "}
  90+ Days Inactive
</label>
          <label>
            <input
              type="checkbox"
              checked={filters.vip}
              onChange={() => toggleFilter("vip")}
            />{" "}
            VIP Customers
          </label>

          <label>
            <input
              type="checkbox"
              checked={filters.gold}
              onChange={() => toggleFilter("gold")}
            />{" "}
            Gold Customers
          </label>

          <label>
            <input
              type="checkbox"
              checked={filters.hairSpa}
              onChange={() => toggleFilter("hairSpa")}
            />{" "}
            Hair Spa
          </label>

          <label>
            <input
              type="checkbox"
              checked={filters.facial}
              onChange={() => toggleFilter("facial")}
            />{" "}
            Facial
          </label>

          <label>
            <input
              type="checkbox"
              checked={filters.haircut}
              onChange={() => toggleFilter("haircut")}
            />{" "}
            Hair Cut
          </label>

        </div>

      </div>
<div className="mt-8 bg-gray-50 rounded-xl p-5">

        <h3 className="text-xl font-bold mb-4">
          📊 Campaign Preview
        </h3>
<div className="mb-4 text-sm font-medium text-purple-700">
  Selected Customers: {selectedCustomers.length}
</div>
        <div className="grid grid-cols-2 gap-4">

          <div className="bg-white rounded-lg p-4 shadow">
<p className="text-gray-500">
  Customers Matched
</p>

            <h2 className="text-3xl font-bold">
              {filteredCustomers.length}
            </h2>
          </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Expected Conversion (%)
    </label>

    <input
      type="number"
      value={conversionRate}
      onChange={(e) =>
setConversionRate(e.target.value)
      }
      className="border rounded-lg px-3 py-2 w-full"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
Average Bill ({settings?.currency_symbol || "₹"})
    </label>

    <input
      type="number"
      value={averageBill}
      onChange={(e) =>
setAverageBill(e.target.value)
      }
      className="border rounded-lg px-3 py-2 w-full"
    />
  </div>

</div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-gray-500">
              Estimated Revenue
            </p>

            <h2 className="text-3xl font-bold text-green-600">
{formatCurrency(
  estimatedRevenue,
  settings?.currency_symbol,
  settings?.currency_position,
  settings?.decimal_places
)}
            </h2>
          </div>

        </div>

<div className="grid grid-cols-2 gap-4 mb-4">

        {filteredCustomers.length > 0 && (

          <div className="bg-white rounded-xl shadow p-4 mt-6">

            <h4 className="font-bold mb-3">
              Sample WhatsApp Message
            </h4>

            <div className="whitespace-pre-line text-gray-700">

<div className="mt-4 bg-gray-50 rounded-lg p-4 whitespace-pre-line">
  {previewCustomer && generateMessage(previewCustomer)}
</div>

            </div>

          </div>

        )}

        {filteredCustomers.length === 0 && (

          <div className="bg-yellow-50 border rounded-lg p-4 mt-6">

            No customers found with selected filters.

          </div>

        )}

      </div>

<CustomerSelectionList
  customers={filteredCustomers}
  selectedCustomers={selectedCustomers}
  toggleCustomer={toggleCustomer}
  setSelectedCustomers={setSelectedCustomers}
/>
{showPreview && (
  <div className="bg-white border rounded-xl shadow-lg p-6 mt-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">
        📋 Campaign Preview
      </h3>

      <button
        onClick={() => setShowPreview(false)}
        className="text-red-600 font-bold"
      >
        ✕
      </button>
    </div>

    <p><strong>Campaign:</strong> {campaignType}</p>
    <p><strong>Offer:</strong> {offer === "Custom" ? customOffer : offer}</p>
    <p><strong>Tone:</strong> {tone}</p>
    <p><strong>Customers Selected:</strong> {selectedCustomers.length}</p>
<p>
  <strong>Estimated Revenue:</strong>{" "}
  {formatCurrency(
    estimatedRevenue,
    settings?.currency_symbol,
    settings?.currency_position,
    settings?.decimal_places
  )}
</p>

    <div className="mt-4 bg-gray-50 rounded-lg p-4 whitespace-pre-line">
{previewCustomer && generateMessage(previewCustomer)}

    </div>
  </div>
)}
      <div className="flex gap-4 mt-8">

<button
  onClick={() => setShowPreview(true)}
  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
>
  Preview Campaign
</button>
<button
  onClick={openWhatsApp}
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
>
  Open WhatsApp
</button>
{campaignQueue.length > 0 && (
  <button
    onClick={openNextCustomer}
    className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg"
  >
    Next Customer ({currentCampaignIndex + 1}/{campaignQueue.length})
  </button>
)}
      </div>
<div className="mt-8 text-sm text-gray-500 border-t pt-4">
        <p>
          💡 Tip: Review the campaign before sending it to customers.
        </p>
      </div>

    </div>
  );
}
