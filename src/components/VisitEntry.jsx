import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { addCustomerVisit } from "../services/customerVisitService";

function VisitEntry({ customers, setCustomers }) {
const [phone, setPhone] = useState("");
const [service, setService] = useState("");
const [amount, setAmount] = useState("");
const customer = customers.find(
  (c) => c.phone === phone
);
useEffect(() => {
  if (customer) {
    setService(customer.service || "");
  }
}, [customer]);
const updateVisit = async () => {
if (!service) {
  alert("Please select a service");
  return;
}

if (!amount || Number(amount) <= 0) {
  alert("Please enter a valid bill amount");
  return;
}
const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  alert("User not found");
  return;
}
  const existingCustomer = customers.find(
    (c) => c.phone === phone
  );
console.log("Existing Customer:", existingCustomer);
  if (!existingCustomer) {
    alert("Customer Not Found");
    return;
  }

  const newVisits = existingCustomer.visits + 1;
  const newSpend =
    existingCustomer.totalSpend + Number(amount);

  let nextDue = "-";

  if (service === "Hair Spa") nextDue = "30 Days";
  if (service === "Facial") nextDue = "45 Days";
  if (service === "Cleanup") nextDue = "20 Days";
  if (service === "Hair Color") nextDue = "60 Days";
  if (service === "Hair Cut") nextDue = "30 Days";

  const loyalty =
    newVisits >= 10
      ? "VIP"
      : newVisits >= 5
      ? "Gold"
      : "Silver";

const { data, error } = await supabase
    .from("customers")
    .update({
      service: service,
      last_visit: new Date().toLocaleDateString(),
      next_due: nextDue,
      visits: newVisits,
      total_spend: newSpend,
      loyalty: loyalty,
      status: "Active",
    })
.eq("phone", phone)
.select("*")
.single();
console.log(data);
console.log(error);
console.log("Updated:", data);
console.log("Customer ID:", existingCustomer.id);

  if (error) {
    alert(error.message);
    return;
  }
try {
  await addCustomerVisit({
    customer_id: existingCustomer.id,
    service,
    amount: Number(amount),
    visit_date: new Date().toISOString().split("T")[0],
  });
} catch (e) {
  alert(e.message);
  return;
}

let followupDate = new Date();

if (service === "Hair Spa")
  followupDate.setDate(followupDate.getDate() + 30);

if (service === "Facial")
  followupDate.setDate(followupDate.getDate() + 45);

if (service === "Cleanup")
  followupDate.setDate(followupDate.getDate() + 20);

if (service === "Hair Color")
  followupDate.setDate(followupDate.getDate() + 60);

if (service === "Hair Cut")
  followupDate.setDate(followupDate.getDate() + 30);

const { data: existingFollowUp } = await supabase
  .from("follow_ups")
  .select("id")
  .eq("customer_id", existingCustomer.id)
  .eq("status", "Pending")
  .maybeSingle();

if (existingFollowUp) {
  await supabase
    .from("follow_ups")
    .update({
      service,
      followup_date: followupDate.toISOString().split("T")[0],
      priority: "Medium",
      notes: `${service} follow-up`,
    })
    .eq("id", existingFollowUp.id);
} else {
  await supabase
    .from("follow_ups")
    .insert({
      user_id: user.id,
      customer_id: existingCustomer.id,
      customer_name: existingCustomer.name,
      phone: existingCustomer.phone,
      service,
      followup_date: followupDate.toISOString().split("T")[0],
      status: "Pending",
      priority: "Medium",
      notes: `${service} follow-up`,
    });
}

  const updatedCustomers = customers.map((c) =>
    c.id === existingCustomer.id
      ? {
          ...c,
          service,
          lastVisit: new Date().toLocaleDateString(),
          nextDue,
          visits: newVisits,
          totalSpend: newSpend,
          loyalty,
          status: "Active",
        }
      : c
  );

  setCustomers(updatedCustomers);

  setPhone("");
  setService("");
  setAmount("");

  alert("Visit Updated Successfully");
};
return (
<div className="bg-white p-4 rounded shadow mt-6">
<h2 className="text-xl font-bold mb-4">
Visit Entry
</h2>

  <input
    type="text"
    placeholder="Mobile Number"
    value={phone}
    onChange={(e) =>
      setPhone(e.target.value)
    }
    className="border p-2 w-full mb-3"
  />

{customer && (
  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
    <p className="font-semibold text-green-700">
      ✅ Customer Found
    </p>

    <p>👤 {customer.name}</p>

    <p>⭐ {customer.loyalty}</p>

    <p>💰 ₹{customer.totalSpend}</p>

    <p>📅 Last Visit: {customer.lastVisit}</p>

    <p>🔁 Visits: {customer.visits}</p>
  </div>
)}
  <select
    value={service}
    onChange={(e) =>
      setService(e.target.value)
    }
    className="border p-2 w-full mb-3"
  >
    <option value="">
      Select Service
    </option>

    <option value="Hair Spa">
      Hair Spa
    </option>

    <option value="Facial">
      Facial
    </option>

    <option value="Cleanup">
      Cleanup
    </option>

    <option value="Hair Color">
      Hair Color
    </option>

    <option value="Hair Cut">
      Hair Cut
    </option>
  </select>

  <input
    type="number"
    placeholder="Bill Amount"
    value={amount}
    onChange={(e) =>
      setAmount(e.target.value)
    }
    className="border p-2 w-full mb-3"
  />

  <button
    onClick={updateVisit}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Update Visit
  </button>
</div>

);
}

export default VisitEntry;
