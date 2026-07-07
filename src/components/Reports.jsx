import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import useBusinessSettings from "../hooks/useBusinessSettings";
import { formatCurrency } from "../utils/formatCurrency";
export default function Reports() {
const [totalCustomers, setTotalCustomers] = useState(0);
const [totalRevenue, setTotalRevenue] = useState(0);
const [appointments, setAppointments] = useState(0);
const [todayAppointments, setTodayAppointments] = useState(0);
const [completedAppointments, setCompletedAppointments] = useState(0);
const [cancelledAppointments, setCancelledAppointments] = useState(0);
const settings = useBusinessSettings();
useEffect(() => {
  loadCustomers();
}, []);

async function loadCustomers() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

const { data, error } = await supabase
  .from("customers")
  .select("*")
  .eq("user_id", user.id);
if (error) {
  console.log(error);
  return;
}

setTotalCustomers(data.length);
const customerRevenue = data.reduce(
  (sum, c) => sum + (Number(c.total_spend) || 0),
  0
);

const { count: appointmentCount } = await supabase
  .from("appointments")
.select("*", { count: "exact", head: true })
.eq("user_id", user.id);

setAppointments(appointmentCount || 0);
const today = new Date().toLocaleDateString("en-CA");

const { data: appointmentData } = await supabase
  .from("appointments")
  .select("status, appointment_date, price")
  .eq("user_id", user.id);

const appointmentRevenue = appointmentData
  .filter((a) => a.status === "Completed")
  .reduce(
    (sum, a) => sum + Number(a.price || 0),
    0
  );

setTotalRevenue(
  customerRevenue + appointmentRevenue
);
if (appointmentData) {
  setTodayAppointments(
    appointmentData.filter(
      (a) => a.appointment_date === today
    ).length
  );

  setCompletedAppointments(
    appointmentData.filter(
      (a) => a.status === "Completed"
    ).length
  );

  setCancelledAppointments(
    appointmentData.filter(
      (a) => a.status === "Cancelled"
    ).length
  );
}
}
 return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        📈 Business Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Revenue</p>
<h2 className="text-3xl font-bold mt-2">
{formatCurrency(
  totalRevenue,
  settings?.currency_symbol,
  settings?.currency_position,
  settings?.decimal_places
)}
</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Customers</p>
<h2 className="text-3xl font-bold mt-2">
  {totalCustomers}
</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Appointments</p>
<h2 className="text-3xl font-bold mt-2">
  {appointments}
</h2>

</div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          📅 Appointment Summary
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Today's Appointments</h3>
<p className="text-2xl font-bold mt-2">
  {todayAppointments}
</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Completed</h3>
<p className="text-2xl font-bold mt-2">
  {completedAppointments}
</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Cancelled</h3>
<p className="text-2xl font-bold mt-2">
  {cancelledAppointments}
</p>
          </div>

        </div>
      </div>

</div>
  );
}
