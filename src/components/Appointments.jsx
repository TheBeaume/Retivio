import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Appointments() {
const [showForm, setShowForm] = useState(false);
async function saveAppointment() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase.from("appointments").insert([
    {
      user_id: user.id,
      service: form.service,
      appointment_date: form.date,
      appointment_time: form.time,
      notes: form.notes,
      status: "Scheduled",
    },
  ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Appointment Saved!");

  setShowForm(false);

  setForm({
    customer: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
}

const [form, setForm] = useState({
  customer: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  notes: "",
});

  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-3xl text-white p-8">
        <h1 className="text-4xl font-bold">
          📅 Appointments
        </h1>

        <p className="mt-3 text-purple-100">
          Manage your salon appointments in one place.
        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Today's Appointments</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Upcoming</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Cancelled</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

      </div>
<button
  onClick={() => setShowForm(!showForm)}
  className="mt-6 bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl hover:bg-purple-100"
>
  ➕ New Appointment
</button>
{showForm && (
  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-2xl font-bold mb-4">
      New Appointment
    </h2>

    <div className="grid gap-4">

<input
  placeholder="Customer Name"
  value={form.customer}
  onChange={(e) =>
    setForm({ ...form, customer: e.target.value })
  }
  className="border rounded-lg p-3"
/>

<input
  placeholder="Phone Number"
  value={form.phone || ""}
  onChange={(e) =>
    setForm({ ...form, phone: e.target.value })
  }
  className="border rounded-lg p-3"
/>

<input
  placeholder="Service"
  value={form.service}
  onChange={(e) =>
    setForm({ ...form, service: e.target.value })
  }
  className="border rounded-lg p-3"
/>

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
  className="border rounded-lg p-3"
/>

<button
  onClick={saveAppointment}
  className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3"
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

        <p className="text-gray-500">
          No appointments yet.
        </p>

      </div>

    </div>
  );
}
