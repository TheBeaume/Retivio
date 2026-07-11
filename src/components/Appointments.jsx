import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";
import CollectPaymentModal from "./payments/CollectPaymentModal";


export default function Appointments({ onOpenBilling }) {
const [showForm, setShowForm] = useState(false);
const [appointments, setAppointments] = useState([]);
const [services, setServices] = useState([]);
const [search, setSearch] = useState("");
const [dateFilter, setDateFilter] = useState("Today");
const [customDate, setCustomDate] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [sortBy, setSortBy] = useState("Time");
const [currentPage, setCurrentPage] = useState(1);
const appointmentsPerPage = 6;

const settings = useBusinessSettings();
const [form, setForm] = useState({
  customer: "",
  phone: "",
  service: "",
price: "",
duration: 30,
  bookingSource: "Manual",
  date: "",
  time: "",
  notes: "",
});
const [slotAvailability, setSlotAvailability] = useState(null);
const [customerFound, setCustomerFound] = useState(false);
const [customerInfo, setCustomerInfo] = useState(null);

const [isEditing, setIsEditing] = useState(false);
const [editingId, setEditingId] = useState(null);
const [showPaymentModal, setShowPaymentModal] = useState(false);
const [selectedAppointment, setSelectedAppointment] = useState(null);
const [showConflictModal, setShowConflictModal] = useState(false);
useEffect(() => {
  loadAppointments();
  loadServices();
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
})
.order("appointment_time", {
  ascending: true,
});
    if (error) {
      console.log(error);
      return;
    }
    setAppointments(data || []);
  }
async function loadServices() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error(error);
    return;
  }

  setServices(data || []);
}
function handleServiceChange(serviceName) {
  const selected = services.find(
    (s) => s.name === serviceName
  );

  if (!selected) {
    setForm({
      ...form,
      service: serviceName,
    });
    return;
  }

  setForm({
    ...form,
    service: selected.name,
    price: selected.price,
    duration: selected.duration,
  });
}
const filteredAppointments = appointments
  .filter((appointment) => {
const today = new Date().toLocaleDateString("en-CA");

    const matchesSearch =
      appointment.customer_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      appointment.phone?.includes(search) ||
      appointment.service
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      appointment.status === statusFilter;

let matchesDate = true;

const current = new Date();
const tomorrow = new Date(current);
tomorrow.setDate(current.getDate() + 1);

const appointmentDate = new Date(appointment.appointment_date);

switch (dateFilter) {
  case "Today":
    matchesDate =
      appointment.appointment_date === today;
    break;

  case "Tomorrow":
    matchesDate =
      appointment.appointment_date ===
tomorrow.toLocaleDateString("en-CA")
    break;

  case "This Week": {
    const start = new Date(current);
    start.setHours(0, 0, 0, 0);
    start.setDate(current.getDate() - current.getDay());

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    matchesDate =
      appointmentDate >= start &&
      appointmentDate <= end;
    break;
  }

  case "This Month":
    matchesDate =
      appointmentDate.getMonth() === current.getMonth() &&
      appointmentDate.getFullYear() === current.getFullYear();
    break;

  case "This Year":
    matchesDate =
      appointmentDate.getFullYear() === current.getFullYear();
    break;

case "Custom Date":
  matchesDate =
    appointment.appointment_date === customDate;
  break;

  case "All":
    matchesDate = true;
    break;

  default:
    matchesDate = true;
}

return (
  matchesSearch &&
  matchesStatus &&
  matchesDate
);
  })

