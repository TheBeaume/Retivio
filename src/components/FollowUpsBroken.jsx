import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import FollowUpCard from "./FollowUpCard";

export default function FollowUps() {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    loadFollowUps();
  }, []);

  async function loadFollowUps() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("follow_ups")
      .select("*")
      .eq("user_id", user.id)
      .order("followup_date", { ascending: true });

    if (error) {
      console.log(error);
      return;
    }

    setFollowUps(data || []);
  }
async function markAsDone(id) {
function handleWhatsApp(item) {
  window.open(
    `https://wa.me/91${item.phone}?text=${encodeURIComponent(
      `Hi ${item.customer_name} 🌸

It's time for your next ${item.service}.

Book your appointment today.

- Team Retivio`
    )}`
  );
}

function handleCall(item) {
  window.open(`tel:${item.phone}`);
}
  const { error } = await supabase
    .from("follow_ups")
    .update({ status: "Done" })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadFollowUps();
}
async function createTestFollowUp() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase.from("follow_ups").insert({
    user_id: user.id,
    customer_id: crypto.randomUUID(),
    customer_name: "Demo Customer",
    phone: "9876543210",
    service: "Hair Spa",
    followup_date: new Date().toISOString().split("T")[0],
    status: "Pending",
    priority: "Medium",
    notes: "Test follow-up",
  });

  if (error) {
    alert(error.message);
    return;
  }

  loadFollowUps();
}
const today = new Date().toISOString().split("T")[0];

const overdue = followUps.filter(
  (f) => f.status !== "Done" && f.followup_date < today
);

const todayFollowUps = followUps.filter(
  (f) => f.status !== "Done" && f.followup_date === today
);

const upcoming = followUps.filter(
  (f) => f.status !== "Done" && f.followup_date > today
);

const completed = followUps.filter(
  (f) => f.status === "Done"
);
  return (
    <div className="space-y-6">

      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-3xl text-white p-8">
        <h1 className="text-4xl font-bold">
          🔔 Follow-ups
        </h1>

        <p className="mt-3 text-purple-100">
          Manage all customer follow-ups.
        </p>
      </div>
<div className="grid md:grid-cols-4 gap-4">

  <div className="bg-red-100 rounded-xl p-5">
    <h3 className="text-red-700 font-bold">🔴 Overdue</h3>
    <p className="text-3xl font-bold">{overdue.length}</p>
  </div>

  <div className="bg-green-100 rounded-xl p-5">
    <h3 className="text-green-700 font-bold">🟢 Today</h3>
    <p className="text-3xl font-bold">{todayFollowUps.length}</p>
  </div>

  <div className="bg-blue-100 rounded-xl p-5">
    <h3 className="text-blue-700 font-bold">🔵 Upcoming</h3>
    <p className="text-3xl font-bold">{upcoming.length}</p>
  </div>

  <div className="bg-gray-100 rounded-xl p-5">
    <h3 className="text-gray-700 font-bold">⚪ Done</h3>
    <p className="text-3xl font-bold">{completed.length}</p>
  </div>

</div>
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Pending Follow-ups
        </h2>
<button
  onClick={createTestFollowUp}
  className="mb-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
>
  ➕ Create Test Follow-up
</button>
        {followUps.length === 0 ? (

          <p className="text-gray-500">
            No follow-ups yet.
          </p>

        ) : (

          <div className="space-y-4">

{followUps.map((item) => (
  <FollowUpCard
    key={item.id}
    item={item}
    onWhatsApp={handleWhatsApp}
    onCall={handleCall}
    onDone={markAsDone}
  />
))}
              </div>


          </div>

        )}

      </div>

  );
}
