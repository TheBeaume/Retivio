import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import CustomerLookup from "./CustomerLookup";

export default function Appointments() {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState([]);

const [form, setForm] = useState({
  customer: "",
  phone: "",
  service: "",
  bookingSource: "Manual",
  date: "",
  time: "",
  notes: "",
});
const [customerFound, setCustomerFound] = useState(false);
const [customerInfo, setCustomerInfo] = useState(null);
  useEffect(() => {
    loadAppointments();
  }, []);
async function findCustomer(phone) {
  if (phone.length < 10) {
    setCustomerFound(false);
    setCustomerInfo(null);
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("customers")
    .select("*")
    .eq("phone", phone)
    .eq("user_id", user.id)
    .single();

  if (data) {
    setCustomerFound(true);
    setCustomerInfo(data);

    setForm((prev) => ({
      ...prev,
      customer: data.name,
    }));
  } else {
    setCustomerFound(false);
    setCustomerInfo(null);
  }
}
  async function loadAppointments() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id)
      .order("appointment_date", {
        ascending: true,
      });

    if (error) {
      console.log(error);
      return;
    }

    setAppointments(data || []);
  }

  async function saveAppointment() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
let customerId = null;

if (!customerFound) {

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .insert([
      {
        user_id: user.id,
        name: form.customer,
        phone: form.phone,
        service: form.service,
        last_visit: form.date,
        next_due: "-",
        visits: 1,
        total_spend: 0,
        loyalty: "Silver",
        status: "New",
      },
    ])
    .select()
    .single();

  if (customerError) {
    alert(customerError.message);
    return;
  }

  customerId = customer.id;

} else {

  customerId = customerInfo.id;

}
    const { error } = await supabase
      .from("appointments")
      .insert([
        {
          user_id: user.id,
customer_id: customerId,
customer_name: form.customer,
phone: form.phone, 
service: form.service,
booking_source: form.bookingSource,
appointment_date: form.date,
appointment_time: form.time,
notes: form.notes,
status: "Pending",
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    await loadAppointments();

    setForm({
      customer: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      notes: "",
    });

    setShowForm(false);

    alert("Appointment Saved!");

  }
async function updateAppointmentStatus(id, status) {
try {
const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  alert("User not logged in");
  return;
}

const { error } = await supabase
  .from("appointments")
  .update({ status })
  .eq("id", id)
  .eq("user_id", user.id);

if (error) {
  alert(error.message);
  return;
}
await loadAppointments();
} catch (e) {
  alert(e.message);
  console.error(e);
}
}

async function deleteAppointment(id) {
alert(`Delete: ${id}`);
  const ok = window.confirm("Delete this appointment?");

  if (!ok) return;

  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  await loadAppointments();
}
  return (

    <div className="space-y-8">
<div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-3xl text-white p-8">

        <h1 className="text-4xl font-bold">
          📅 Appointments
        </h1>

        <p className="mt-3 text-purple-100">
          Manage all your salon appointments in one place.
        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Today's Appointments
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {appointments.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Completed
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {appointments.filter(a => a.status === "Completed").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Scheduled
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {appointments.filter(a => a.status === "Scheduled").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Cancelled
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {appointments.filter(a => a.status === "Cancelled").length}
          </h2>
        </div>

      </div>

      <div className="flex justify-end">

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
        >
          ➕ New Appointment
        </button>

      </div>

      {showForm && (

        <div className="bg-white rounded-xl shadow p-6">

          <div className="grid md:grid-cols-2 gap-4">
<input
  placeholder="Customer Name"
  value={form.customer}
  readOnly={customerFound}
  onChange={(e) =>
    setForm({ ...form, customer: e.target.value })
  }
  className={`border rounded-lg p-3 ${
    customerFound ? "bg-gray-100 cursor-not-allowed" : ""
  }`}
/>

<input
  placeholder="Mobile Number"
  value={form.phone}
  onChange={(e) => {
    const phone = e.target.value;

    setForm({
      ...form,
      phone,
    });

    if (phone.length === 10) {
      findCustomer(phone);
    }
  }}
  className="border rounded-lg p-3"
/>

{customerFound && customerInfo && (

  <div className="md:col-span-2 bg-green-50 border border-green-200 rounded-xl p-4">

    <h3 className="font-bold text-green-700">
      ✅ Existing Customer
    </h3>

    <p>👤 {customerInfo.name}</p>
    <p>📞 {customerInfo.phone}</p>
    <p>⭐ {customerInfo.loyalty}</p>
    <p>💇 Last Service: {customerInfo.service}</p>
    <p>📅 Visits: {customerInfo.visits}</p>

  </div>

)}
            <input
              placeholder="Service"
              value={form.service}
              onChange={(e) =>
                setForm({ ...form, service: e.target.value })
              }
              className="border rounded-lg p-3"
            />
<select
  value={form.bookingSource}
  onChange={(e) =>
    setForm({ ...form, bookingSource: e.target.value })
  }
  className="border rounded-lg p-3"
>
  <option value="Manual">📝 Manual</option>
  <option value="WhatsApp">💬 WhatsApp</option>
  <option value="Phone Call">📞 Phone Call</option>
  <option value="Walk-in">🚶 Walk-in</option>
  <option value="Website">🌐 Website</option>
  <option value="Instagram">📷 Instagram</option>
  <option value="Facebook">📘 Facebook</option>
</select>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="border rounded-lg p-3"
            />

            <input
              type="time"
              value={form.time}
              onChange={(e) =>
                setForm({ ...form, time: e.target.value })
              }
              className="border rounded-lg p-3"
            />

            <textarea
              placeholder="Notes"
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
              className="border rounded-lg p-3 md:col-span-2"
              rows={3}
            />

            <button
              onClick={saveAppointment}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3 md:col-span-2"
            >
              Save Appointment
            </button>

          </div>

        </div>

      )}
<div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          Appointment List
        </h2>

        {appointments.length === 0 ? (

          <p className="text-gray-500">
            No appointments yet.
          </p>

        ) : (

          <div className="space-y-3">

            {appointments.map((appointment) => (

              <div
                key={appointment.id}
                className="flex justify-between items-center border rounded-xl p-4"
              >

                <div>

<h3 className="font-semibold text-lg">
  👤 {appointment.customer_name || "Customer"}
</h3>

<p className="text-sm text-gray-500">
  📞 {appointment.phone || "-"}
</p>

<p className="mt-2 font-medium">
  💇 {appointment.service}
</p>

<p className="text-sm text-gray-500">
  💬 {appointment.booking_source || "Manual"}
</p>
<p className="text-sm text-gray-500">
  📞 {appointment.phone || "N/A"}
</p>

<p className="font-medium mt-2">
  💇 {appointment.service}
</p>

                  <p className="text-sm text-gray-500">
                    📅 {appointment.appointment_date}
                  </p>

                  <p className="text-sm text-gray-500">
                    🕒 {appointment.appointment_time}
                  </p>

                  {appointment.notes && (
                    <p className="text-sm text-gray-500">
                      📝 {appointment.notes}
                    </p>
                  )}
<div className="flex gap-2 mt-3">

<button
  onClick={() => alert("Edit clicked")}
  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
>
  ✏️ Edit
</button>
<button
  onClick={() => {
    alert("Complete clicked");
    updateAppointmentStatus(appointment.id, "Completed");
  }}
  className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
>
  ✅ Complete
</button>
<button
  onClick={() =>
    updateAppointmentStatus(appointment.id, "Cancelled")
  }
  className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
>
  ❌ Cancel
</button>

<button
  onClick={() => deleteAppointment(appointment.id)}
  className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
>
  🗑 Delete
</button>

</div>
                </div>

<span
  className={`px-3 py-1 rounded-full text-sm font-medium ${
    appointment.status === "Completed"
      ? "bg-green-100 text-green-700"
      : appointment.status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-purple-100 text-purple-700"
  }`}
>
  {appointment.status}
</span>
              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