.sort((a, b) => {
  switch (sortBy) {

    case "Time":
return (a.appointment_time || "").localeCompare(
  b.appointment_time || ""
);
    case "Newest Date":
      return new Date(b.appointment_date) - new Date(a.appointment_date);

    case "Oldest Date":
      return new Date(a.appointment_date) - new Date(b.appointment_date);

    case "Customer Name (A-Z)":
return (a.customer_name || "").localeCompare(
  b.customer_name || ""
);
    case "Customer Name (Z-A)":
return (b.customer_name || "").localeCompare(
  a.customer_name || ""
);
    default:
      return 0;
  }
});
useEffect(() => {
  async function checkSlotAvailability() {

    if (!form.date || !form.time) {
      setSlotAvailability(null);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("appointments")
      .select("customer_name, service")
      .eq("user_id", user.id)
      .eq("appointment_date", form.date)
      .eq("appointment_time", form.time);

    if (error) {
      console.error(error);
      return;
    }

    setSlotAvailability({
      available: data.length === 0,
      count: data.length,
      appointments: data,
    });
  }

  checkSlotAvailability();

}, [form.date, form.time]);
const totalAppointmentPages = Math.max(
  1,
  Math.ceil(filteredAppointments.length / appointmentsPerPage)
);

const paginatedAppointments = filteredAppointments.slice(
  (currentPage - 1) * appointmentsPerPage,
  currentPage * appointmentsPerPage
);

useEffect(() => {
  setCurrentPage(1);
}, [search, dateFilter, customDate, statusFilter, sortBy]);

useEffect(() => {
  if (currentPage > totalAppointmentPages) {
    setCurrentPage(totalAppointmentPages);
  }
}, [currentPage, totalAppointmentPages]);

async function saveAppointment(forceSave = false) {
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
last_visit: null,
        next_due: "-",
        visits: 0,
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
const { data: conflicts, error: conflictError } = await supabase
  .from("appointments")
  .select("customer_name, service, appointment_time, status")
  .eq("user_id", user.id)
  .eq("appointment_date", form.date)
  .eq("appointment_time", form.time);
console.log("Selected Date:", form.date);
console.log("Selected Time:", form.time);
console.log("Conflicts:", conflicts);

if (conflictError) {
  alert(conflictError.message);
  return;
}
if (conflicts.length > 0 && !forceSave) {
  setShowConflictModal(true);
  return;

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
price: Number(form.price) || 0,
duration: Number(form.duration) || 30,
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
async function updateAppointment() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("appointments")
    .update({
      customer_name: form.customer,
      phone: form.phone,
      service: form.service,
price: Number(form.price) || 0,
duration: Number(form.duration) || 30,    
  booking_source: form.bookingSource,
      appointment_date: form.date,
      appointment_time: form.time,
      notes: form.notes,
    })
    .eq("id", editingId)
    .eq("user_id", user.id);

  if (error) {
    alert(error.message);
    return;
  }

  await loadAppointments();

  setIsEditing(false);
  setEditingId(null);

  setForm({
    customer: "",
    phone: "",
    service: "",
price: "",
duration: 30,
    bookingSource: "Manual",
    date: "",
    time: "",
    notes: "",
  });

  setShowForm(false);

  alert("Appointment Updated!");
}
async function updateAppointmentStatus(appointment, status) {
  const id = appointment.id;
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
if (status === "Completed") {
  const followupDate = new Date();
  followupDate.setDate(followupDate.getDate() + 30);

  const { error: followupError } = await supabase
    .from("follow_ups")
    .insert({
      user_id: user.id,
      customer_id: appointment.id,
      customer_name: appointment.customer_name,
      phone: appointment.phone,
      service: appointment.service,
      followup_date: followupDate.toISOString().split("T")[0],
      status: "Pending",
      priority: "Medium",
      notes: "Auto-created after appointment completion",
    });

  if (followupError) {
    console.error(followupError);
  }
}
await loadAppointments();
} catch (e) {
  alert(e.message);
  console.error(e);
}
}

async function deleteAppointment(id) {
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
<>
    <div className="space-y-8">
<div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-3xl text-white p-8">

        <h1 className="text-4xl font-bold">
           Appointments
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
{
  appointments.filter(
    a =>
      a.appointment_date ===
      new Date().toISOString().split("T")[0]
  ).length
}
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
{appointments.filter(a => a.status === "Pending").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Cancelled
          </p>

<h2 className="text-3xl font-bold mt-2">
  {
    appointments.filter(
      a =>
        a.status === "Cancelled" &&
        a.appointment_date ===
          new Date().toISOString().split("T")[0]
    ).length
  }
</h2>
        </div>

      </div>

<div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">

  <input
    type="text"
    placeholder=" Search customer..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-lg px-4 py-2 w-full md:w-72"
  />

  <div className="flex gap-2 flex-wrap">

    <select
      value={dateFilter}
      onChange={(e) => setDateFilter(e.target.value)}
      className="border rounded-lg px-3 py-2"
    >
<option>Today</option>
<option>Tomorrow</option>
<option>This Week</option>
<option>This Month</option>
<option>Custom Date</option>
<option>All</option>
    </select>
{dateFilter === "Custom Date" && (
  <input
    type="date"
    value={customDate}
    onChange={(e) => setCustomDate(e.target.value)}
    className="border rounded-lg px-3 py-2"
  />
)}

    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="border rounded-lg px-3 py-2"
    >
      <option>All</option>
      <option>Pending</option>
      <option>Completed</option>
      <option>Cancelled</option>
    </select>

<select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="border rounded-lg px-3 py-2"
>
  <option>Time</option>
  <option>Newest Date</option>
  <option>Oldest Date</option>
  <option>Customer Name (A-Z)</option>
  <option>Customer Name (Z-A)</option>
</select>
  </div>


        <button
onClick={() => {
  setIsEditing(false);
  setEditingId(null);

  setForm({
    customer: "",
    phone: "",
    service: "",
    bookingSource: "Manual",
    date: "",
    time: "",
    notes: "",
  });

  setShowForm(true);
}}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
        >
           New Appointment
        </button>

      </div>

      {showForm && (

<div
  id="appointmentForm"
  className="bg-white rounded-xl shadow p-6"
>
<h2 className="text-2xl font-bold mb-6">
  {isEditing ? " Edit Appointment" : " New Appointment"}
</h2>
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
       Existing Customer
    </h3>

    <p> {customerInfo.name}</p>
    <p> {customerInfo.phone}</p>
    <p>⭐ {customerInfo.loyalty}</p>
    <p> Last Service: {customerInfo.service}</p>
    <p> Visits: {customerInfo.visits}</p>

  </div>

)}
<select
  value={form.service}
  onChange={(e) => handleServiceChange(e.target.value)}
  className="border rounded-lg p-3"
>
  <option value="">Select Service</option>

  {services.map((service) => (
    <option
      key={service.id}
      value={service.name}
    >
{service.name} • {formatCurrency(
  service.price,
  settings?.currency_symbol,
  settings?.currency_position,
  settings?.decimal_places
)}
    </option>
  ))}
</select>
<input
  type="number"
  placeholder="Price"
  value={form.price}
  onChange={(e) =>
    setForm({
      ...form,
      price: e.target.value,
    })
  }
  className="border rounded-lg p-3"
/>

<input
  type="number"
  placeholder="Duration (Minutes)"
  value={form.duration}
  onChange={(e) =>
    setForm({
      ...form,
      duration: e.target.value,
    })
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
  <option value="Manual"> Manual</option>
  <option value="WhatsApp"> WhatsApp</option>
  <option value="Phone Call"> Phone Call</option>
  <option value="Walk-in"> Walk-in</option>
  <option value="Website"> Website</option>
  <option value="Instagram"> Instagram</option>
  <option value="Facebook"> Facebook</option>
</select>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="border rounded-lg p-3"
            />
<select
  value={form.time}
  onChange={(e) =>
    setForm({ ...form, time: e.target.value })
  }
  className="border rounded-lg p-3"
>
  <option value="">Select Time</option>

  {Array.from({ length: 23 }, (_, i) => {
    const totalMinutes = 9 * 60 + i * 30;
    const hour = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const minute = String(totalMinutes % 60).padStart(2, "0");
    const time = `${hour}:${minute}`;

    return (
      <option key={time} value={time}>
        {time}
      </option>
    );
  })}
</select>

{slotAvailability && (
  <div
    className={`md:col-span-2 text-sm font-medium ${
      slotAvailability.available
        ? "text-green-600"
        : "text-red-600"
    }`}
  >
    {slotAvailability.available
      ? " This time slot is available"
      : ` ${slotAvailability.count} appointment(s) already booked`}
  </div>
)}
{slotAvailability &&
  !slotAvailability.available &&
  slotAvailability.appointments?.length > 0 && (
    <div className="md:col-span-2 mt-3 rounded-lg border border-red-200 bg-red-50 p-3">
      <h4 className="font-semibold text-red-700 mb-2">
        Existing Appointments
      </h4>

      <div className="space-y-2">
        {slotAvailability.appointments.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-2 text-sm"
          >
            <span className="font-medium">
              {form.time}
            </span>

            <span>
              {item.customer_name}
            </span>

            <span>
              {item.service}
            </span>
          </div>
        ))}
      </div>
    </div>
)}
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
onClick={() => {
  if (isEditing) {
    updateAppointment();
  } else {
    if (
      window.confirm(
        "Are you sure you want to book this appointment?"
      )
    ) {
      saveAppointment();
    }
  }
}}
  className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3 md:col-span-2"
>
  {isEditing ? "Update Appointment" : "Save Appointment"}
</button>
          </div>

        </div>

      )}
{!showForm && (

<div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Appointment List
        </h2>

        {appointments.length === 0 ? (

          <p className="text-gray-500">
            No appointments yet.
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

{paginatedAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-gray-200 rounded-2xl p-4 bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {appointment.customer_name}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                    <p className="text-sm text-gray-500 mt-2">
                      {appointment.phone || "No phone number"}
                    </p>

                    <p className="font-medium text-gray-800 mt-4">
                      {appointment.service}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Booking source:{" "}
                      {appointment.booking_source || "Manual"}
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500 mt-3">
                      <span>
                        Date: {appointment.appointment_date}
                      </span>

                      <span>
                        Time: {appointment.appointment_time}
                      </span>
                    </div>

                    {appointment.notes && (
                      <div className="bg-gray-50 rounded-xl px-4 py-3 mt-4">
                        <p className="text-xs font-medium text-gray-500">
                          Notes
                        </p>

                        <p className="text-sm text-gray-700 mt-1">
                          {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <button
                      onClick={() =>
                        updateAppointmentStatus(
                          appointment,
                          "Completed"
                        )
                      }
                      disabled={
                        appointment.status !== "Pending"
                      }
                      className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl text-sm font-semibold transition"
                    >
                      {appointment.status === "Completed"
                        ? "Completed"
                        : appointment.status === "Cancelled"
                        ? "Appointment Cancelled"
                        : "Mark Completed"}
                    </button>

                    <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setShowPaymentModal(true);
                        }}
                        disabled={
                          appointment.status !== "Completed" ||
                          appointment.payment_status === "Paid"
                        }
                        className="w-full border border-gray-200 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition"
                      >
                        {appointment.payment_status === "Paid"
                          ? "Payment Collected"
                          : "Collect Payment"}
                      </button>

                      {appointment.status === "Completed" &&
                        appointment.payment_status === "Paid" && (
                          <button
                            onClick={() =>
                              onOpenBilling?.(appointment)
                            }
                            className="w-full border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-2.5 rounded-lg text-sm font-semibold transition"
                          >
                            Generate Invoice
                          </button>
                        )}

                      <button
                        onClick={() => {
                          setForm({
                            customer:
                              appointment.customer_name || "",
                            phone: appointment.phone || "",
                            service: appointment.service || "",
                            bookingSource:
                              appointment.booking_source ||
                              "Manual",
                            date:
                              appointment.appointment_date ||
                              "",
                            time:
                              appointment.appointment_time ||
                              "",
                            notes: appointment.notes || "",
                          });

                          setEditingId(appointment.id);
                          setIsEditing(true);
                          setShowForm(true);

                          setTimeout(() => {
                            document
                              .getElementById(
                                "appointmentForm"
                              )
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                          }, 100);
                        }}
                        disabled={
                          appointment.status !== "Pending"
                        }
                        className="w-full border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 px-4 py-2.5 rounded-lg text-sm transition"
                      >
                        Edit Appointment
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Cancel this appointment?"
                            )
                          ) {
                            updateAppointmentStatus(
                              appointment,
                              "Cancelled"
                            );
                          }
                        }}
                        disabled={
                          appointment.status !== "Pending"
                        }
                        className="w-full border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 px-4 py-2.5 rounded-lg text-sm transition"
                      >
                        Cancel Appointment
                      </button>

                      <button
                        onClick={() =>
                          deleteAppointment(appointment.id)
                        }
                        className="w-full text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-lg text-sm transition"
                      >
                        Delete Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>

        )}

        {filteredAppointments.length > appointmentsPerPage && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-5 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {(currentPage - 1) * appointmentsPerPage + 1}
              {" - "}
              {Math.min(
                currentPage * appointmentsPerPage,
                filteredAppointments.length
              )}
              {" of "}
              {filteredAppointments.length} appointments
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                disabled={currentPage === 1}
                className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>

              <span className="px-3 text-sm text-gray-600">
                Page {currentPage} of {totalAppointmentPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalAppointmentPages, page + 1)
                  )
                }
                disabled={currentPage === totalAppointmentPages}
                className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>

)}
  
{showConflictModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">

      <h2 className="text-xl font-bold text-red-600">
        Appointment Already Booked
      </h2>

      <p className="mt-3 text-gray-600">
        This time slot already has one or more appointments.
        <br />
        Do you still want to continue?
      </p>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowConflictModal(false)}
          className="border px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            setShowConflictModal(false);
            await saveAppointment(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Book Anyway
        </button>

      </div>

    </div>
  </div>
)}
  </div>
 
<CollectPaymentModal
  open={showPaymentModal}
  appointment={selectedAppointment}
  onClose={() => {
    setShowPaymentModal(false);
    setSelectedAppointment(null);
  }}
  onSuccess={loadAppointments}
/>
</>
 );
}

