import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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

              <div
                key={item.id}
                className="border rounded-xl p-4 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-bold">
                    👤 {item.customer_name}
                  </h3>

                  <p>📞 {item.phone}</p>

                  <p>💇 {item.service}</p>

                  <p>📅 {item.followup_date}</p>
<div className="flex gap-2 mt-4">

  <button
    onClick={() =>
      window.open(
        `https://wa.me/91${item.phone}?text=${encodeURIComponent(
          `Hi ${item.customer_name} 🌸

It's time for your next ${item.service}.

Book your appointment today.

- Team Retivio`
        )}`
      )
    }
    className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
  >
    💬 WhatsApp
  </button>

  <button
    onClick={() => window.open(`tel:${item.phone}`)}
    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
  >
    📞 Call
  </button>
<button
  onClick={() => markAsDone(item.id)}
  className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm"
>
  ✅ Done
</button>
</div>
                </div>

                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  {item.status}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}
