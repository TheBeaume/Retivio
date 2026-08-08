import React, { useEffect, useState } from "react";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  IndianRupee,
  Search,
  User,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { addCustomerVisit } from "../services/customerVisitService";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";

function VisitEntry({ customers, setCustomers }) {
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");
  const [services, setServices] = useState([]);
  const [saving, setSaving] = useState(false);

  const settings = useBusinessSettings();

  const customer = customers.find(
    (item) => String(item.phone || "") === phone
  );

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    if (customer) {
      setService(customer.service || "");
    }
  }, [customer]);

  async function loadServices() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("name");

    setServices(data || []);
  }

  function getFollowUpDays(serviceName) {
    const selectedService = services.find(
      (item) => item.name === serviceName
    );

    if (selectedService?.followup_days) {
      return Number(selectedService.followup_days);
    }

    const defaults = {
      "Hair Spa": 30,
      Facial: 45,
      Cleanup: 20,
      "Hair Color": 60,
      "Hair Cut": 30,
    };

    return defaults[serviceName] || 30;
  }

  async function updateVisit() {
    if (!customer) {
      alert("Customer not found.");
      return;
    }

    if (!service) {
      alert("Please select a service.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid bill amount.");
      return;
    }

    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not found.");
      }

      const newVisits = Number(customer.visits || 0) + 1;
      const newSpend =
        Number(customer.totalSpend || 0) + Number(amount);

      const followUpDays = getFollowUpDays(service);
      const visitDate = new Date();

      const followupDate = new Date();
      followupDate.setDate(
        followupDate.getDate() + followUpDays
      );

      const loyalty =
        newVisits >= 10
          ? "VIP"
          : newVisits >= 5
          ? "Gold"
          : "Silver";

      const { data, error } = await supabase
        .from("customers")
        .update({
          service,
          last_visit: visitDate.toLocaleDateString(),
          next_due: `${followUpDays} Days`,
          visits: newVisits,
          total_spend: newSpend,
          loyalty,
          status: "Active",
        })
        .eq("id", customer.id)
        .eq("user_id", user.id)
        .select("*")
        .single();

      if (error) throw error;

      await addCustomerVisit({
        customer_id: customer.id,
        service,
        amount: Number(amount),
        visit_date: visitDate.toISOString().split("T")[0],
      });

      const { data: existingFollowUp } = await supabase
        .from("follow_ups")
        .select("id")
        .eq("customer_id", customer.id)
        .eq("status", "Pending")
        .maybeSingle();

      const followUpPayload = {
        service,
        followup_date: followupDate
          .toISOString()
          .split("T")[0],
        priority: "Medium",
        notes: `${service} follow-up`,
      };

      if (existingFollowUp) {
        await supabase
          .from("follow_ups")
          .update(followUpPayload)
          .eq("id", existingFollowUp.id);
      } else {
        await supabase.from("follow_ups").insert({
          user_id: user.id,
          customer_id: customer.id,
          customer_name: customer.name,
          phone: customer.phone,
          ...followUpPayload,
          status: "Pending",
        });
      }

      const updatedCustomers = customers.map((item) =>
        item.id === customer.id
          ? {
              ...item,
              service,
              lastVisit: data.last_visit,
              nextDue: data.next_due,
              visits: newVisits,
              totalSpend: newSpend,
              loyalty,
              status: "Active",
            }
          : item
      );

      setCustomers(updatedCustomers);
      setPhone("");
      setService("");
      setAmount("");

      alert("Visit updated successfully.");
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to update visit.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 md:p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
          Customer Activity
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-1">
          Visit Entry
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Find a customer and record a completed service visit.
        </p>
      </div>

      <div className="relative">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="tel"
          placeholder="Enter customer mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        />
      </div>

      {phone && !customer && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-sm font-medium text-amber-800">
            No customer found for this mobile number.
          </p>
        </div>
      )}

      {customer && (
        <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <User size={21} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  {customer.name}
                </p>

                <div className="flex items-center gap-1.5 text-sm text-green-700 mt-1">
                  <CheckCircle2 size={15} />
                  Customer found
                </div>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
              {customer.loyalty || "Silver"}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <Award size={17} className="text-gray-400" />
              <p className="text-xs text-gray-500 mt-2">
                Visits
              </p>
              <p className="font-semibold text-gray-900">
                {customer.visits || 0}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <IndianRupee
                size={17}
                className="text-gray-400"
              />
              <p className="text-xs text-gray-500 mt-2">
                Total Spend
              </p>
              <p className="font-semibold text-gray-900 truncate">
                {formatCurrency(
                  customer.totalSpend,
                  settings?.currency_symbol,
                  settings?.currency_position,
                  settings?.decimal_places
                )}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3 col-span-2 md:col-span-2">
              <CalendarDays
                size={17}
                className="text-gray-400"
              />
              <p className="text-xs text-gray-500 mt-2">
                Last Visit
              </p>
              <p className="font-semibold text-gray-900">
                {customer.lastVisit || "No previous visit"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Service
          </label>

          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:border-purple-500"
          >
            <option value="">Select service</option>

            {services.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Bill Amount
          </label>

          <input
            type="number"
            min="0"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <button
        onClick={updateVisit}
        disabled={saving || !customer}
        className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed text-white px-7 py-3 rounded-xl font-semibold mt-5 transition"
      >
        {saving ? "Updating Visit..." : "Update Visit"}
      </button>
    </div>
  );
}

export default VisitEntry;
