import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Appointments() {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const [form, setForm] = useState({
    customer: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    loadAppointments();
  }, []);

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

    const { error } = await supabase
      .from("appointments")
      .insert([
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
              onChange={(e) =>
                setForm({ ...form, customer: e.target.value })
              }
              className="border rounded-lg p-3"
            />

            <input
              placeholder="Phone Number"
              value={form.phone}
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
                    {appointment.service}
                  </h3>

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

                </div>

                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
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

