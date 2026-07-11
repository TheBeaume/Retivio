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

function getStatusColor(item) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const followDate = new Date(item.followup_date);

  if (item.status === "Done") {
    return "bg-gray-100 text-gray-700";
  }

  if (followDate < today) {
    return "bg-red-100 text-red-700";
  }

  if (followDate.getTime() === today.getTime()) {
    return "bg-orange-100 text-orange-700";
  }

  return "bg-green-100 text-green-700";
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

<span
  className={`${getStatusColor(item)} px-3 py-1 rounded-full font-semibold`}
>
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
