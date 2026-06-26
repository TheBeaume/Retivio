import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function CustomerLookup() {
  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);

  async function searchCustomer(number) {
    setPhone(number);

    if (number.length < 10) {
      setCustomer(null);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("customers")
      .select("*")
      .eq("phone", number)
      .eq("user_id", user.id)
      .single();

    setCustomer(data || null);
  }

  return (
    <div className="space-y-4">

      <input
        placeholder="Mobile Number"
        value={phone}
        onChange={(e) => searchCustomer(e.target.value)}
        className="border rounded-lg p-3 w-full"
      />

      {customer ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="font-bold text-green-700">
            ✅ Existing Customer
          </h3>

          <p>👤 {customer.name}</p>
          <p>📞 {customer.phone}</p>
          <p>⭐ {customer.loyalty}</p>
          <p>💇 {customer.service}</p>
        </div>
      ) : (
        phone.length === 10 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            🆕 New Customer
          </div>
        )
      )}

    </div>
  );
}
