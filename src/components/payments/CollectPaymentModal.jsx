import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function CollectPaymentModal({
  open,
  onClose,
  appointment,
  onSuccess,
}) {

const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
useEffect(() => {
  if (appointment) {
    setAmount(appointment.price || 0);
  }
}, [appointment]);

  if (!open || !appointment) return null;
async function collectPayment() {
  console.log("Appointment:", appointment);

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        customer_id: appointment.customer_id,
        appointment_id: appointment.id,
        source: "Appointment",
        service_name: appointment.service,
        amount: Number(amount),
        payment_method: paymentMethod,
        payment_status: "Paid",
        notes,
      });

if (error) {
  console.error(error);
  alert(error.message);
  setLoading(false);
  return;
}
const { data: customer } = await supabase
  .from("customers")
  .select("total_spend")
  .eq("id", appointment.customer_id)
  .single();

const newTotal =
  Number(customer?.total_spend || 0) +
  Number(amount);

await supabase
  .from("customers")
  .update({
    total_spend: newTotal,
  })
  .eq("id", appointment.customer_id);
    setLoading(false);

await supabase
  .from("appointments")
  .update({
    payment_status: "Paid",
  })
  .eq("id", appointment.id);

alert("✅ Payment collected successfully!");
    onSuccess();

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold mb-6">
          💰 Collect Payment
        </h2>

        <div className="space-y-4">

          <input
            value={appointment.customer_name}
            disabled
            className="border rounded-xl p-3 w-full bg-gray-100"
          />

          <input
            value={appointment.service}
            disabled
            className="border rounded-xl p-3 w-full bg-gray-100"
          />

          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="border rounded-xl p-3 w-full"
          />

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="border rounded-xl p-3 w-full"
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
          </select>

          <textarea
            rows="3"
            placeholder="Notes"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            className="border rounded-xl p-3 w-full"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border rounded-xl px-5 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={collectPayment}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-2"
          >
            {loading ? "Saving..." : "Collect Payment"}
          </button>

        </div>

      </div>

    </div>
  );
}
